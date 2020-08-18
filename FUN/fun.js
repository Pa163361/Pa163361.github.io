var ans=1;
var x=0;
var arr=['Human Being'];
function first()
{
  if((x == 0))
  {
     if(document.getElementById('D1').checked)
     {
       x=1;
       alert("Don't say lies....!");
     }
     else
     {
       alert("Such a Honest Person...! Keep it up");
     }
  }
  else
  {
     x=0;
     alert("I know that you are not a HUMAN. Anyways, now you are saying truth, Thanks....");
  }
   var a,b,c,d;
  a=document.getElementById('A1').checked;  
  b=document.getElementById('B1').checked;
  c=document.getElementById('C1').checked;
  d=document.getElementById('D1').checked;
  if(a)arr[0]='Dog.';
  if(b)arr[0]='Buffalo.';
  if(c)arr[0]='Donkey.';
  if(d)arr[0]='Human Being.';
}
function second()
{
  if(document.getElementById('D2').checked)
  {
    alert("Congrats! You are the Winner in the contest of telling \"LIES\"...");
  }
  else
  {
    alert("Now, you are an Honest person!");
  }
 
}
function third()
{
  var temp;
  temp=document.getElementById('A3').value;
  if(temp == 1)
  {
     document.getElementById('B3').value="Worst";
  }
  else if(temp == 2)
  {
     document.getElementById('B3').value="Bad";
  }
  else if(temp == 3)
  {
     document.getElementById('B3').value="Average";
  }
  else if(temp == 4)
  {
     document.getElementById('B3').value="Good";
  }
  else
  {
     document.getElementById('B3').value="Excellent"; 
  }
}
function submitted()
{
  var a,b,c,d,e,f,g,h;
  a=document.getElementById('A1').checked;
  b=document.getElementById('B1').checked;
  c=document.getElementById('C1').checked;
  d=document.getElementById('D1').checked;
  e=document.getElementById('A2').checked;
  f=document.getElementById('B2').checked;
  g=document.getElementById('C2').checked;
  h=document.getElementById('D2').checked;
 if(((!a) && (!b ) && (!c) && (!d)) || ((!e) && (!f) && (!g) && (!h)))
  {
    alert("Every Question has to fill. Please fill before submit");
  }
  else
  {
     document.getElementById('main').style.display="none";
     var sty=document.getElementsByTagName('body');
     sty[0].style.backgroundColor="rgba(37,137,100,0.3)";
     document.getElementById('fir').innerHTML="1. You are " + arr[0]  + "<br>";
     var arr2=[];
     if(e){arr2[arr2.length]=document.getElementById('A2').value;}
     if(f){arr2[arr2.length]=document.getElementById('B2').value;}
     if(g){arr2[arr2.length]=document.getElementById('C2').value;}
     if(h){arr2[arr2.length]=document.getElementById('D2').value;}
     // document.getElementById('hab').innerHTML="2.Your Habits are :- " + arr2[0] +
     //  "," + arr2[1] + "," + arr2[2] + "," + arr2[3] + ".";
    var j;
    var temps;
    document.getElementById('hab').innerHTML="2.Your Habits are :- ";
    for(j=0;j<arr2.length;j++)
    {
       if(j==(arr2.length -1))
       {
          temps=document.getElementById('hab').innerHTML;
          document.getElementById('hab').innerHTML=temps + arr2[j] + ".";
       }
       else
       {
           temps=document.getElementById('hab').innerHTML;
           document.getElementById('hab').innerHTML=temps + arr2[j] + ",";
       }
    }
    var rati;
    rati=document.getElementById('A3').value;
    var temps2="3.You gave <b>" + rati +"</b> rating for Avengers Infinity War.";
    if(rati <= 2)
    {
        document.getElementById('rat').innerHTML=temps2 + "<ul>" + "<li>" + "U don't have CINEMA KNOWLEDGE, it would be better to do suicide..." + "</li>" + "</ul>";
    }
    else if(rati == 3)
    {
         document.getElementById('rat').innerHTML=temps2 + "<ul>" + "<li>" + "U need to watch again this movie. May be u have some mental issue..." + "</li>" + "</ul>";
    }
    else
    {
         document.getElementById('rat').innerHTML=temps2 + "<ul>" + "<li>" + "Thanks for rating...!" + "</li>" + "</ul>";
    }
  }
}
