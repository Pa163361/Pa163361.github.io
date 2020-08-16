var ans=0;
var x=0;
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
       ans++;
     }
  }
  else
  {
     x=0;
     alert("I know that you are not a HUMAN. Anyways, now you are saying truth, Thanks....");
  }
}
function second()
{
  ans++;
  if(document.getElementById('D2').checked)
  {
    alert("Congrats! You are the Winner in the contest of telling \"LIES\"...");
    ans--;
  }
  else
  {
    alert("Now, you are an Honest person!");
    ans++;
  }
}
function third()
{
  var temp;
  temp=document.getElementById('A3').value;
  if(temp == 1)
  {
    ans+=1;
     document.getElementById('B3').value="Worst";
  }
  else if(temp == 2)
  {
    ans+=2;
     document.getElementById('B3').value="Bad";
  }
  else if(temp == 3)
  {
    ans+=3;
     document.getElementById('B3').value="Average";
  }
  else if(temp == 4)
  {
    ans+=4;
     document.getElementById('B3').value="Good";
  }
  else
  {
    ans+=5;
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
      document.write("Thanks...! I will add some more fun questions later... Thanks for visiting...!");
  }
}