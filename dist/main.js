!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){window.addEventListener("DOMContentLoaded",function(){"use strict";let e=n(1),t=n(2),o=n(3),r=n(4),l=n(5),i=n(6),c=n(7);o(),t(),e(),r(),i(),l(),c()})},function(e,t){e.exports=function(){function e(e){let t=0,n=setInterval(function(){if(!((t+=300)<e))return r.innerHTML=e,void clearInterval(n);r.innerHTML=t},.1)}let t=document.querySelectorAll(".counter-block-input")[0],n=document.querySelectorAll(".counter-block-input")[1],o=document.getElementById("select"),r=document.getElementById("total"),l=0,i=0,c=0;r.innerHTML=c,t.addEventListener("change",function(t){/\D/.test(this.value)&&(this.value=""),l=+this.value,c=0==l||0==i?0:4e3*(i+l),""==n.value?r.innerHTML=0:e(c*o.options[o.selectedIndex].value)}),n.addEventListener("change",function(){/\D/.test(this.value)&&(this.value=""),i=+this.value,c=0==l||0==i?0:4e3*(i+l),""==t.value?r.innerHTML=0:e(c*o.options[o.selectedIndex].value)}),o.addEventListener("change",function(){""==n.value||""==l.value?r.innerHTML=0:e(c*o.options[o.selectedIndex].value)})}},function(e,t){e.exports=function(){let e=1,t=document.querySelectorAll(".slider-item"),n=document.querySelector(".prev"),o=document.querySelector(".next"),r=document.querySelector(".slider-dots"),l=document.querySelectorAll(".dot");function i(n){n>t.length&&(e=1),n<1&&(e=t.length),t.forEach(e=>e.style.display="none"),l.forEach(e=>e.classList.remove("dot-active")),t[e-1].style.display="block",l[e-1].classList.add("dot-active")}function c(t){i(e+=t)}function s(t){i(e=t)}i(e),n.addEventListener("click",()=>c(-1)),o.addEventListener("click",()=>c(1)),r.addEventListener("click",function(e){for(let t=0;t<l.length+1;++t)e.target.classList.contains("dot")&&e.target==l[t-1]&&s(t)})}},function(e,t){e.exports=function(){!function(e,t){let n=document.getElementById(e),o=n.querySelector(".hours"),r=n.querySelector(".minutes"),l=n.querySelector(".seconds"),i=setInterval(function(){let e=function(e){let t=Date.parse(e)-Date.parse(new Date),n=Math.floor(t/1e3%60),o=Math.floor(t/1e3/60%60),r=Math.floor(t/1e3/60/60);return{total:t,hours:t<0?0:r,minutes:t<0?0:o,seconds:t<0?0:n}}(t);e.total<=0&&clearInterval(i),o.textContent=-1<e.hours&&e.hours<10?"0"+e.hours:e.hours,r.textContent=-1<e.minutes&&e.minutes<10?"0"+e.minutes:e.minutes,l.textContent=-1<e.seconds&&e.seconds<10?"0"+e.seconds:e.seconds},1e3)}("timer","2018-10-31 0:00:00")}},function(e,t){e.exports=function(){let e=document.querySelector(".info-header"),t=document.querySelectorAll(".info-header-tab"),n=document.querySelectorAll(".info-tabcontent");function o(e){for(let t=e;t<n.length;++t)n[t].classList.remove("show"),n[t].classList.add("hide")}function r(e){n[e].classList.remove("hide"),n[e].classList.add("show")}o(1),e.addEventListener("click",e=>{let l=e.target;if(l&&l.classList.contains("info-header-tab")){console.log(n);for(let e=0;e<t.length;++e)if(l==t[e]){o(0),r(e);break}}});let l=document.querySelector(".overlay");document.querySelectorAll(".description-btn").forEach(function(e){e.addEventListener("click",e=>{l.style.display="block",l.classList.add("blur-anim"),document.body.style.overflow="hidden"})})}},function(e,t){e.exports=function(){let e=document.querySelector(".more"),t=document.querySelector(".overlay"),n=document.querySelector(".popup"),o=document.querySelector(".popup-close"),r={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return r.Android()||r.BlackBerry()||r.iOS()||r.Opera()||r.Windows()}},l=window.navigator.userAgent.indexOf("Edge")>-1?"css":r.any()?"no animation":"js";"css"==l?e.addEventListener("click",()=>{t.style.display="block",t.classList.add("blur-anim"),document.body.style.overflow="hidden"}):"js"==l?e.addEventListener("click",()=>{t.style.left=0,t.style.top=0,document.body.style.overflow="hidden",t.style.display="block";let e=0;n.style.left="0px";let o=Math.trunc(document.documentElement.clientWidth/2),r=setInterval(()=>{e+=20,n.style.left=e+"px",n.offsetLeft>o&&clearInterval(r)},20)}):e.addEventListener("click",()=>{t.classList.remove("fade"),t.style.display="block",document.body.style.overflow="hidden"}),o.addEventListener("click",()=>{t.style.display="none",e.classList.remove("more-splash"),document.body.style.overflow=""})}},function(e,t){e.exports=function(){let e="Загрузка...",t="Спасибо! Скоро мы с вами свяжемся!!!",n="Что-то пошло не так",o=document.querySelector(".main-form"),r=o.getElementsByTagName("input"),l=document.createElement("div");l.classList.add("status"),o.addEventListener("submit",function(i){i.preventDefault(),o.appendChild(l),function(e){return new Promise(function(t,n){let o=new XMLHttpRequest;o.open("POST","server.php"),o.setRequestHeader("Content-type","application/json; charset=utf-8");let r={};e.forEach(function(e,t){r[t]=e});let l=JSON.stringify(r);o.send(l),o.addEventListener("readystatechange",function(){o.readyState<4?t():4===o.readyState&&200==o.status?t():n()})})}(new FormData(o)).then(()=>l.innerHTML=e).then(()=>l.innerHTML=t).catch(()=>l.innerHTML=n).then(function(){for(let e=0;e<r.length;++e)r[e].value=""})});let i=document.forms.myform,c=i.getElementsByTagName("input");i.getElementsByTagName("input")[1].addEventListener("keypress",function(e){e.preventDefault(),(/\d/.test(e.key)||/\+/.test(e.key))&&(this.value+=e.key)});let s={loading:"logo/ajax-loader.gif",success:"logo/ok.png",failure:"logo/neok.png"},a=document.getElementById("loadGif");i.addEventListener("submit",function(e){e.preventDefault(),function(e){return new Promise(function(t,n){let o=new XMLHttpRequest;o.open("POST","server.php"),o.setRequestHeader("Content-type","application/json; charset=utf-8");let r={};e.forEach(function(e,t){r[t]=e});let l=JSON.stringify(r);o.send(l),a.style.display="block",o.addEventListener("readystatechange",function(){o.readyState<4?t():4===o.readyState&&200==o.status?t():(n(),a.setAttribute("src",s.failure))})})}(new FormData(i)).then(()=>{a.style.display="block",a.setAttribute("src",s.loading)}).then(()=>{a.style.display="block",a.setAttribute("src",s.success)}).catch(()=>{a.style.display="block",a.setAttribute("src",s.failure)}).then(function(){for(let e=0;e<c.length;++e)c[e].value=""})})}},function(e,t){e.exports=function(){let e=document.querySelectorAll('a[href*="#"]');e.forEach(t=>{t.addEventListener("click",n=>{n.preventDefault();let o=document.querySelector(t.hash).offsetTop;e[e.length-1]==n.target&&(o-=90);let r=setInterval(()=>{if(!(document.documentElement.scrollTop<o))return window.scrollTo(0,o),void clearInterval(r);window.scrollBy(0,10)},10)})})}}]);