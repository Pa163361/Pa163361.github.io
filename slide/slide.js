var ind=0;
var count=3;
var arr=["https://images.unsplash.com/photo-1576707948881-b485713fbad7?ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80","https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80" , "https://images.unsplash.com/photo-1580019542155-247062e19ce4?ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80","https://images.wallpapersden.com/image/download/kajal-agarwal-cute-pose_41889_1920x1080.jpg"];
var i=0;
var arr2=document.getElementsByTagName('p');
var variable;
function vanemma()
{
    arr2[0].style.backgroundColor="#FF0000";
}
function time()
{
    variable=setInterval(right,5000);
}
var x;
function idhi(x)
{
    clearInterval(variable);
    ind=x;
    document.getElementById('img_').setAttribute("src",arr[x]);
    var y;
    for(y=0;y<=count;y++)
    {
        if(x == y)
        {
            arr2[y].style.backgroundColor="#FF0000";
        }
        else
        {
            arr2[y].style.backgroundColor="#BEBEBE";
        }
    }
    time();
}
function left()
{
  clearInterval(variable);
  if(ind == 0)
  {
     ind=count;
      document.getElementById('img_').setAttribute("src",arr[ind]);
  }
  else
  {
     ind--;
     document.getElementById('img_').setAttribute("src",arr[ind]);
  }
  var y;
    for(y=0;y<=count;y++)
    {
        if(ind == y)
        {
            arr2[y].style.backgroundColor="#FF0000";
        }
        else
        {
            arr2[y].style.backgroundColor="#BEBEBE";
        }
    }
  time();
}
function right()
{
  clearInterval(variable);
  if(ind >= count)
  {
    ind=0;
    document.getElementById('img_').setAttribute("src",arr[ind]);
  }
  else
  {
    ind++;
    document.getElementById('img_').setAttribute("src",arr[ind]);
  }
  var y;
    for(y=0;y<=count;y++)
    {
        if(ind == y)
        {
            arr2[y].style.backgroundColor="#FF0000";
        }
        else
        {
            arr2[y].style.backgroundColor="#BEBEBE";
        }
    }
  time();
}