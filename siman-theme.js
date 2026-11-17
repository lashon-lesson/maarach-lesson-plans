/* מַעֲרָךְ · תוספות לעיצוב "סימן": סרגל ניווט תחתון בטלפון וכפתור נגישות (גודל טקסט, ניגודיות, ביטול תנועה). */
(function(){
  var K="maarach_a11y";
  var st={fs:16,hc:false,calm:false};
  try{ var s=JSON.parse(localStorage.getItem(K)||"{}"); for(var k in s) st[k]=s[k]; }catch(e){}
  function apply(){
    document.documentElement.style.setProperty("--fs",st.fs+"px");
    document.documentElement.classList.toggle("hc",!!st.hc);
    document.documentElement.classList.toggle("calm",!!st.calm);
    try{ localStorage.setItem(K,JSON.stringify(st)); }catch(e){}
    var p=document.getElementById("a11yP"); if(p){ p.querySelector("[data-a=hc]").classList.toggle("on",!!st.hc); p.querySelector("[data-a=calm]").classList.toggle("on",!!st.calm); p.querySelector(".fsv").textContent=Math.round(st.fs/16*100)+"%"; }
  }
  apply();
  function build(){
    /* bottom tab bar for phones: same links as the top nav */
    var nav=document.querySelector(".top .nav");
    if(nav && !document.querySelector(".mnav")){
      var icons={home:"🏠",year:"📅",library:"⭐",tools:"🧰"};
      var m=document.createElement("nav"); m.className="mnav"; m.setAttribute("aria-label","ניווט ראשי");
      nav.querySelectorAll("a").forEach(function(a){
        var b=document.createElement("a"); b.href=a.getAttribute("href"); b.dataset.v=a.dataset.v;
        b.innerHTML='<i aria-hidden="true">'+(icons[a.dataset.v]||"•")+'</i><span></span>'; b.querySelector("span").textContent=a.textContent.trim(); m.appendChild(b);
      });
      document.body.appendChild(m);
      var sync=function(){ var on=nav.querySelector("a.on"); m.querySelectorAll("a").forEach(function(b){ b.classList.toggle("on",!!on&&b.dataset.v===on.dataset.v); if(b.classList.contains("on")) b.setAttribute("aria-current","page"); else b.removeAttribute("aria-current"); }); };
      new MutationObserver(sync).observe(nav,{subtree:true,attributes:true,attributeFilter:["class"]}); sync();
    }
    /* accessibility button */
    var b=document.createElement("button"); b.className="a11y-b"; b.type="button"; b.setAttribute("aria-label","אפשרויות נגישות"); b.setAttribute("aria-expanded","false"); b.innerHTML='<span aria-hidden="true">♿</span>';
    var p=document.createElement("div"); p.className="a11y-p"; p.id="a11yP"; p.hidden=true; p.setAttribute("role","dialog"); p.setAttribute("aria-label","נגישות");
    p.innerHTML='<h4>נגישות</h4>'+
      '<div>גודל הטקסט: <b class="fsv"></b></div>'+
      '<div class="row"><button class="btn" type="button" data-a="fs-">א־ קטן</button><button class="btn" type="button" data-a="fs+">א+ גדול</button></div>'+
      '<div class="row"><button class="btn" type="button" data-a="hc">ניגודיות גבוהה</button><button class="btn" type="button" data-a="calm">בלי תנועה</button></div>'+
      '<button class="btn" type="button" data-a="reset">איפוס</button>';
    document.body.appendChild(b); document.body.appendChild(p);
    b.addEventListener("click",function(){ p.hidden=!p.hidden; b.setAttribute("aria-expanded",String(!p.hidden)); if(!p.hidden) p.querySelector("button").focus(); });
    p.addEventListener("click",function(e){ var a=e.target.closest("[data-a]"); if(!a) return; var v=a.dataset.a;
      if(v==="fs+") st.fs=Math.min(24,st.fs+2); else if(v==="fs-") st.fs=Math.max(14,st.fs-2);
      else if(v==="hc") st.hc=!st.hc; else if(v==="calm") st.calm=!st.calm; else if(v==="reset") st={fs:16,hc:false,calm:false};
      apply(); });
    document.addEventListener("keydown",function(e){ if(e.key==="Escape"&&!p.hidden){ p.hidden=true; b.setAttribute("aria-expanded","false"); b.focus(); } });
    apply();
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",build); else build();
})();
/* phone: tap the plan description to expand it */
document.addEventListener("click",function(e){ var y=e.target.closest&&e.target.closest(".yover"); if(y) y.classList.toggle("open"); });
