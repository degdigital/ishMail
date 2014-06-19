/*!
 * URL Handler - v0.1
 *
 * Copyright (c) 2013 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Helps handle the initial iFrame source. Parses a string to see if it matches
 * an expected pattern in Pattern Lab. Supports Pattern Labs fuzzy pattern partial
 * matching style.
 *
 */
var urlHandler={skipBack:!1,targetOrigin:"file:"==window.location.protocol?"*":window.location.protocol+"//"+window.location.host,getFileName:function(t){var e="patterns",n="";if(void 0==t)return n;if("all"==t)return"styleguide/html/styleguide.html";var i=-1!=t.indexOf("viewall-")?viewAllPaths:patternPaths;nameClean=t.replace("viewall-","");var a=this.getPatternInfo(nameClean,i),o=a[0],l=a[1];if(void 0!=i[o]&&void 0!=i[o][l])n=i[o][l];else if(void 0!=i[o])for(patternMatchKey in i[o])if(-1!=patternMatchKey.indexOf(l)){n=i[o][patternMatchKey];break}if(""==n)return n;var r=/\//g;return-1!=t.indexOf("viewall-")&&""!=n?n=e+"/"+n.replace(r,"-")+"/index.html":""!=n&&(n=e+"/"+n.replace(r,"-")+"/"+n.replace(r,"-")+".html"),n},getPatternInfo:function(t,e){for(var n=t.split("-"),i=1,a=n.length,o=n[0];void 0==e[o]&&a>i;)o+="-"+n[i],i++;return pattern=t.slice(o.length+1,t.length),[o,pattern]},getRequestVars:function(){var t=new function(t){if(t.length>1)for(var e,n=0,i=t.substr(1).split("&");n<i.length;n++)e=i[n].split("="),this[unescape(e[0])]=e.length>1?unescape(e[1]):""}(window.location.search);return t},pushPattern:function(t,e){var n={pattern:t},i=urlHandler.getFileName(t),a=window.location.protocol+"//"+window.location.host+window.location.pathname.replace("public/index.html","public/")+i;if(e!=a)document.getElementById("sg-viewport").contentWindow.postMessage({path:i},urlHandler.targetOrigin);else{var o="file:"==window.location.protocol?null:window.location.protocol+"//"+window.location.host+window.location.pathname.replace("index.html","")+"?p="+t;history.pushState(n,null,o),document.getElementById("title").innerHTML="Pattern Lab - "+t,document.getElementById("sg-raw").setAttribute("href",urlHandler.getFileName(t))}},popPattern:function(t){var e=t.state;if(null==e)return this.skipBack=!1,void 0;if(null!=e)var n=e.pattern;var i="";i=this.getFileName(n),""==i&&(i="styleguide/html/styleguide.html"),document.getElementById("sg-viewport").contentWindow.postMessage({path:i},urlHandler.targetOrigin),document.getElementById("title").innerHTML="Pattern Lab - "+n,document.getElementById("sg-raw").setAttribute("href",urlHandler.getFileName(n)),wsnConnected&&wsn.send('{"url": "'+i+'", "patternpartial": "'+n+'" }')}};window.onpopstate=function(t){urlHandler.skipBack=!0,urlHandler.popPattern(t)},function(t){function e(t){var e=t;$(".sg-size-options a").removeClass("active"),t&&e.addClass("active")}function n(){r(c(u,420))}function i(){r(c(420,620))}function a(){r(c(620,900))}function o(){y=!1,e($("#sg-size-random")),r(c(u,d))}function l(){r(d,!1),s(d)}function r(t,e){var n;n=t>p?p:u>t?u:t,e===!1?(f.removeClass("vp-animate"),v.removeClass("vp-animate")):(f.addClass("vp-animate"),v.addClass("vp-animate")),f.width(n+h),v.width(n),s(n)}function s(t,e,n){"em"==e?(emSize=t,pxSize=Math.floor(t*m)):(pxSize=t,emSize=t/m),"updatePxInput"==n?g.val(pxSize):"updateEmInput"==n?w.val(emSize.toFixed(2)):(w.val(emSize.toFixed(2)),g.val(pxSize))}function c(t,e){var n=Math.random()*(e-t)+t;return parseInt(n)}var d=900,u=320,p=900,h=14,f=$("#sg-gen-container"),v=$("#sg-viewport"),g=$(".sg-size-px"),w=$(".sg-size-em"),m=16,y=!0,k=window.location.hash.replace(/^.*?#/,"");$(t).resize(function(){d=p,1==y&&l()}),$(".sg-acc-handle").on("click",function(t){var e=$(this),n=e.next(".sg-acc-panel");t.preventDefault(),e.toggleClass("active"),n.toggleClass("active")}),$("#sg-size-toggle").on("click",function(t){t.preventDefault(),$(this).parents("ul").toggleClass("active")}),$("#sg-size-s").on("click",function(t){t.preventDefault(),y=!1,window.location.hash="s",e($(this)),n()}),$("#sg-size-m").on("click",function(t){t.preventDefault(),y=!1,window.location.hash="m",e($(this)),i()}),$("#sg-size-l").on("click",function(t){t.preventDefault(),y=!1,window.location.hash="l",e($(this)),a()}),$("#sg-size-full").on("click",function(t){t.preventDefault(),e($(this)),y=!0,window.location.hash="",r(d)}),g.on("keydown",function(t){var n=Math.floor($(this).val());38===t.keyCode?(n++,r(n,!1),window.location.hash=n):40===t.keyCode?(n--,r(n,!1),window.location.hash=n):13===t.keyCode&&(t.preventDefault(),r(n),window.location.hash=n,$(this).blur()),e()}),g.on("keyup",function(){var t=Math.floor($(this).val());s(t,"px","updateEmInput")}),w.on("keydown",function(t){var n=parseFloat($(this).val());38===t.keyCode?(n++,r(Math.floor(n*m),!1)):40===t.keyCode?(n--,r(Math.floor(n*m),!1)):13===t.keyCode&&(t.preventDefault(),r(Math.floor(n*m))),e(),window.location.hash=parseInt(n*m)}),w.on("keyup",function(){var t=parseFloat($(this).val());s(t,"em","updatePxInput")}),$("#sg-mq a").on("click",function(t){t.preventDefault();var e=$(this).html(),n=-1!==e.indexOf("px")?"px":"em";e=e.replace(n,"");var i="px"===n?1*e:e*m;r(i,!0)}),$("#sg-rightpull").mousedown(function(t){var e=t.clientX,n=v.width();y=!1,$("#sg-cover").css("display","block"),$("#sg-cover").mousemove(function(t){viewportWidth=e>t.clientX?n-1*(e-t.clientX):n+1*(t.clientX-e),viewportWidth>u&&p>viewportWidth&&(window.location.hash=viewportWidth,r(viewportWidth,!1))})}),$("body").mouseup(function(){$("#sg-cover").unbind("mousemove"),$("#sg-cover").css("display","none")});var x=v.width();f.width(x),v.width(x-14),s(v.width()),"hay"===k?startHay():"disco"===k?startDisco():"random"===k?o():"l"===k?a():"m"===k?i():"s"===k?n():isNaN(k)||""===k?l():r(parseInt(k))}(this),function(t){var e=t("#sg-viewport");e.on("load",function(){var n=e.contents().find("body"),i=n.find("[data-editable]");t("#file-editor"),i.each(function(){var e=t(this);e.data("editable"),e.data("title"),e.on("mouseover",function(){t(this).css({"box-shadow":"0 0 10px rgba(255,0,0,.4)",cursor:"pointer"})}).on("mouseout",function(){t(this).css({"box-shadow":"",cursor:""})}).on("click",function(){t("#file-editor").toggleClass("active")})})})}(jQuery,this),function(t){t(document).ready(function(){t("#file-manager-trigger").click(function(e){e.preventDefault(),t("#file-manager").toggleClass("active"),t("body").toggleClass("menu-active")}),t("#file-manager").find("a").on("click",function(e){e.preventDefault(),t("#sg-viewport").attr("src",t(this).attr("href")),t("#file-manager").find(".active").removeClass("active"),t(this).parent().addClass("active")}),t("#file-editor").find("button").on("click",function(e){e.preventDefault(),t("#file-editor").removeClass("active")})})}(jQuery);