/* krpano 1.16.4 gyro plugin (build 2013-06-05)
for devices with Gyro sensor (iPhone4 and iPad2 with iOS4.2+)
by Aldo Hoeben / fieldOfView.com
contributions by
        Sjeiti / ronvalstar.nl
        Klaus / krpano.com
http://fieldofview.github.com/krpano_fovplugins/gyro/plugin.html
This software can be used free of charge and the source code is available under a Creative Commons Attribution license:
        http://creativecommons.org/licenses/by/3.0/
*/
var krpanoplugin=function(){function t(){E=!1;s=null;void 0===j?k=!0:j&&!k?(window.addEventListener("deviceorientation",J,!0),b.control.layer.addEventListener("touchstart",K,!0),b.control.layer.addEventListener("touchend",A,!0),b.control.layer.addEventListener("touchcancel",A,!0),k=!0,B=-(u?top.orientation:window.orientation),v=p=f=0,m=b.view.camroll):k=!1}function C(){j&&k&&(window.removeEventListener("deviceorientation",J,!0),b.control.layer.removeEventListener("touchstart",K),b.control.layer.removeEventListener("touchend",
A),b.control.layer.removeEventListener("touchcancel",A));D&&b.call("tween(view.camroll,0)");k=!1}function L(){k?C():t()}function F(){window.removeEventListener("deviceorientation",F,!1);b.isdesktop||(j=!0,k&&(k=!1,t()),null!=d.onavailable&&b.call(d.onavailable,d))}function K(){G=!0}function A(){G=!1}function J(l){if(!G&&k){var d=u?top.orientation:window.orientation,n,a=l.alpha*w,g=l.beta*w,c=l.gamma*w,h;h=Math.cos(a);var a=Math.sin(a),e=Math.cos(g),g=Math.sin(g),q=Math.cos(c),c=Math.sin(c),a=[a*c-
h*g*q,-h*e,h*g*c+a*q,e*q,-g,-e*c,a*g*q+h*c,a*e,-a*g*c+h*q];0.9999<a[3]?(h=Math.atan2(a[2],a[8]),a=Math.PI/2,c=0):-0.9999>a[3]?(h=Math.atan2(a[2],a[8]),a=-Math.PI/2,c=0):(h=Math.atan2(-a[6],a[0]),c=Math.atan2(-a[5],a[4]),a=Math.asin(a[3]));n={yaw:h,pitch:a,roll:c};var c=x(n.yaw/w),a=n.pitch/w,e=c,g=b.view.hlookat,q=b.view.vlookat,j=b.view.camroll,t=g-p;h=q-v;if(E){D&&(m=x(180+Number(d)-n.roll/w));if(70<Math.abs(a)){e=l.alpha;switch(d){case 0:0<a&&(e+=180);break;case 90:e+=90;break;case -90:e+=-90;
break;case 180:0>a&&(e+=180)}e=x(e);180<Math.abs(e-c)&&(e+=e<c?360:-360);l=Math.min(1,(Math.abs(a)-70)/10);c=c*(1-l)+e*l;m*=1-l}B+=t;f+=h;90<Math.abs(a+f)&&(f=0<a+f?90-a:-90-a);p=x(-c-180+B);v=Math.max(Math.min(a+f,90),-90);180<Math.abs(p-g)&&(g+=p>g?360:-360);p=(1-r)*p+r*g;v=(1-r)*v+r*q;180<Math.abs(m-j)&&(j+=m>j?360:-360);m=(1-r)*m+r*j;l=x(p);d=v;c=x(m);isNaN(l)||(b.view.hlookat=l);isNaN(d)||(b.view.vlookat=d);isNaN(c)||(b.view.camroll=c);0!=f&&0<z&&(0==h?1==z?y=f=0:(y=1-(1-y)*b.control.touchfriction,
f*=1-Math.pow(z,2)*y,0.1>Math.abs(f)&&(y=f=0)):y=0)}else if(null==s)s=n;else if(n.yaw!=s.yaw||n.pitch!=s.pitch||n.roll!=s.roll)s=null,E=!0,H&&(f=-a)}}function x(b){b%=360;return 180>=b?b:b-360}function I(b){return 0<="yesontrue1".indexOf(String(b).toLowerCase())}var b=null,d=null,u=!1,j,k=!1,z=0,H=!1,D=!1,r=0.5,G=!1,E=!1,s=null,B=0,f=0,p=0,v=0,m=0,y=0,w=Math.PI/180;this.registerplugin=function(f,m,n){b=f;d=n;if("%"!=b.build.charAt(0)&&("1.0.8.14">b.version||"2011-03-30">b.build))b.trace(3,"gyro plugin - too old krpano version (min. 1.0.8.14)");
else{u=b._have_top_access;if(void 0===u){u=!1;try{top&&top.document&&(u=!0)}catch(a){}}window.DeviceOrientationEvent&&window.addEventListener("deviceorientation",F,!1);d.registerattribute("available",!1,function(){},function(){return j});d.registerattribute("enabled",!0,function(a){I(a)?t():C()},function(){return k});d.registerattribute("velastic",0,function(a){z=Math.max(Math.min(Number(a),1),0)},function(){return z});d.registerattribute("vrelative",!1,function(a){H=I(a)},function(){return H});d.registerattribute("camroll",
!1,function(a){D=I(a)},function(){return D});d.registerattribute("friction",0.5,function(a){r=Math.max(Math.min(Number(a),1),0)},function(){return r});d.registerattribute("onavailable",null);d.enable=t;d.disable=C;d.toggle=L}};this.unloadplugin=function(){window.removeEventListener("deviceorientation",F,!1);C();b=d=null}};