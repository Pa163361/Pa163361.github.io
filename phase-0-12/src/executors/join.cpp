#include "global.h"
/**
 * @brief 
 * SYNTAX: R <- JOIN relation_name1, relation_name2 ON column_name1 bin_op column_name2
 */
bool syntacticParseJOIN()
{
    logger.log("syntacticParseJOIN");

    int offset =0;
    
    if(tokenizedQuery.size()==13)
    {
        // when JOIN USING NESTED
        if(tokenizedQuery[4]=="NESTED")
        {
            offset=2;
            parsedQuery.joinType="NESTED";
            parsedQuery.buffer_size=stoi(tokenizedQuery[12]);
        }
        else if(tokenizedQuery[4]=="PARTHASH")
        {
            offset=2;
            parsedQuery.joinType="PARTHASH";
            parsedQuery.buffer_size=stoi(tokenizedQuery[12]);
        }
        else 
        {
            cout << "SYNTAX ERROR" << endl;
            return false;
        }
    }

    if (offset==0 && (tokenizedQuery.size() != 9 || tokenizedQuery[5] != "ON"))
    {
        cout << "SYNTAX ERROR" << endl;
        return false;
    }
    parsedQuery.queryType = JOIN;
    parsedQuery.joinResultRelationName = tokenizedQuery[0];
    parsedQuery.joinFirstRelationName = tokenizedQuery[3+offset];
    parsedQuery.joinSecondRelationName = tokenizedQuery[4+offset];
    parsedQuery.joinFirstColumnName = tokenizedQuery[6+offset];
    parsedQuery.joinSecondColumnName = tokenizedQuery[8+offset];

    string binaryOperator = tokenizedQuery[7+offset];
    if (binaryOperator == "<")
        parsedQuery.joinBinaryOperator = LESS_THAN;
    else if (binaryOperator == ">")
        parsedQuery.joinBinaryOperator = GREATER_THAN;
    else if (binaryOperator == ">=" || binaryOperator == "=>")
        parsedQuery.joinBinaryOperator = GEQ;
    else if (binaryOperator == "<=" || binaryOperator == "=<")
        parsedQuery.joinBinaryOperator = LEQ;
    else if (binaryOperator == "==")
        parsedQuery.joinBinaryOperator = EQUAL;
    else if (binaryOperator == "!=")
        parsedQuery.joinBinaryOperator = NOT_EQUAL;
    else
    {
        cout << "SYNTAX ERROR" << endl;
        return false;
    }
    return true;
}

bool semanticParseJOIN()
{
    logger.log("semanticParseJOIN");

    if (tableCatalogue.isTable(parsedQuery.joinResultRelationName))
    {
        cout << "SEMANTIC ERROR: Resultant relation already exists" << endl;
        return false;
    }

    if (!tableCatalogue.isTable(parsedQuery.joinFirstRelationName) || !tableCatalogue.isTable(parsedQuery.joinSecondRelationName))
    {
        cout << "SEMANTIC ERROR: Relation doesn't exist" << endl;
        return false;
    }

    if (!tableCatalogue.isColumnFromTable(parsedQuery.joinFirstColumnName, parsedQuery.joinFirstRelationName) || !tableCatalogue.isColumnFromTable(parsedQuery.joinSecondColumnName, parsedQuery.joinSecondRelationName))
    {
        cout << "SEMANTIC ERROR: Column doesn't exist in relation" << endl;
        return false;
    }
    return true;
}

void executeJOIN()
{
    if(parsedQuery.joinType=="NESTED")
    {
        logger.log("executeJOIN USING NESTED");
        Table table1 = *(tableCatalogue.getTable(parsedQuery.joinFirstRelationName));
        Table table2 = *(tableCatalogue.getTable(parsedQuery.joinSecondRelationName));

        // This contains the list of all column names when join is performed. Given that both tables don't have any column in common 
        vector<string>columns;

        for (int columnCounter = 0; columnCounter < table1.columnCount; columnCounter++)
        {
            string columnName = table1.columns[columnCounter];
            columns.emplace_back(columnName);
        }

        for (int columnCounter = 0; columnCounter < table2.columnCount; columnCounter++)
        {
            string columnName = table2.columns[columnCounter];
            columns.emplace_back(columnName);
        }

        Table *resultantTable = new Table(parsedQuery.joinResultRelationName, columns);


        vector<int>row2;
        vector<int>resultantRow;
        resultantRow.reserve(resultantTable->columnCount);

        int column1 = table1.getColumnIndex(parsedQuery.joinFirstColumnName);
        int column2 = table2.getColumnIndex(parsedQuery.joinSecondColumnName);


        int nB = parsedQuery.buffer_size;
        vector<Page>buffer_blocks(nB-2);
        int times = ceil((table1.blockCount)/(float)(nB-2));
        int page_index =0;
        while(times)
        {
            int counter=0;
            while(counter<nB-2 && page_index<table1.blockCount)
            {
                buffer_blocks[counter]= Page(parsedQuery.joinFirstRelationName, page_index);
                counter++;
                page_index++;
            }

            Cursor cursor2 = table2.getCursor();
            row2 = cursor2.getNext();
            while(!row2.empty())
            {
                for(int i=0;i<counter;i++)
                {
                    Page cur = buffer_blocks[i];
                    for(int rowCounter=0;rowCounter<table1.maxRowsPerBlock;rowCounter++)
                    {
                        vector<int>row1 = cur.getRow(rowCounter);
                        if(row1.size()==0) break;
                        if(evaluateBinOp(row1[column1], row2[column2], parsedQuery.joinBinaryOperator))
                        {
                            resultantRow = row1;
                            resultantRow.insert(resultantRow.end(), row2.begin(), row2.end());
                            resultantTable->writeRow<int>(resultantRow);
                        }
                    }
                }
                row2 = cursor2.getNext();
            }
            times--;
        }
        // cout<<"main ops safe\n";
        resultantTable->blockify();
        // cout<<"blockify safe\n";
        tableCatalogue.insertTable(resultantTable);

    }
    if(parsedQuery.joinType=="PARTHASH")
    {
        logger.log("executeJOIN USING PARTHASH");
        
    }
    else
    {
        logger.log("executeJOIN NORMAL");
    }
    return;
}