/* SlideWindow
   © 2010 Yury Plashenkov
   http://www.plashenkov.com/
*/
sw={
pathToImages:'',
overlayOpacity:75,
imageCounter:'Image %1 of %2',
init:function(){
	var d=document,s=navigator.appVersion,m='MSIE',l=s.indexOf(m)>=0&&parseFloat(s.split(m)[1])<7;
	s='#sw_overlay{z-index:99;position:absolute;left:0;top:0;background:#fff}#sw_wnd{z-index:100;position:absolute;line-height:0}#sw_wnd img{border:0}#sw_tl,#sw_tr,#sw_bl,#sw_br{width:20px;height:20px}#sw_desc{height:40px;font:bold 8pt/150% verdana,tahoma,arial}';
	if(l){var a=function(n){return'#sw_'+n+"{filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+sw.pathToImages+n+".png',sizingMethod='scale')}"};s+=a('tl')+a('tc')+a('tr')+a('ml')+a('mr')+a('bl')+a('bc')+a('br')}else{var a='{background:url('+sw.pathToImages;s+='#sw_tl'+a+'r-corners.png)}#sw_tc'+a+'r-horz.png)}#sw_tr'+a+'r-corners.png) 100% 0%}#sw_ml'+a+'r-vert.png)}#sw_mr'+a+'r-vert.png) 100% 0%}#sw_bl'+a+'r-corners.png) 0% 100%}#sw_bc'+a+'r-horz.png) 0% 100%}#sw_br'+a+'r-corners.png) 100% 100%}'}var st=d.createElement('style');d.getElementsByTagName('head')[0].appendChild(st);if(st.styleSheet)st.styleSheet.cssText=s;else st.innerHTML=s;
	sw.w=d.createElement('div');
	sw.w.innerHTML='<div id=sw_overlay onclick="sw.close()"></div><table cellpadding=0 cellspacing=0 id=sw_wnd><tr><td id=sw_tl></td><td id=sw_tc></td><td id=sw_tr></td></tr><tr><td id=sw_ml rowspan=2></td><td id=sw_img bgcolor=White align=center style="padding:0 0 10px"></td><td id=sw_mr rowspan=2></td></tr><tr><td bgcolor=White height=40><table cellpadding=0 cellspacing=0 width=100%><tr><td id=sw_next width=58></td><td id=sw_prev width=58></td><td id=sw_desc align=center></td><td width=66><a href="javascript:sw.close()"><img src="' + sw.pathToImages + 'close.png" width=66 height=22></a></td></tr></table></td></tr><tr><td id=sw_bl></td><td id=sw_bc></td><td id=sw_br></td></tr></table>';
	d.body.appendChild(sw.w);sw.d(400,300);sw.p(0);
	sw.a=d.getElementById('sw_img');sw.x=d.createElement('img');sw.x.src=sw.pathToImages+'load.gif';sw.a.appendChild(sw.x);sw.z=d.createElement('img');
	var i=function(f){new Image().src=sw.pathToImages+f};if(l){i('tl.png');i('tc.png');i('tr.png');i('ml.png');i('mr.png');i('bl.png');i('bc.png');i('br.png')}else{i('r-corners.png');i('r-horz.png');i('r-vert.png')}i('load.gif');i('close.png');i('prev.png');i('next.png');i('prev-d.png');i('next-d.png')
},
open:function(l,t,w,h,u){
	if(sw.u){if(sw.u==u){var i=sw.m.length;sw.m[i]=sw.h;sw.t[i]=t}return}
	if(!sw.w)return true;
	var d=document,e=d.getElementById('sw_overlay').style,c=sw.c(),s=sw.s();
	if(sw.overlayOpacity){e.opacity=sw.overlayOpacity/100;e.filter='alpha(opacity='+sw.overlayOpacity+')';e.width=Math.max(c[0],s[0])+'px';e.height=Math.max(c[1],s[1])+'px'}
	if(w&&h)sw.d(w,h);
	var k=function(e){if(!e)e=window.event;switch(e.keyCode){case 32:case 34:case 39:case 40:sw.next();return false;case 8:case 33:case 37:case 38:sw.prev();return false;case 27:sw.close();return false}return true}
	if(window.opera)d.onkeypress=k;else d.onkeydown=k;
	if(u){
		sw.m=[];sw.t=[];
		var n=d.getElementsByTagName('a');
		for(var i=0;i<n.length;i++)if(n[i]!=l){k=n[i].onclick;if(/sw\.open/i.test(k)){sw.u=u;sw.h=n[i].href;k();sw.u=0}}else{sw.i=sw.m.length;sw.m[sw.i]=l.href;sw.t[sw.i]=t}}
	else{sw.i=0;sw.m=[l.href];sw.t=[t]}
	sw.p(1);sw.l();return false
},
close:function(){if(window.opera)document.onkeypress=null;else document.onkeydown=null;sw.p(0)},
next:function(){if(sw.i<sw.m.length-1){sw.i++;sw.l()}},
prev:function(){if(sw.i>0){sw.i--;sw.l()}},
c:function(){var d=document,b=d.body,c='compatMode',e=(!d[c]||d[c]=='CSS1Compat')&&d.documentElement,w='clientWidth',h='clientHeight';return[e&&e[w]||b&&b[w],e&&e[h]||b&&b[h]]},
s:function(){var d=document,b=d.body,e=d.documentElement,w='scrollWidth',h='scrollHeight';return[b&&b[w]||e&&e[w],b&&b[h]||e&&e[h]]},
o:function(){var d=document,b=d.body,e=d.documentElement,l='scrollLeft',t='scrollTop';return[e&&e[l]||b&&b[l],e&&e[t]||b&&b[t]]},
l:function(){
	var d=document,s;
	if(sw.i>0)s='<a href="javascript:sw.prev()"><img src="'+sw.pathToImages+'prev.png" width=58 height=22></a>';else s='<img src="'+sw.pathToImages+'prev-d.png" width=58 height=22>';d.getElementById('sw_next').innerHTML=s;
	if(sw.i<sw.m.length-1)s='<a href="javascript:sw.next()"><img src="'+sw.pathToImages+'next.png" width=58 height=22></a>';else s='<img src="'+sw.pathToImages+'next-d.png" width=58 height=22>';d.getElementById('sw_prev').innerHTML=s;
	s='<div style="color:Gray">'+sw.imageCounter.replace('%1',sw.i+1).replace('%2',sw.m.length)+'</div>';if(sw.t&&sw.i>=0&&sw.i<sw.t.length)s+=sw.t[sw.i];d.getElementById('sw_desc').innerHTML=s;
	if(sw.a.lastChild==sw.z){sw.a.removeChild(sw.z);sw.a.appendChild(sw.x)}sw.z.onload=function(){sw.a.removeChild(sw.x);sw.d(sw.z.width,sw.z.height);sw.a.appendChild(sw.z)};sw.z.src='';sw.z.src=sw.m[sw.i]
},
d:function(w,h){var e=document.getElementById('sw_wnd').style;w+=40;h+=90;e.width=w+'px';e.height=h+'px';e.marginLeft=-w/2+'px';e.marginTop=-h/2+'px'},
p:function(s){var d=document,e=d.getElementById('sw_wnd').style,j=d.getElementById('sw_overlay').style;if(s){var c=sw.c(),o=sw.o();e.left=c[0]/2+o[0]+'px';e.top=c[1]/2+o[1]+'px'}else{e.left=-parseInt(e.width)+'px';e.top=-parseInt(e.height)+'px';j.width=0;j.height=0}}
}