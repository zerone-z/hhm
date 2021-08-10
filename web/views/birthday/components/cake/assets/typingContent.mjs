export default `<span style="color: #3f7f5f;">/**</span><br />
<span style="margin-left: 7px;"/><span style="color: #3f7f5f;">* Today, the 13th day of August, is your birthday.</span><br />
<span style="margin-left: 7px;"/><span style="color: #3f7f5f;">* So I created a page to celebrate this extraordinary day.</span><br />
<span style="margin-left: 7px;"/><span style="color: #3f7f5f;">*/</span><br />
Girl u = <span style="color: #7f0055;font-weight: bold;">new</span> Girl(<span style="color: #2a36ff;">"May Zhao"</span>);<br />
<span style="color: #3f7f5f;">// Aug 13th, when the bell rang, your age increased </span><br />
Date currentTime = <span style="color: #7f0055;font-weight: bold;">new</span> Date(); <br />
SimpleDateFormat formatter = <span style="color: #7f0055;font-weight: bold;">new</span> SimpleDateFormat(<span style="color: #2a36ff;">"yyyy-MM-dd HH:mm:ss"</span>);<br />
String dateString = formatter.format(currentTime);<br />
if( dateString.equals(<span style="color: #2a36ff;">"2013-08-13 00:00:00"</span>) ){</br>
  u.age ++;</br>
}</br>
<span style="color: #3f7f5f;">// Our blessing will be with you simultaneously.</span><br />
<span style="color: #7f0055;font-weight: bold;">new</span> Thread (){<br />
@Override </br>
<span style="color: #3f7f5f;">// Forever and ever. I wish</span><br />
while(true){</br>
<span style="color: #3f7f5f;">// luckiness,</span><br />
u.fortune ++;</br>
<span style="color: #3f7f5f;">// happiness,</span><br />
u.happiness ++;</br>
  <span style="color: #3f7f5f;">// and everything you wish can be achieved.</span><br />
}.start()</br>
<span style="color: #3f7f5f;">// The last thing I wanna say, boring and ordinary, is:</span><br />
System.out.println(<span style="color: #2a36ff;">"Happy Birthday !"</span>);`
