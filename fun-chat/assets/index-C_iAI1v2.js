(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function p(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(n){if(n.ep)return;n.ep=!0;const a=p(n);fetch(n.href,a)}})();const T=document.createElement("div");T.className="main-page-container";const b=document.createElement("header");b.className="header";const w=document.createElement("span"),$=document.createElement("span"),L=document.createElement("button");L.className="hover";$.innerText="Fun Chat";L.innerText="Log Out";b.append(w,$,L);const O=document.createElement("div");O.className="chat-container";const h=document.createElement("div"),A=document.createElement("div");A.className="messager";const G=document.createElement("div"),y=document.createElement("div"),m=document.createElement("div");y.append(m);m.className="dialogue";m.innerText="Please, select a user";y.className="dialogue-wrapper";const R=document.createElement("form"),E=document.createElement("input"),v=document.createElement("button");v.innerText="Send";v.disabled=!0;v.className="hover";E.disabled=!0;R.append(E,v);A.append(G,y,R);O.append(h,A);const _=document.createElement("footer");_.className="footer";const x=document.createElement("span");x.innerText="RSSchool";const C=document.createElement("img");C.src="./logo-rsschool3.png";C.style.height="1em";x.prepend(C);const M=document.createElement("span");M.innerText="Nikolai Kaliganov";const U=document.createElement("a");U.href="https://github.com/kaliganoff";U.innerText="GitHub";M.append(U);const Z=document.createElement("span");Z.innerHTML="2024";_.append(x,M,Z);const i=new WebSocket("ws://localhost:4000/");function P(t){i.send(JSON.stringify({id:"5",type:"MSG_DELETE",payload:{message:{id:t}}}))}function j(t){i.send(JSON.stringify({id:"1",type:"USER_LOGOUT",payload:{user:{login:t.login,password:t.password}}}))}function I(t,e){G.innerText=`${t} - ${e===!0?"Online":"Offline"}`,i.send(JSON.stringify({id:"4",type:"MSG_FROM_USER",payload:{user:{login:t}}}))}function F(t,e){i.send(JSON.stringify({id:"5",type:"MSG_SEND",payload:{message:{to:e.login,text:t}}}))}let f,S;function D(){i.send(JSON.stringify({id:"2",type:"USER_ACTIVE",payload:null})),i.send(JSON.stringify({id:"2",type:"USER_INACTIVE",payload:null}))}function J(t){f=t,w.innerText=f.login,T.append(b,O,_),document.body.append(T),D()}L.addEventListener("click",()=>{j(f)});i.addEventListener("message",t=>{const e=JSON.parse(t.data);if(e.type==="USER_ACTIVE"||e.type==="USER_INACTIVE"){const{users:p}=e.payload;p.forEach(s=>{if(s.login!==f.login){const n=document.createElement("div");n.className="hover",n.innerText=`${s.login} - ${e.type==="USER_ACTIVE"?"Online":"Offline"}`,n.dataset.id=s.login,h.append(n),n.addEventListener("click",()=>{S=s,v.disabled=!1,E.disabled=!1,I(s.login,s.isLogined)})}})}else e.type==="USER_EXTERNAL_LOGIN"||e.type==="USER_EXTERNAL_LOGOUT"?(h.innerHTML="",D()):(e.type==="MSG_SEND"||e.type==="MSG_DELIVER"||e.type==="MSG_DELETE")&&(e.type==="MSG_SEND"&&setTimeout(()=>{y.scrollTop=m.scrollHeight},50),I(S.login,S.isLogined))});R.addEventListener("submit",t=>{t.preventDefault(),F(E.value,S),E.value="",setTimeout(()=>{y.scrollTop=m.scrollHeight},50)});i.addEventListener("message",t=>{const e=JSON.parse(t.data);if(e.type==="MSG_FROM_USER"){m.innerHTML="";const{messages:p}=e.payload;p.forEach(s=>{const n=document.createElement("div");let a="";if(s.from===f.login&&(s.status.isReaded?a="Read":s.status.isDelivered?a="Delivered":a="Not delivered"),n.innerText=`${s.from}: ${s.text}
 ${String(new Date(s.datetime).getHours()).padStart(2,"0")}:${String(new Date(s.datetime).getMinutes()).padStart(2,"0")} ${a}`,s.from===f.login){const l=document.createElement("button");l.className="hover",l.innerText="Delete",l.addEventListener("click",()=>{P(s.id)}),n.append(l)}m.append(n)}),p.length===0&&(m.innerText="This is the beginning of the dialogue")}});const g=document.createElement("form");g.className="log-in-form";const o=document.createElement("input"),r=document.createElement("input");r.type="password";const u=document.createElement("button");u.innerText="Log In";u.className="hover";const d=document.createElement("p"),c=document.createElement("p");d.className="log-in-form-error";c.className="log-in-form-error";function V(){const t=/^[A-Z][A-Za-z-][A-Za-z-]+$/.test(o.value),e=/^[A-Z][A-Za-z-]{2}[A-Za-z-]+$/.test(r.value);/^[A-Z]/.test(o.value)?/^[A-Za-z-]+$/.test(o.value)?/^[A-Za-z-]{2}[A-Za-z-]+$/.test(o.value)?t&&(d.remove(),o.style.borderColor=""):(o.style.borderColor="red",d.innerText="The login must contain three or more characters",o.insertAdjacentElement("afterend",d)):(o.style.borderColor="red",d.innerText="The login must contain only English letters and '-'",o.insertAdjacentElement("afterend",d)):(o.style.borderColor="red",d.innerText="The first letter must be uppercase",o.insertAdjacentElement("afterend",d)),/^[A-Z]/.test(r.value)?/^[A-Za-z-]+$/.test(r.value)?/^[A-Za-z-]{3}[A-Za-z-]+$/.test(r.value)?e&&(c.remove(),r.style.borderColor=""):(r.style.borderColor="red",c.innerText="The password must contain four or more characters",r.insertAdjacentElement("afterend",c)):(r.style.borderColor="red",c.innerText="The password must contain only English letters and '-'",r.insertAdjacentElement("afterend",c)):(r.style.borderColor="red",c.innerText="The first letter must be uppercase",r.insertAdjacentElement("afterend",c)),t&&e?(u.disabled=!1,u.classList.add("log-in-button_active")):(!t||!e)&&(u.disabled=!0,u.classList.remove("log-in-button_active"))}let H="",N;function K(){i.send(JSON.stringify({id:"1",type:"USER_LOGIN",payload:{user:{login:o.value,password:r.value}}}))}function z(){g.append(o,r,u),document.body.append(g)}g.addEventListener("input",()=>{V()});i.addEventListener("message",t=>{const e=JSON.parse(t.data);e.type==="ERROR"?alert(e.payload.error):e.type==="USER_LOGOUT"&&e.payload.user.isLogined===!1?(delete sessionStorage.user,document.body.innerHTML="",T.innerHTML="",h.innerHTML="",z()):e.type==="USER_LOGIN"&&e.payload.user.isLogined===!0&&(N={login:e.payload.user.login,password:H},sessionStorage.userKaliganoff=JSON.stringify(N),g.innerHTML="",J(N))});g.addEventListener("submit",t=>{t.preventDefault(),o.value!==""&&r.value!==""&&(K(),H=r.value,o.value="",r.value="",u.disabled=!0)});i.addEventListener("open",()=>{sessionStorage.userKaliganoff?J(JSON.parse(sessionStorage.userKaliganoff)):z()});
