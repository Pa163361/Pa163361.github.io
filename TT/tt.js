var flag=0;
function mundhu()
{
	var v;
	if(flag == 0)
	{
		v=prompt("Thanks for visiting:-");
		if(v==("IIITH"))
		{
			flag=1;
			document.getElementById('pt').setAttribute("href","pstt.html");
		}
	}
}