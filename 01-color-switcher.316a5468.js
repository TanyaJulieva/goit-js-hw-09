const t={startBtn:document.querySelector("[data-start]"),stopBtn:document.querySelector("[data-stop]"),body:document.querySelector("body")};t.startBtn.addEventListener("click",(function(){t.body.style.backgroundColor=n(),t.startBtn.disabled=!0,t.stopBtn.disabled=!1,e=setInterval((()=>{t.body.style.backgroundColor=n()}),1e3)})),t.stopBtn.addEventListener("click",(function(){clearInterval(e),t.stopBtn.disabled=!0,t.startBtn.disabled=!1})),t.stopBtn.disabled=!0;let e=null;function n(){return`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`}
//# sourceMappingURL=01-color-switcher.316a5468.js.map