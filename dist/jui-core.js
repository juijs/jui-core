!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);var r={},o={},i={},a={template:{evaluate:/<\!([\s\S]+?)\!>/g,interpolate:/<\!=([\s\S]+?)\!>/g,escape:/<\!-([\s\S]+?)\!>/g},logUrl:"tool/debug.html"},u=r["util.base"]={browser:{webkit:"WebkitAppearance"in document.documentElement.style,mozilla:void 0!==window.mozInnerScreenX,msie:-1!=window.navigator.userAgent.indexOf("Trident")},isTouch:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent),inherit:function(t,e){this.typeCheck("function",t)&&this.typeCheck("function",e)&&(t.parent=e,t.prototype=new e,t.prototype.constructor=t,t.prototype.parent=t.prototype,t.prototype.super=function(t,e){return this.constructor.prototype[t].apply(this,e)})},extend:function(t,e,n){if(this.typeCheck(["object","function"],t)||(t={}),!this.typeCheck(["object","function"],e))return t;for(var r in e)!0===n?o(t[r])?this.extend(t[r],e[r],n):this.typeCheck("undefined",t[r])&&(t[r]=e[r]):o(t[r])?this.extend(t[r],e[r],n):t[r]=e[r];function o(t){return u.typeCheck("object",t)}return t},pxToInt:function(t){return this.typeCheck("string",t)&&-1!=t.indexOf("px")?parseInt(t.split("px").join("")):t},clone:function(t){var e=this.typeCheck("array",t)?[]:{};for(var n in t)this.typeCheck("object",t[n])?e[n]=this.clone(t[n]):e[n]=t[n];return e},deepClone:function(t,e){var n=null;if(e=e||{},this.typeCheck("array",t)){n=new Array(t.length);for(var r=0,o=t.length;r<o;r++)n[r]=this.deepClone(t[r],e)}else if(this.typeCheck("date",t))n=t;else if(this.typeCheck("object",t))for(var i in n={},t)e[i]?n[i]=t[i]:n[i]=this.deepClone(t[i],e);else n=t;return n},sort:function(t){return new(l.include("util.sort"))(t)},runtime:function(t,e){var n=(new Date).getTime();e();var r=(new Date).getTime();console.warn(t+" : "+(r-n)+"ms")},template:function(t,e){var n=l.include("util.template");return n(t,e||null,a.template)},resize:function(t,e){var n=function(){var n=0;return function(){clearTimeout(n),n=setTimeout(t,e)}}();window.addEventListener?window.addEventListener("resize",n):object.attachEvent?window.attachEvent("onresize",n):window.onresize=n},index:function(){return new(l.include("util.keyparser"))},chunk:function(t,e){for(var n=[],r=0,o=t.length;r<o;)n.push(t.slice(r,r+=e));return n},typeCheck:function(t,e){function n(t,e){return"string"==typeof t&&("string"==t?"string"==typeof e:"integer"==t?"number"==typeof e&&e%1==0:"float"==t?"number"==typeof e&&e%1!=0:"number"==t?"number"==typeof e:"boolean"==t?"boolean"==typeof e:"undefined"==t?void 0===e:"null"==t?null===e:"array"==t?e instanceof Array:"date"==t?e instanceof Date:"function"==t?"function"==typeof e:"object"==t&&!("object"!=typeof e||null===e||e instanceof Array||e instanceof Date||e instanceof RegExp))}if("object"==typeof t&&t.length){for(var r=t,o=0;o<r.length;o++)if(n(r[o],e))return!0;return!1}return n(t,e)},typeCheckObj:function(t,e){if("object"==typeof t){var n=this;for(var r in t){var o=t[r];"function"==typeof o&&function(r,o){t[r]=function(){for(var t=arguments,i=e[r],a=0;a<t.length;a++)if(!n.typeCheck(i[a],t[a]))throw new Error("JUI_CRITICAL_ERR: the "+a+"th parameter is not a "+i[a]+" ("+name+")");return o.apply(this,t)}}(r,o)}}},dataToCsv:function(t,e,n){for(var r="",o=n||e.length,i=-1;i<o;i++){for(var a=[],u=0;u<t.length;u++)if(t[u])if(-1==i)a.push('"'+t[u]+'"');else{var c=e[i][t[u]];a.push(isNaN(c)?'"'+c+'"':c)}r+=a.join(",")+"\n"}return r},dataToCsv2:function(t){for(var e="",n=this.extend({fields:null,rows:null,names:null,types:null,count:this.typeCheck("integer",t.count)?t.count:t.rows.length},t),r=-1;r<n.count;r++){for(var o=[],i=0;i<n.fields.length;i++)if(n.fields[i])if(-1==r)n.names&&n.names[i]?o.push('"'+n.names[i]+'"'):o.push('"'+n.fields[i]+'"');else{var a=n.rows[r][n.fields[i]];this.typeCheck("array",n.types)?"string"==n.types[i]?o.push('"'+a+'"'):"integer"==n.types[i]?o.push(parseInt(a)):"float"==n.types[i]?o.push(parseFloat(a)):o.push(a):o.push(isNaN(a)?'"'+a+'"':a)}e+=o.join(",")+"\n"}return e},fileToCsv:function(t,e){var n=new FileReader;n.onload=function(t){u.typeCheck("function",e)&&e(t.target.result)},n.readAsText(t)},csvToBase64:function(t){return"data:application/octet-stream;base64,"+l.include("util.base64").encode(t)},csvToData:function(t,e,n){for(var r=[],o=e.split("\n"),i=1;i<o.length;i++)if(""!=o[i]){for(var a=o[i].split(","),u={},c=0;c<t.length;c++)u[t[c]]=a[c],this.startsWith(a[c],'"')&&this.endsWith(a[c],'"')?u[t[c]]=a[c].split('"').join(""):u[t[c]]=a[c],-1!=this.inArray(t[c],n)&&(u[t[c]]=parseFloat(a[c]));r.push(u)}return r},getCsvFields:function(t,e){for(var n=this.typeCheck("array",e)?e:t,r=0;r<n.length;r++)isNaN(n[r])||(n[r]=t[n[r]]);return n},svgToBase64:function(t){return"data:image/svg+xml;base64,"+l.include("util.base64").encode(t)},dateFormat:function(t,e,n){var r=["\0","January","February","March","April","May","June","July","August","September","October","November","December"],o=["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],i=["","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],a=["","Sun","Mon","Tue","Wed","Thu","Fri","Sat"];function u(t,e){var n=t+"";for(e=e||2;n.length<e;)n="0"+n;return n}var c=n?t.getUTCFullYear():t.getFullYear();e=(e=(e=e.replace(/(^|[^\\])yyyy+/g,"$1"+c)).replace(/(^|[^\\])yy/g,"$1"+c.toString().substr(2,2))).replace(/(^|[^\\])y/g,"$1"+c);var f=(n?t.getUTCMonth():t.getMonth())+1;e=(e=(e=(e=e.replace(/(^|[^\\])MMMM+/g,"$1"+r[0])).replace(/(^|[^\\])MMM/g,"$1"+o[0])).replace(/(^|[^\\])MM/g,"$1"+u(f))).replace(/(^|[^\\])M/g,"$1"+f);var l=n?t.getUTCDate():t.getDate();e=(e=(e=(e=e.replace(/(^|[^\\])dddd+/g,"$1"+i[0])).replace(/(^|[^\\])ddd/g,"$1"+a[0])).replace(/(^|[^\\])dd/g,"$1"+u(l))).replace(/(^|[^\\])d/g,"$1"+l);var s=n?t.getUTCHours():t.getHours();e=(e=e.replace(/(^|[^\\])HH+/g,"$1"+u(s))).replace(/(^|[^\\])H/g,"$1"+s);var p=s>12?s-12:0==s?12:s;e=(e=e.replace(/(^|[^\\])hh+/g,"$1"+u(p))).replace(/(^|[^\\])h/g,"$1"+p);var h=n?t.getUTCMinutes():t.getMinutes();e=(e=e.replace(/(^|[^\\])mm+/g,"$1"+u(h))).replace(/(^|[^\\])m/g,"$1"+h);var d=n?t.getUTCSeconds():t.getSeconds();e=(e=e.replace(/(^|[^\\])ss+/g,"$1"+u(d))).replace(/(^|[^\\])s/g,"$1"+d);var y=n?t.getUTCMilliseconds():t.getMilliseconds();e=e.replace(/(^|[^\\])fff+/g,"$1"+u(y,3)),y=Math.round(y/10),e=e.replace(/(^|[^\\])ff/g,"$1"+u(y)),y=Math.round(y/10),e=e.replace(/(^|[^\\])f/g,"$1"+y);var g=s<12?"AM":"PM";e=(e=e.replace(/(^|[^\\])TT+/g,"$1"+g)).replace(/(^|[^\\])T/g,"$1"+g.charAt(0));var v=g.toLowerCase();e=(e=e.replace(/(^|[^\\])tt+/g,"$1"+v)).replace(/(^|[^\\])t/g,"$1"+v.charAt(0));var m=-t.getTimezoneOffset(),C=n||!m?"Z":m>0?"+":"-";if(!n){var b=(m=Math.abs(m))%60;C+=u(Math.floor(m/60))+":"+u(b)}e=e.replace(/(^|[^\\])K/g,"$1"+C);var w=(n?t.getUTCDay():t.getDay())+1;return e=(e=(e=(e=(e=e.replace(new RegExp(i[0],"g"),i[w])).replace(new RegExp(a[0],"g"),a[w])).replace(new RegExp(r[0],"g"),r[f])).replace(new RegExp(o[0],"g"),o[f])).replace(/\\(.)/g,"$1")},createId:function(t){return[t||"id",+new Date,Math.round(100*Math.random())%100].join("-")},btoa:function(t){return l.include("util.base64").encode(t)},atob:function(t){return l.include("util.base64").decode(t)},timeLoop:function(t,e){return function(n,r){!function t(o){o<1||(1==o?(n.call(e,o),r.call(e)):setTimeout(function(){o>-1&&n.call(e,o--),o>-1&&t(o)},1))}(t)}},loop:function(t,e){var n=t,r=Math.ceil(t/5);return function(t){for(var o=0,i=1*r,a=2*r,u=3*r,c=4*r,f=i,l=a,s=u,p=c,h=n;o<f&&o<n;)t.call(e,o,1),o++,i<l&&i<n&&(t.call(e,i,2),i++),a<s&&a<n&&(t.call(e,a,3),a++),u<p&&u<n&&(t.call(e,u,4),u++),c<h&&c<n&&(t.call(e,c,5),c++)}},loopArray:function(t,e){var n=t.length,r=n,o=Math.ceil(n/5);return function(n){for(var i=0,a=1*o,u=2*o,c=3*o,f=4*o,l=a,s=u,p=c,h=f,d=r;i<l&&i<r;)n.call(e,t[i],i,1),i++,a<s&&a<r&&(n.call(e,t[a],a,2),a++),u<p&&u<r&&(n.call(e,t[u],u,3),u++),c<h&&c<r&&(n.call(e,t[c],c,4),c++),f<d&&f<r&&(n.call(e,t[f],f,5),f++)}},makeIndex:function(t,e){var n={};return this.loopArray(t)(function(t,r){var o=t[e];void 0===n[o]&&(n[o]=[]),n[o].push(r)}),n},startsWith:function(t,e,n){return n=n||0,t.lastIndexOf(e,n)===n},endsWith:function(t,e,n){var r=t;(void 0===n||n>r.length)&&(n=r.length),n-=e.length;var o=r.indexOf(e,n);return-1!==o&&o===n},inArray:function(t,e){if(this.typeCheck(["undefined","null"],t)||!this.typeCheck("array",e))return-1;for(var n=0,r=e.length;n<r;n++)if(e[n]==t)return n;return-1},trim:function(t){var e=new RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$","g");return null==t?"":(t+"").replace(e,"")},ready:function(){var t,e,n={"[object Boolean]":"boolean","[object Number]":"number","[object String]":"string","[object Function]":"function","[object Array]":"array","[object Date]":"date","[object RegExp]":"regexp","[object Object]":"object"},r={isReady:!1,readyWait:1,holdReady:function(t){t?r.readyWait++:r.ready(!0)},ready:function(e){if(!0===e&&!--r.readyWait||!0!==e&&!r.isReady){if(!document.body)return setTimeout(r.ready,1);if(r.isReady=!0,!0!==e&&--r.readyWait>0)return;t.resolveWith(document,[r])}},bindReady:function(){if(!t){if(t=r._Deferred(),"complete"===document.readyState)return setTimeout(r.ready,1);if(document.addEventListener)document.addEventListener("DOMContentLoaded",e,!1),window.addEventListener("load",r.ready,!1);else if(document.attachEvent){document.attachEvent("onreadystatechange",e),window.attachEvent("onload",r.ready);var n=!1;try{n=null==window.frameElement}catch(t){}document.documentElement.doScroll&&n&&o()}}},_Deferred:function(){var t,e,n,o=[],i={done:function(){if(!n){var e,a,u,c,f,l=arguments;for(t&&(f=t,t=0),e=0,a=l.length;e<a;e++)u=l[e],"array"===(c=r.type(u))?i.done.apply(i,u):"function"===c&&o.push(u);f&&i.resolveWith(f[0],f[1])}return this},resolveWith:function(r,i){if(!n&&!t&&!e){i=i||[],e=1;try{for(;o[0];)o.shift().apply(r,i)}finally{t=[r,i],e=0}}return this},resolve:function(){return i.resolveWith(this,arguments),this},isResolved:function(){return!(!e&&!t)},cancel:function(){return n=1,o=[],this}};return i},type:function(t){return null==t?String(t):n[Object.prototype.toString.call(t)]||"object"}};function o(){if(!r.isReady){try{document.documentElement.doScroll("left")}catch(t){return void setTimeout(o,1)}r.ready()}}return document.addEventListener?e=function(){document.removeEventListener("DOMContentLoaded",e,!1),r.ready()}:document.attachEvent&&(e=function(){"complete"===document.readyState&&(document.detachEvent("onreadystatechange",e),r.ready())}),function(e){r.bindReady(),r.type(e),t.done(e)}}(),param:function(t){var e=[],n=function(t,n){n=u.typeCheck("function",n)?n():null==n?"":n,e[e.length]=encodeURIComponent(t)+"="+encodeURIComponent(n)};for(var r in t)n(r,t[r]);return e.join("&").replace(/%20/g,"+")},ajax:function(t){var e=null,n="",r=null,o=u.extend({url:null,type:"GET",data:null,async:!0,success:null,fail:null},t);if(this.typeCheck("string",o.url)&&this.typeCheck("function",o.success)){if(this.typeCheck("object",o.data)&&(n=this.param(o.data)),this.typeCheck("undefined",XMLHttpRequest))for(var i=["MSXML2.XmlHttp.5.0","MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.3.0","MSXML2.XmlHttp.2.0","Microsoft.XmlHttp"],a=0,c=i.length;a<c;a++)try{e=new ActiveXObject(i[a]);break}catch(t){}else e=new XMLHttpRequest;null!=e&&(e.open(o.type,o.url,o.async),e.send(n),r=function(){4===e.readyState&&200==e.status?o.success(e):u.typeCheck("function",o.fail)&&o.fail(e)},o.async?e.onreadystatechange=r:r())}},scrollWidth:function(){var t=document.createElement("p");t.style.width="100%",t.style.height="200px";var e=document.createElement("div");e.style.position="absolute",e.style.top="0px",e.style.left="0px",e.style.visibility="hidden",e.style.width="200px",e.style.height="150px",e.style.overflow="hidden",e.appendChild(t),document.body.appendChild(e);var n=t.offsetWidth;e.style.overflow="scroll";var r=t.offsetWidth;return n==r&&(r=e.clientWidth),document.body.removeChild(e),n-r}},c=function(t){for(var e=[],n=0;n<t.length;n++){var o=r[t[n]];if(u.typeCheck(["function","object"],o))e.push(o);else{var i=f(t[n]);null==i?(console.warn("JUI_WARNING_MSG: '"+t[n]+"' is not loaded"),e.push(null)):e.push(i)}}return e},f=function(t){var e=null;t+=".";for(var n in r)if(-1!=n.indexOf(t)&&u.typeCheck(["function","object"],r[n])){var o=n.split(t).join("");-1==o.indexOf(".")&&(null==e&&(e={}),e[o]=r[n])}return e},l={ready:function(){var t=[],e=2==arguments.length?arguments[1]:arguments[0],n=2==arguments.length?arguments[0]:null;if(!u.typeCheck(["array","null"],n)||!u.typeCheck("function",e))throw new Error("JUI_CRITICAL_ERR: Invalid parameter type of the function");u.ready(function(){if(n)t=c(n);else{var r=f("ui"),o={};u.extend(o,r),u.extend(o,f("grid")),t=[r,o,u]}e.apply(null,t)})},defineUI:function(t,e,n,a){if(!(u.typeCheck("string",t)&&u.typeCheck("array",e)&&u.typeCheck("function",n)&&u.typeCheck(["string","undefined"],a)))throw new Error("JUI_CRITICAL_ERR: Invalid parameter type of the function");if(u.typeCheck("function",i[t]))throw new Error("JUI_CRITICAL_ERR: '"+t+"' is already exist");if(u.typeCheck("undefined",a)&&(a="core"),!u.typeCheck("function",i[a]))throw new Error("JUI_CRITICAL_ERR: Parents are the only function");if(!0!==o[a])throw new Error("JUI_CRITICAL_ERR: UI function can not be inherited");var f=c(e),l=n.apply(null,f);u.inherit(l,i[a]),console.log(a),console.log(i[a]),r[t]=i[a].init({type:t,class:l}),i[t]=l,o[t]=!0},redefineUI:function(t,e,n,a,u){u||!0!==o[t]||(r[t]=null,i[t]=null,o[t]=!1),(!u||u&&!0!==o[t])&&this.defineUI(t,e,n,a)},createUIObject:function(t,e,n,r,o,i){var a=new t.class,c=l.defineOptions(t.class,o||{});for(var f in a.init.prototype=a,a.init.prototype.selector=e,a.init.prototype.root=r,a.init.prototype.options=c,a.init.prototype.tpl={},a.init.prototype.event=new Array,a.init.prototype.timestamp=(new Date).getTime(),a.init.prototype.index=n,a.init.prototype.module=t,u.typeCheck("function",i)&&i(a,c),c.tpl){var s=c.tpl[f];u.typeCheck("string",s)&&""!=s&&(a.init.prototype.tpl[f]=u.template(s))}var p=new a.init;for(var h in c.event)p.on(h,c.event[h]);return r.jui=p,p},define:function(t,e,n,a){if(!(u.typeCheck("string",t)&&u.typeCheck("array",e)&&u.typeCheck("function",n)&&u.typeCheck(["string","undefined","null"],a)))throw new Error("JUI_CRITICAL_ERR: Invalid parameter type of the function");if(u.typeCheck("function",i[t]))throw new Error("JUI_CRITICAL_ERR: '"+t+"' is already exist");var f=c(e),l=n.apply(null,f);if(u.typeCheck("function",i[a])){if(!0!==o[a])throw new Error("JUI_CRITICAL_ERR: UI function can not be inherited");u.inherit(l,i[a])}r[t]=l,i[t]=l,o[t]=!0},redefine:function(t,e,n,a,u){u||!0!==o[t]||(r[t]=null,i[t]=null,o[t]=!1),(!u||u&&!0!==o[t])&&this.define(t,e,n,a)},defineOptions:function(t,e,n){for(var r=function t(e,n){if(u.typeCheck("function",e)){if(u.typeCheck("function",e.setup)){var r=e.setup();for(var o in r)u.typeCheck("undefined",n[o])&&(n[o]=r[o])}t(e.parent,n)}return n}(t,{}),o=Object.keys(r),i=Object.keys(e),a=0;a<i.length;a++){var c=i[a];if(-1==u.inArray(c,o)&&-1==u.inArray(c,n))throw new Error("JUI_CRITICAL_ERR: '"+c+"' is not an option")}return u.extend(e,r,!0),e},include:function(t){if(!u.typeCheck("string",t))throw new Error("JUI_CRITICAL_ERR: Invalid parameter type of the function");var e=r[t];if(u.typeCheck(["function","object"],e))return e;var n=f(t);return null==n?(console.warn("JUI_WARNING_MSG: '"+t+"' is not loaded"),null):n},includeAll:function(){var t=[];for(var e in r)t.push(r[e]);return t},log:function(t){var e=window.open(t||a.logUrl,"JUIM","width=1024, height=768, toolbar=no, menubar=no, resizable=yes");return l.debugAll(function(t,n){e.log(t,n)}),e},setup:function(t){return u.typeCheck("object",t)&&(a=u.extend(a,t)),a},use:function(){for(var t=[],e=0;e<arguments.length;e++)if(u.typeCheck("array",arguments[e]))for(var n=arguments[e],r=0;r<n.length;r++)u.typeCheck("object",n[r])&&t.push(n[r]);else u.typeCheck("object",arguments[e])&&t.push(arguments[e]);for(e=0;e<t.length;e++){var o=t[e];if("object"==typeof o){if("string"!=typeof o.name)return;if("function"!=typeof o.component)return;null!=o.extend&&null==l.include(o.extend)&&console.warn("JUI_WARNING_MSG: '"+o.extend+"' module should be imported in first"),"core"==o.extend||"event"==o.extend?l.redefineUI(o.name,[],o.component,o.extend):l.redefine(o.name,[],o.component,o.extend)}}}},s=l,p={name:"util.dom",extend:null,component:function(){var t=s.include("util.base");return{find:function(){var e=arguments;if(1==e.length){if(t.typeCheck("string",e[0]))return document.querySelectorAll(e[0])}else if(2==e.length&&t.typeCheck("object",e[0])&&t.typeCheck("string",e[1]))return e[0].querySelectorAll(e[1]);return[]},each:function(e,n){if(t.typeCheck("function",n)){var r=null;t.typeCheck("string",e)?r=document.querySelectorAll(e):t.typeCheck("array",e)&&(r=e),null!=r&&Array.prototype.forEach.call(r,function(t,e){n.apply(t,[e,t])})}},attr:function(e,n){if(t.typeCheck(["string","array"],e)){var r=document.querySelectorAll(e);if(t.typeCheck("object",n))for(var o=0;o<r.length;o++)for(var i in n)r[o].setAttribute(i,n[i]);else if(t.typeCheck("string",n)&&r.length>0)return r[0].getAttribute(n)}},remove:function(t){this.each(t,function(){this.parentNode.removeChild(this)})},offset:function(t){var e,n,r={top:0,left:0},o=t&&t.ownerDocument;if(o){e=o.documentElement;return void 0!==t.getBoundingClientRect&&(r=t.getBoundingClientRect()),n=function(t){return function(t){return null!=t&&t==t.window}(t)?t:9===t.nodeType&&(t.defaultView||t.parentWindow)}(o),{top:r.top+(n.pageYOffset||e.scrollTop)-(e.clientTop||0),left:r.left+(n.pageXOffset||e.scrollLeft)-(e.clientLeft||0)}}}}}},h={name:"util.sort",extend:null,component:function(){return function(t,e){var n=null;t=e?t.slice(0):t;function r(e,n){var r=t[e];t[e]=t[n],t[n]=r}this.setCompare=function(t){n=t},this.run=function(e,o){var i=null;return"number"!=typeof e&&(e=0),"number"!=typeof o&&(o=t.length-1),e<o&&(i=e+Math.ceil(.5*(o-e)),newPivot=function(e,o,i){var a=o,u=t[e];r(e,i);for(var c=o;c<i;c++)(n(t[c],u)||!n(u,t[c])&&c%2==1)&&(r(c,a),a++);return r(i,a),a}(i,e,o),this.run(e,newPivot-1),this.run(newPivot+1,o)),t}}}},d={name:"util.keyparser",extend:null,component:function(){return function(){this.isIndexDepth=function(t){return"string"==typeof t&&-1!=t.indexOf(".")},this.getIndexList=function(t){for(var e=[],n=(""+t).split("."),r=0;r<n.length;r++)e[r]=parseInt(n[r]);return e},this.changeIndex=function(t,e,n){for(var r=this.getIndexList(n).length,o=this.getIndexList(t),i=this.getIndexList(e),a=0;a<r;a++)o.shift();return i.concat(o).join(".")},this.getNextIndex=function(t){var e=this.getIndexList(t),n=e.pop()+1;return e.push(n),e.join(".")},this.getParentIndex=function(t){return this.isIndexDepth(t)?t.substr(0,t.lastIndexOf(".")):null}}}},y={name:"util.base64",extend:null,component:function(){var t={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var n,r,o,i,a,u,c,f="",l=0;for(e=t._utf8_encode(e);l<e.length;)i=(n=e.charCodeAt(l++))>>2,a=(3&n)<<4|(r=e.charCodeAt(l++))>>4,u=(15&r)<<2|(o=e.charCodeAt(l++))>>6,c=63&o,isNaN(r)?u=c=64:isNaN(o)&&(c=64),f=f+t._keyStr.charAt(i)+t._keyStr.charAt(a)+t._keyStr.charAt(u)+t._keyStr.charAt(c);return f},decode:function(e){var n,r,o,i,a,u,c="",f=0;for(e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");f<e.length;)n=t._keyStr.indexOf(e.charAt(f++))<<2|(i=t._keyStr.indexOf(e.charAt(f++)))>>4,r=(15&i)<<4|(a=t._keyStr.indexOf(e.charAt(f++)))>>2,o=(3&a)<<6|(u=t._keyStr.indexOf(e.charAt(f++))),c+=String.fromCharCode(n),64!=a&&(c+=String.fromCharCode(r)),64!=u&&(c+=String.fromCharCode(o));return c=t._utf8_decode(c)},_utf8_encode:function(t){t=t.replace(/\r\n/g,"\n");for(var e=String.fromCharCode(239)+String.fromCharCode(187)+String.fromCharCode(191),n=0;n<t.length;n++){var r=t.charCodeAt(n);r<128?e+=String.fromCharCode(r):r>127&&r<2048?(e+=String.fromCharCode(r>>6|192),e+=String.fromCharCode(63&r|128)):(e+=String.fromCharCode(r>>12|224),e+=String.fromCharCode(r>>6&63|128),e+=String.fromCharCode(63&r|128))}return e},_utf8_decode:function(t){for(var e="",n=0,r=c1=c2=0;n<t.length;)(r=t.charCodeAt(n))<128?(e+=String.fromCharCode(r),n++):r>191&&r<224?(c2=t.charCodeAt(n+1),e+=String.fromCharCode((31&r)<<6|63&c2),n+=2):(c2=t.charCodeAt(n+1),c3=t.charCodeAt(n+2),e+=String.fromCharCode((15&r)<<12|(63&c2)<<6|63&c3),n+=3);return e}};return t}},g={name:"util.math",extend:null,component:function(){var t=s.include("util.base");function e(t,e){for(var n=[],r=0,o=t.length;r<o;r++){for(var i=0,a=0,u=t[r].length;a<u;a++)i+=t[r][a]*e[a];n.push(i)}return n}return{rotate:function(t,e,n){return{x:t*Math.cos(n)-e*Math.sin(n),y:t*Math.sin(n)+e*Math.cos(n)}},resize:function(t,e,n,r){var o=r/n;return n>=t&&o<=1?(n=t,r=e*o):r>=e&&(r=e,n=t/o),{width:n,height:r}},radian:function(t){return t*Math.PI/180},degree:function(t){return 180*t/Math.PI},angle:function(t,e,n,r){var o=n-t,i=r-e;return Math.atan2(i,o)},interpolateNumber:function(t,e){var n=e-t;return function(e){return t+n*e}},interpolateRound:function(t,e){var n=e-t;return function(e){return Math.round(t+n*e)}},getFixed:function(t,e){var n=(t+"").split("."),r=n.length<2?0:n[1].length,o=(e+"").split("."),i=o.length<2?0:o[1].length;return r>i?r:i},fixed:function(t){var e=this.getFixed(t,0),n=Math.pow(10,e),r=function(t){return Math.round(t*n)/n};return r.plus=function(t,e){return Math.round(t*n+e*n)/n},r.minus=function(t,e){return Math.round(t*n-e*n)/n},r.multi=function(t,e){return Math.round(t*n*(e*n))/(n*n)},r.div=function(t,e){var r=t*n/(e*n),o=Math.pow(10,this.getFixed(r,0));return Math.round(r*o)/o},r.remain=function(t,e){return Math.round(t*n%(e*n))/n},r},round:function(t,e){var n=Math.pow(10,e);return Math.round(t*n)/n},plus:function(t,e){var n=Math.pow(10,this.getFixed(t,e));return Math.round(t*n+e*n)/n},minus:function(t,e){var n=Math.pow(10,this.getFixed(t,e));return Math.round(t*n-e*n)/n},multi:function(t,e){var n=Math.pow(10,this.getFixed(t,e));return Math.round(t*n*(e*n))/(n*n)},div:function(t,e){var n=Math.pow(10,this.getFixed(t,e)),r=t*n/(e*n),o=Math.pow(10,this.getFixed(r,0));return Math.round(r*o)/o},remain:function(t,e){var n=Math.pow(10,this.getFixed(t,e));return Math.round(t*n%(e*n))/n},nice:function(t,e,n,r){if(r=r||!1,t>e)var o=t,i=e;else i=t,o=e;var a,u,c=n,f=0,l=[];function s(t,e){var n=Math.floor(Math.log(t)/Math.LN10),r=t/Math.pow(10,n);return niceFraction=e?r<1.5?1:r<3?2:r<7?5:10:r<=1?1:r<=2?2:r<=5?5:10,niceFraction*Math.pow(10,n)}return l=r?s(o-i,!1):o-i,f=r?s(l/c,!0):l/c,a=r?Math.floor(i/f)*f:i,u=r?Math.floor(o/f)*f:o,{min:a,max:u,range:l,spacing:f}},matrix:function(n,r){return t.typeCheck("array",r[0])?function(t,n){for(var r=[],o=[],i=0,a=n.length;i<a;i++)r[i]=[],o[i]=[];for(i=0,a=n.length;i<a;i++)for(var u=0,c=n[i].length;u<c;u++)r[u].push(n[i][u]);for(i=0,a=r.length;i<a;i++){var f=e(t,r[i]);for(u=0,c=f.length;u<c;u++)o[u].push(f[u])}return o}(n,r):e(n,r)},matrix3d:function(t,e){return e[0]instanceof Array||e[0]instanceof Float32Array?function(t,e){var n=[new Float32Array(4),new Float32Array(4),new Float32Array(4),new Float32Array(4)],r=[new Float32Array([e[0][0],e[1][0],e[2][0],e[3][0]]),new Float32Array([e[0][1],e[1][1],e[2][1],e[3][1]]),new Float32Array([e[0][2],e[1][2],e[2][2],e[3][2]]),new Float32Array([e[0][3],e[1][3],e[2][3],e[3][3]])];return n[0][0]=t[0][0]*r[0][0]+t[0][1]*r[0][1]+t[0][2]*r[0][2]+t[0][3]*r[0][3],n[1][0]=t[1][0]*r[0][0]+t[1][1]*r[0][1]+t[1][2]*r[0][2]+t[1][3]*r[0][3],n[2][0]=t[2][0]*r[0][0]+t[2][1]*r[0][1]+t[2][2]*r[0][2]+t[2][3]*r[0][3],n[3][0]=t[3][0]*r[0][0]+t[3][1]*r[0][1]+t[3][2]*r[0][2]+t[3][3]*r[0][3],n[0][1]=t[0][0]*r[1][0]+t[0][1]*r[1][1]+t[0][2]*r[1][2]+t[0][3]*r[1][3],n[1][1]=t[1][0]*r[1][0]+t[1][1]*r[1][1]+t[1][2]*r[1][2]+t[1][3]*r[1][3],n[2][1]=t[2][0]*r[1][0]+t[2][1]*r[1][1]+t[2][2]*r[1][2]+t[2][3]*r[1][3],n[3][1]=t[3][0]*r[1][0]+t[3][1]*r[1][1]+t[3][2]*r[1][2]+t[3][3]*r[1][3],n[0][2]=t[0][0]*r[2][0]+t[0][1]*r[2][1]+t[0][2]*r[2][2]+t[0][3]*r[2][3],n[1][2]=t[1][0]*r[2][0]+t[1][1]*r[2][1]+t[1][2]*r[2][2]+t[1][3]*r[2][3],n[2][2]=t[2][0]*r[2][0]+t[2][1]*r[2][1]+t[2][2]*r[2][2]+t[2][3]*r[2][3],n[3][2]=t[3][0]*r[2][0]+t[3][1]*r[2][1]+t[3][2]*r[2][2]+t[3][3]*r[2][3],n[0][3]=t[0][0]*r[3][0]+t[0][1]*r[3][1]+t[0][2]*r[3][2]+t[0][3]*r[3][3],n[1][3]=t[1][0]*r[3][0]+t[1][1]*r[3][1]+t[1][2]*r[3][2]+t[1][3]*r[3][3],n[2][3]=t[2][0]*r[3][0]+t[2][1]*r[3][1]+t[2][2]*r[3][2]+t[2][3]*r[3][3],n[3][3]=t[3][0]*r[3][0]+t[3][1]*r[3][1]+t[3][2]*r[3][2]+t[3][3]*r[3][3],n}(t,e):function(t,e){var n=new Float32Array(4);return n[0]=t[0][0]*e[0]+t[0][1]*e[1]+t[0][2]*e[2]+t[0][3]*e[3],n[1]=t[1][0]*e[0]+t[1][1]*e[1]+t[1][2]*e[2]+t[1][3]*e[3],n[2]=t[2][0]*e[0]+t[2][1]*e[1]+t[2][2]*e[2]+t[2][3]*e[3],n[3]=t[3][0]*e[0]+t[3][1]*e[1]+t[3][2]*e[2]+t[3][3]*e[3],n}(t,e)},inverseMatrix3d:function(t){return function(t){var e=[new Float32Array(4),new Float32Array(4),new Float32Array(4),new Float32Array(4)],n=t[0][0],r=t[0][1],o=t[0][2],i=t[0][3],a=t[1][0],u=t[1][1],c=t[1][2],f=t[1][3],l=t[2][0],s=t[2][1],p=t[2][2],h=t[2][3],d=t[3][0],y=t[3][1],g=t[3][2],v=t[3][3];e[0][0]=c*h*y-f*p*y+f*s*g-u*h*g-c*s*v+u*p*v,e[0][1]=i*p*y-o*h*y-i*s*g+r*h*g+o*s*v-r*p*v,e[0][2]=o*f*y-i*c*y+i*u*g-r*f*g-o*u*v+r*c*v,e[0][3]=i*c*s-o*f*s-i*u*p+r*f*p+o*u*h-r*c*h,e[1][0]=f*p*d-c*h*d-f*l*g+a*h*g+c*l*v-a*p*v,e[1][1]=o*h*d-i*p*d+i*l*g-n*h*g-o*l*v+n*p*v,e[1][2]=i*c*d-o*f*d-i*a*g+n*f*g+o*a*v-n*c*v,e[1][3]=o*f*l-i*c*l+i*a*p-n*f*p-o*a*h+n*c*h,e[2][0]=u*h*d-f*s*d+f*l*y-a*h*y-u*l*v+a*s*v,e[2][1]=i*s*d-r*h*d-i*l*y+n*h*y+r*l*v-n*s*v,e[2][2]=r*f*d-i*u*d+i*a*y-n*f*y-r*a*v+n*u*v,e[2][3]=i*u*l-r*f*l-i*a*s+n*f*s+r*a*h-n*u*h,e[3][0]=c*s*d-u*p*d-c*l*y+a*p*y+u*l*g-a*s*g,e[3][1]=r*p*d-o*s*d+o*l*y-n*p*y-r*l*g+n*s*g,e[3][2]=o*u*d-r*c*d-o*a*y+n*c*y+r*a*g-n*u*g,e[3][4]=r*c*l-o*u*l+o*a*s-n*c*s-r*a*p+n*u*p;var m=1/(n*e[0][0]+a*e[0][1]+l*e[0][2]+d*e[0][3]);return 0===m?e=[new Float32Array([1,0,0,0]),new Float32Array([0,1,0,0]),new Float32Array([0,0,1,0]),new Float32Array([0,0,0,1])]:(e[0][0]*=m,e[0][1]*=m,e[0][2]*=m,e[0][3]*=m,e[1][0]*=m,e[1][1]*=m,e[1][2]*=m,e[1][3]*=m,e[2][0]*=m,e[2][1]*=m,e[2][2]*=m,e[2][3]*=m,e[3][0]*=m,e[3][1]*=m,e[3][2]*=m,e[3][4]*=m),e}(t)},scaleValue:function(t,e,n,r,o){return(o-r)*((t-(e=e==n?0:e))/(n-e))+r}}}},v={name:"util.color",extend:null,component:function(){var t=s.include("util.base"),e=s.include("util.math");var n={regex:/(linear|radial)\((.*)\)(.*)/i,format:function(t,e){if("hex"==e){var n=t.r.toString(16);t.r<16&&(n="0"+n);var r=t.g.toString(16);t.g<16&&(r="0"+r);var o=t.b.toString(16);return t.b<16&&(o="0"+o),"#"+[n,r,o].join("").toUpperCase()}return"rgb"==e?void 0===t.a?"rgb("+[t.r,t.g,t.b].join(",")+")":"rgba("+[t.r,t.g,t.b,t.a].join(",")+")":t},scale:function(){var t,r;function o(e,o){var i={r:parseInt(t.r+(r.r-t.r)*e,10),g:parseInt(t.g+(r.g-t.g)*e,10),b:parseInt(t.b+(r.b-t.b)*e,10)};return n.format(i,o)}return o.domain=function(e,i){return t=n.rgb(e),r=n.rgb(i),o},o.ticks=function(t){for(var n=1/t,r=0,i=[];r<=1;){var a=o(r,"hex");i.push(a),r=e.plus(r,n)}return i},o},map:function(t,e){var r=[];e=e||5;for(var o=n.scale(),i=0,a=t.length-1;i<a;i++)if(0==i)r=o.domain(t[i],t[i+1]).ticks(e);else{var u=o.domain(t[i],t[i+1]).ticks(e);u.shift(),r=r.concat(u)}return r},rgb:function(e){if("string"==typeof e){if(e.indexOf("rgb(")>-1){for(var n=0,r=(o=e.replace("rgb(","").replace(")","").split(",")).length;n<r;n++)o[n]=parseInt(t.trim(o[n]),10);return{r:o[0],g:o[1],b:o[2],a:1}}if(e.indexOf("rgba(")>-1){for(n=0,r=(o=e.replace("rgba(","").replace(")","").split(",")).length;n<r;n++)o[n]=r-1==n?parseFloat(t.trim(o[n])):parseInt(t.trim(o[n]),10);return{r:o[0],g:o[1],b:o[2],a:o[3]}}if(0==e.indexOf("#")){var o=[];if(3==(e=e.replace("#","")).length)for(n=0,r=e.length;n<r;n++){var i=e.substr(n,1);o.push(parseInt(i+i,16))}else for(n=0,r=e.length;n<r;n+=2)o.push(parseInt(e.substr(n,2),16));return{r:o[0],g:o[1],b:o[2],a:1}}}return e},HSVtoRGB:function(t,e,n){360==t&&(t=0);var r=e*n,o=r*(1-Math.abs(t/60%2-1)),i=n-r,a=[];return 0<=t&&t<60?a=[r,o,0]:60<=t&&t<120?a=[o,r,0]:120<=t&&t<180?a=[0,r,o]:180<=t&&t<240?a=[0,o,r]:240<=t&&t<300?a=[o,0,r]:300<=t&&t<360&&(a=[r,0,o]),{r:Math.ceil(255*(a[0]+i)),g:Math.ceil(255*(a[1]+i)),b:Math.ceil(255*(a[2]+i))}},RGBtoHSV:function(t,e,n){var r=t/255,o=e/255,i=n/255,a=Math.max(r,o,i),u=a-Math.min(r,o,i),c=0;0==u?c=0:a==r?c=(o-i)/u%6*60:a==o?c=60*((i-r)/u+2):a==i&&(c=60*((r-o)/u+4)),c<0&&(c=360+c);return{h:c,s:0==a?0:u/a,v:a}},trim:function(t){return(t||"").replace(/^\s+|\s+$/g,"")},lighten:function(t,e){t=t.replace(/[^0-9a-f]/gi,""),e=e||0;var n,r,o=[];for(r=0;r<6;r+=2)n=parseInt(t.substr(r,2),16),n=Math.round(Math.min(Math.max(0,n+n*e),255)).toString(16),o.push(("00"+n).substr(n.length));return"#"+o.join("")},darken:function(t,e){return this.lighten(t,-e)},parse:function(t){return this.parseGradient(t)},parseGradient:function(t){var e=t.match(this.regex);if(!e)return t;var n=this.trim(e[1]);return{type:n+"Gradient",attr:this.parseAttr(n,this.trim(e[2])),children:this.parseStop(this.trim(e[3]))}},parseStop:function(t){for(var e=t.split(","),n=[],r=0,o=e.length;r<o;r++){var i=(t=e[r]).split(" ");0!=i.length&&(1==i.length?n.push({type:"stop",attr:{"stop-color":i[0]}}):2==i.length?n.push({type:"stop",attr:{offset:i[0],"stop-color":i[1]}}):3==i.length&&n.push({type:"stop",attr:{offset:i[0],"stop-color":i[1],"stop-opacity":i[2]}}))}var a=-1,u=-1;for(r=0,o=n.length;r<o;r++){t=n[r];if(0==r?t.offset||(t.offset=0):r==o-1&&(t.offset||(t.offset=1)),-1==a&&void 0===t.offset)a=r;else if(-1==u&&void 0===t.offset){for(var c=(u=r)-a,f=n[u].offset.indexOf("%")>-1?parseFloat(n[u].offset)/100:n[u].offset,l=n[a].offset.indexOf("%")>-1?parseFloat(n[a].offset)/100:n[a].offset,s=(f-l)/c,p=l+s,h=a+1;h<u;h++)n[h].offset=p,p+=s;a=u,u=-1}}return n},parseAttr:function(t,e){if("linear"!=t){for(r=0,o=(n=e.split(",")).length;r<o;r++)-1==n[r].indexOf("%")&&(n[r]=parseFloat(n[r]));return{cx:n[0],cy:n[1],r:n[2],fx:n[3],fy:n[4]}}switch(e){case"":case"left":return{x1:0,y1:0,x2:1,y2:0,direction:e||"left"};case"right":return{x1:1,y1:0,x2:0,y2:0,direction:e};case"top":return{x1:0,y1:0,x2:0,y2:1,direction:e};case"bottom":return{x1:0,y1:1,x2:0,y2:0,direction:e};case"top left":return{x1:0,y1:0,x2:1,y2:1,direction:e};case"top right":return{x1:1,y1:0,x2:0,y2:1,direction:e};case"bottom left":return{x1:0,y1:1,x2:1,y2:0,direction:e};case"bottom right":return{x1:1,y1:1,x2:0,y2:0,direction:e};default:for(var n,r=0,o=(n=e.split(",")).length;r<o;r++)-1==n[r].indexOf("%")&&(n[r]=parseFloat(n[r]));return{x1:n[0],y1:n[1],x2:n[2],y2:n[3]}}},colorHash:function(t,e){var n=0;return t&&(n=function(t){var e=0,n=1,r=0;if(t){for(var o=0;o<t.length&&!(o>6);o++)e+=n*(t.charCodeAt(o)%10),r+=9*n,n*=.7;r>0&&(e/=r)}return e}(t=(t=t.replace(/.*`/,"")).replace(/\(.*/,""))),"function"==typeof e?e(n):{r:200+Math.round(55*n),g:0+Math.round(230*(1-n)),b:0+Math.round(55*(1-n))}}};return n.map.parula=function(t){return n.map(["#352a87","#0f5cdd","#00b5a6","#ffc337","#fdff00"],t)},n.map.jet=function(t){return n.map(["#00008f","#0020ff","#00ffff","#51ff77","#fdff00","#ff0000","#800000"],t)},n.map.hsv=function(t){return n.map(["#ff0000","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff","#ff0000"],t)},n.map.hot=function(t){return n.map(["#0b0000","#ff0000","#ffff00","#ffffff"],t)},n.map.pink=function(t){return n.map(["#1e0000","#bd7b7b","#e7e5b2","#ffffff"],t)},n.map.bone=function(t){return n.map(["#000000","#4a4a68","#a6c6c6","#ffffff"],t)},n.map.copper=function(t){return n.map(["#000000","#3d2618","#9d623e","#ffa167","#ffc77f"],t)},n}},m={name:"manager",extend:null,component:function(){var t=s.include("util.base"),e=new function(){var n=[],r=[];this.add=function(t){n.push(t)},this.emit=function(t,e,r){for(var o=[],i=0;i<n.length;i++){t!=(a=n[i]).selector&&t!=a.type||o.push(a)}for(i=0;i<o.length;i++)for(var a=o[i],u=0;u<a.length;u++)a[u].emit(e,r)},this.get=function(e){if(t.typeCheck("integer",e))return n[e];if(t.typeCheck("string",e)){for(var r=0;r<n.length;r++){if(e==(i=n[r]).selector)return 1==i.length?i[0]:i}var o=[];for(r=0;r<n.length;r++){var i;e==(i=n[r]).type&&o.push(i)}return o}},this.getAll=function(){return n},this.remove=function(e){if(t.typeCheck("integer",e))return n.splice(e,1)[0]},this.shift=function(){return n.shift()},this.pop=function(){return n.pop()},this.size=function(){return n.length},this.debug=function(e,n,r,o){if(e.__proto__){var i=["emit","on","addEvent","addValid","callBefore","callAfter","callDelay","setTpl","setVo","setOption"];for(var a in e){var u=e[a];"function"==typeof u&&-1==t.inArray(a,i)&&function(t,r,i,a){e.__proto__[t]=function(){var e=Date.now(),u=r.apply(this,arguments),c=Date.now();return"function"==typeof o?o({type:s.get(n).type,name:t,c_index:i,u_index:a,time:c-e},arguments):(isNaN(i)||isNaN(a)?console.log("NAME("+t+"), TIME("+(c-e)+"ms), ARGUMENTS..."):console.log("TYPE("+s.get(n).type+"), NAME("+t+"), INDEX("+i+":"+a+"), TIME("+(c-e)+"ms), ARGUMENTS..."),console.log(arguments),console.log("")),u}}(a,u,n,r)}}},this.debugAll=function(t){for(var e=0;e<n.length;e++)for(var r=n[e],o=0;o<r.length;o++)this.debug(r[o],e,o,t)},this.addClass=function(t){r.push(t)},this.getClass=function(e){if(t.typeCheck("integer",e))return r[e];if(t.typeCheck("string",e))for(var n=0;n<r.length;n++)if(e==r[n].type)return r[n];return null},this.getClassAll=function(){return r},this.create=function(n,r,o){var i=e.getClass(n);if(t.typeCheck("null",i))throw new Error("JUI_CRITICAL_ERR: '"+n+"' does not exist");return i.class(r,o)}};return e}},C={name:"collection",extend:null,component:function(){var t=function(t,e,n,r){this.type=t,this.selector=e,this.options=n,this.destroy=function(){for(var t=0;t<r.length;t++)r[t].destroy()};for(var o=0;o<r.length;o++)this.push(r[o])};return t.prototype=Object.create(Array.prototype),t}},b={name:"core",extend:null,component:function(){var t=s.include("util.base"),e=s.include("util.dom"),n=s.include("manager"),r=s.include("collection"),o=function(){this.emit=function(e,n){if(t.typeCheck("string",e)){for(var r,o=0;o<this.event.length;o++){var i=this.event[o];if(i.type==e.toLowerCase()){var a=t.typeCheck("array",n)?n:[n];r=i.callback.apply(this,a)}}return r}},this.on=function(e,n){t.typeCheck("string",e)&&t.typeCheck("function",n)&&this.event.push({type:e.toLowerCase(),callback:n,unique:!1})},this.off=function(e){for(var n=[],r=0;r<this.event.length;r++){var o=this.event[r];(t.typeCheck("function",e)&&o.callback!=e||t.typeCheck("string",e)&&o.type!=e.toLowerCase())&&n.push(o)}this.event=n},this.addValid=function(e,n){if(this.__proto__){var r=this.__proto__[e];this.__proto__[e]=function(){for(var o=arguments,i=0;i<o.length;i++)if(!t.typeCheck(n[i],o[i]))throw new Error("JUI_CRITICAL_ERR: the "+i+"th parameter is not a "+n[i]+" ("+e+")");return r.apply(this,o)}}},this.callBefore=function(e,n){if(this.__proto__){var r=this.__proto__[e];this.__proto__[e]=function(){var e=arguments;return t.typeCheck("function",n)?!1!==n.apply(this,e)?r.apply(this,e):void 0:r.apply(this,e)}}},this.callAfter=function(e,n){if(this.__proto__){var r=this.__proto__[e];this.__proto__[e]=function(){var e=arguments,o=r.apply(this,e);return t.typeCheck("function",n)&&!1!==o&&n.apply(this,e),o}}},this.callDelay=function(e,n){if(this.__proto__){var r=this.__proto__[e],o=isNaN(n.delay)?0:n.delay;this.__proto__[e]=function(){var e=this,r=arguments;t.typeCheck("function",n.before)&&n.before.apply(e,r),o>0?setTimeout(function(){i(e,r)},o):i(e,r)}}function i(e,o){var i=r.apply(e,o);t.typeCheck("function",n.after)&&!1!==i&&n.after.apply(e,o)}},this.setTpl=function(e,n){this.tpl[e]=t.template(n)},this.setOption=function(e,n){if(t.typeCheck("object",e))for(var r in e)this.options[r]=e[r];else this.options[e]=n},this.destroy=function(){if(this.__proto__)for(var t in this.__proto__)delete this.__proto__[t]}};return o.build=function(o){return function(i,a){var u=[],c=[];t.typeCheck("string",i)?c=e.find(i):t.typeCheck("object",i)?c.push(i):c.push(document.createElement("div"));for(var f=0,l=c.length;f<l;f++)u[f]=s.createUIObject(o,i,f,c[f],a);return n.add(new r(o.type,i,a,u)),0==u.length?null:1==u.length?u[0]:u}},o.init=function(t){var e=null;return"object"==typeof t&&(e=o.build(t),n.addClass({type:t.type,class:e})),e},o.setup=function(){return{tpl:{},event:{}}},o}};s.use([p,h,d,y,g,v,m,C,b]);var w=s.include("util.base"),x=s.include("manager");w.extend(s,x,!0);var _=s;window.jui=window.JUI=_}]);