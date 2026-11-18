(function(){
  var WA_NUMBER="5517997685915";
  var WA_TEXT="Olá, gostaria de receber orientação.";
  document.querySelectorAll("[data-wa]").forEach(function(a){
    a.href="https://wa.me/"+WA_NUMBER+"?text="+encodeURIComponent(WA_TEXT);
  });

  var btn=document.getElementById("menuBtn"),mob=document.getElementById("mobile");
  function setMenu(o){mob.classList.toggle("open",o);btn.setAttribute("aria-expanded",o)}
  btn.addEventListener("click",function(){setMenu(!mob.classList.contains("open"))});
  mob.addEventListener("click",function(e){if(e.target.tagName==="A")setMenu(false)});

  var els=document.querySelectorAll(".rv");
  if("IntersectionObserver" in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
    els.forEach(function(el){io.observe(el)});
  }else els.forEach(function(el){el.classList.add("in")});

  var sticky=document.getElementById("sticky"),contact=document.getElementById("contato");
  if("IntersectionObserver" in window){
    new IntersectionObserver(function(es){sticky.classList.toggle("hide",es[0].isIntersecting)},{threshold:.15}).observe(contact);
  }

  var form=document.getElementById("form"),zap=document.getElementById("zap");
  zap.addEventListener("input",function(){
    var d=zap.value.replace(/\D/g,"").slice(0,11),o=d;
    if(d.length>2)o="("+d.slice(0,2)+") "+d.slice(2,d.length>10?7:6)+(d.length>(d.length>10?7:6)?"-"+d.slice(d.length>10?7:6):"");
    zap.value=o;
  });
  function mark(el,ok){var f=el.closest(".field")||el;f.classList.toggle("bad",!ok);f.classList.toggle("good",ok&&el.tagName==="INPUT");if(el.setAttribute)el.setAttribute("aria-invalid",!ok)}
  var rules={
    nome:function(v){return v.trim().length>=2},
    zap:function(v){var n=v.replace(/\D/g,"").length;return n===10||n===11},
    cidade:function(v){return v.trim().length>=2}
  };
  Object.keys(rules).forEach(function(id){
    var el=document.getElementById(id);
    el.addEventListener("blur",function(){mark(el,rules[id](el.value))});
    el.addEventListener("input",function(){if(el.closest(".field").classList.contains("bad"))mark(el,rules[id](el.value))});
  });
  var quem=document.getElementById("quem");
  quem.addEventListener("change",function(){quem.classList.remove("bad")});
  form.addEventListener("submit",function(e){
    e.preventDefault();
    var first=null,ok=true;
    Object.keys(rules).forEach(function(id){
      var el=document.getElementById(id),v=rules[id](el.value);
      mark(el,v);if(!v){ok=false;first=first||el}
    });
    var sel=form.querySelector('input[name="quem"]:checked');
    quem.classList.toggle("bad",!sel);
    if(!sel){ok=false;first=first||form.querySelector('input[name="quem"]')}
    if(!ok){first.focus();return}
    var nome=document.getElementById("nome").value.trim().split(" ")[0];
    document.getElementById("doneTxt").textContent="Obrigado por dar esse passo, "+nome+". Nossa equipe entrará em contato pelo WhatsApp informado para entender melhor como pode orientar você.";
    form.style.display="none";
    var d=document.getElementById("done");d.classList.add("show");d.focus();
    d.scrollIntoView({behavior:"smooth",block:"center"});
  });
})();
