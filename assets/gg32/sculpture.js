/* A real spatial curve projected onto Canvas 2D. No GPU requirement or remote assets. */
export function mountSculpture(container){
  const mount=container.querySelector('.canvas-mount');
  const canvas=document.createElement('canvas');
  const ctx=canvas.getContext('2d',{alpha:true});
  if(!ctx)return;
  canvas.setAttribute('aria-hidden','true');mount.appendChild(canvas);
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let width=0,height=0,ratio=1,raf=0,visible=true,disposed=false;
  let targetX=0,targetY=0,currentX=0,currentY=0;
  const started=performance.now();
  let activeUntil=reduced.matches?0:started+4200;
  const segments=96,ringCount=33;
  const colors=[[86,59,23],[157,113,42],[215,174,87],[244,218,153],[255,244,209]];
  function shade(value){const v=Math.max(0,Math.min(.999,value))*4,i=Math.floor(v),mix=v-i;const a=colors[i],b=colors[i+1];return `rgb(${a.map((c,n)=>Math.round(c+(b[n]-c)*mix)).join(',')})`;}
  function rotate(x,y,z,rx,ry,rz){
    const y1=y*Math.cos(rx)-z*Math.sin(rx),z1=y*Math.sin(rx)+z*Math.cos(rx);
    const x2=x*Math.cos(ry)+z1*Math.sin(ry),z2=-x*Math.sin(ry)+z1*Math.cos(ry);
    return {x:x2*Math.cos(rz)-y1*Math.sin(rz),y:x2*Math.sin(rz)+y1*Math.cos(rz),z:z2};
  }
  function project(v,scale){const p=9/(9-v.z);return {x:width*.5+v.x*scale*p,y:height*.45-v.y*scale*p,z:v.z,p};}
  function requestFrame(){if(!raf&&!disposed&&visible&&!document.hidden)raf=requestAnimationFrame(draw);}
  function draw(now){
    raf=0;if(!width||disposed||!visible||document.hidden)return;
    ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,width,height);
    currentX+=(targetX-currentX)*.085;currentY+=(targetY-currentY)*.085;
    const progress=reduced.matches?1:Math.min(1,(now-started)/4200);
    const ease=1-Math.pow(1-progress,3);
    const phase=ease*1.7;
    const rx=.25+currentY*.16,ry=-.55+currentX*.27,rz=-.14;
    const scale=Math.min(width/7.15,height/5.6);
    const shadow=ctx.createRadialGradient(width*.53,height*.78,0,width*.53,height*.78,width*.4);
    shadow.addColorStop(0,'rgba(21,55,38,.18)');shadow.addColorStop(1,'rgba(21,55,38,0)');
    ctx.save();ctx.translate(0,height*.78);ctx.scale(1,.14);ctx.translate(0,-height*.78);ctx.fillStyle=shadow;ctx.fillRect(0,-height*3,width,height*9);ctx.restore();
    const parts=[];
    for(let i=0;i<ringCount;i++){
      const t=i/(ringCount-1),x=(t-.5)*5.6;
      const env=Math.pow(Math.sin(t*Math.PI),.78);
      const r=.3+env*(1.01+.22*Math.sin(t*8-phase));
      const cy=.2*Math.sin(t*6.28+phase*.18),cz=.24*Math.sin(t*6.28);
      const points=[];
      for(let j=0;j<=segments;j++){
        const angle=j/segments*Math.PI*2;
        const v=rotate(x,cy+Math.cos(angle)*r,cz+Math.sin(angle)*r,rx,ry,rz);
        points.push(project(v,scale));
      }
      for(let j=0;j<segments;j++){
        const a=points[j],b=points[j+1],angle=(j+.5)/segments*Math.PI*2;
        const lighting=.48+.29*Math.cos(angle-.7)+.17*Math.cos(angle*2+.2);
        const reflect=Math.pow(Math.max(0,Math.sin(angle+.5)),18);
        parts.push({a,b,z:(a.z+b.z)*.5,color:shade(lighting+reflect*.2),w:Math.max(2.1,scale*.049*(a.p+b.p)*.5)});
      }
    }
    parts.sort((a,b)=>a.z-b.z);
    ctx.lineCap='round';ctx.lineJoin='round';
    for(const part of parts){ctx.beginPath();ctx.moveTo(part.a.x,part.a.y);ctx.lineTo(part.b.x,part.b.y);ctx.lineWidth=part.w;ctx.strokeStyle=part.color;ctx.stroke();}
    container.classList.add('is-rendered');
    if((!reduced.matches&&now<activeUntil)||Math.abs(targetX-currentX)>.001||Math.abs(targetY-currentY)>.001)requestFrame();
  }
  function resize(){const r=mount.getBoundingClientRect();width=r.width;height=r.height;ratio=Math.min(window.devicePixelRatio||1,1.5);canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);requestFrame();}
  const move=e=>{if(reduced.matches||e.pointerType==='touch')return;const r=container.getBoundingClientRect();targetX=((e.clientX-r.left)/r.width-.5)*2;targetY=((e.clientY-r.top)/r.height-.5)*2;requestFrame();};
  const leave=()=>{targetX=0;targetY=0;requestFrame();};
  container.addEventListener('pointermove',move,{passive:true});container.addEventListener('pointerleave',leave);
  const ro=new ResizeObserver(resize);ro.observe(mount);
  const io=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)requestFrame();else{cancelAnimationFrame(raf);raf=0;}},{threshold:.01});io.observe(container);
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;}else requestFrame();};document.addEventListener('visibilitychange',visibility);
  const preference=()=>{targetX=0;targetY=0;currentX=0;currentY=0;activeUntil=0;requestFrame();};reduced.addEventListener('change',preference);
  window.addEventListener('pagehide',e=>{if(e.persisted)return;disposed=true;cancelAnimationFrame(raf);ro.disconnect();io.disconnect();container.removeEventListener('pointermove',move);container.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',visibility);reduced.removeEventListener('change',preference);},{once:true});
  resize();
}
