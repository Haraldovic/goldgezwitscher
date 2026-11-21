(() => {
  'use strict';
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  function closeMenu(){nav?.classList.remove('is-open');menu?.setAttribute('aria-expanded','false');}
  menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
  nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  window.matchMedia('(min-width:861px)').addEventListener('change',closeMenu);

  document.querySelectorAll('[data-tabs]').forEach(stage=>{
    const tabs=Array.from(stage.querySelectorAll('[role=tab]'));
    function activate(tab,focus=false){
      tabs.forEach(t=>{const active=t===tab;t.setAttribute('aria-selected',String(active));t.tabIndex=active?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!active;});
      if(focus)tab.focus();
    }
    tabs.forEach((tab,i)=>{
      tab.addEventListener('click',()=>activate(tab));
      tab.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!==undefined){e.preventDefault();activate(tabs[n],true);}});
    });
  });

  const form=document.querySelector('[data-inquiry]');
  if(form){
    const result=form.querySelector('.form-result');
    const output=form.querySelector('#prepared-message');
    const emailLink=form.querySelector('[data-email-link]');
    const copyStatus=form.querySelector('.copy-status');
    const kind=form.dataset.inquiry;
    const target=form.dataset.email;
    document.querySelectorAll('[data-package]').forEach(link=>link.addEventListener('click',()=>{
      const field=form.querySelector('#interest');field.value=link.dataset.package;
      result.hidden=true;
    }));
    form.addEventListener('input',()=>{result.hidden=true;copyStatus.textContent='';});
    form.addEventListener('change',()=>{result.hidden=true;copyStatus.textContent='';});
    form.addEventListener('submit',e=>{
      e.preventDefault();
      if(!form.reportValidity())return;
      const values=new FormData(form);
      const topic=String(values.get(kind==='guest'?'Bereich':'Partnerschaft')||'');
      const heading=kind==='guest'?'Gastbewerbung für Goldgezwitscher':'Partnerschaft mit Goldgezwitscher';
      const lines=['Hallo Dietmar,','',kind==='guest'?'ich möchte mich als Gast für Goldgezwitscher vorstellen.':'ich interessiere mich für eine Partnerschaft mit Goldgezwitscher.',''];
      for(const [key,value] of values){if(key==='privacy'||!String(value).trim())continue;lines.push(key+': '+String(value).trim());if(key==='Nachricht')lines.push('');}
      lines.push('','Viele Grüße',String(values.get('Name')).trim());
      const body=lines.join('\n');output.value=body;
      emailLink.href='mailto:'+target+'?subject='+encodeURIComponent(heading+' – '+topic)+'&body='+encodeURIComponent(body);
      result.hidden=false;result.focus();
    });
    form.querySelector('[data-copy]').addEventListener('click',async()=>{
      try{await navigator.clipboard.writeText(output.value);copyStatus.textContent='Nachricht kopiert. Du kannst sie jetzt in eine E-Mail einfügen.';}
      catch{output.focus();output.select();copyStatus.textContent='Bitte kopiere den markierten Text und füge ihn in deine E-Mail ein.';}
    });
  }

  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  if('IntersectionObserver' in window&&!reduced.matches){
    const elements=document.querySelectorAll('[data-reveal]');
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.08});
    elements.forEach(el=>{el.classList.add('will-reveal');observer.observe(el);});
    // Content cannot remain hidden if an observer or scrolling environment stalls.
    setTimeout(()=>elements.forEach(el=>el.classList.add('is-visible')),7000);
  }

  const sculpture=document.querySelector('[data-sculpture]');
  if(sculpture){
    let started=false;
    const start=async()=>{if(started)return;started=true;try{const {mountSculpture}=await import('./sculpture.js?v=32');await mountSculpture(sculpture);}catch{sculpture.classList.remove('is-rendered');}};
    if('IntersectionObserver' in window){const io=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){io.disconnect();start();}},{rootMargin:'100px'});io.observe(sculpture);}else start();
  }
})();
