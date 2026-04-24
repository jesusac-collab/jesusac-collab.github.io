  let players=[],scores=[],turn=0;
let usados=new Set(),cur;

window.onload = () => {
  document.getElementById("btnAgregar").onclick = add;
  document.getElementById("btnComenzar").onclick = start;
  document.getElementById("btnGirar").onclick = spin;
  document.getElementById("btnFinalizar").onclick = end;
  document.getElementById("btnCumplio").onclick = () => resp(true);
  document.getElementById("btnNoCumplio").onclick = () => resp(false);
};

function add(){
  let n=document.getElementById("name").value.trim();
  if(!n)return;
  players.push(n); scores.push(0);
  document.getElementById("list").innerHTML=players.map(p=>`<li>${p}</li>`).join("");
  document.getElementById("name").value="";
}

function start(){
  if(players.length<2){ alert("Agrega al menos 2 jugadores"); return; }
  show("game"); drawWheel(); update();
}

function show(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function update(){ document.getElementById("turno").innerText="Turno de "+players[turn]; }

function drawWheel(){
  let svg=document.getElementById("wheel"); svg.innerHTML="";
  let total=40, angle=360/total, radius=150;
  for(let i=0;i<total;i++){
    let start=i*angle, end=(i+1)*angle;
    let x1=150+radius*Math.sin(start*Math.PI/180);
    let y1=150-radius*Math.cos(start*Math.PI/180);
    let x2=150+radius*Math.sin(end*Math.PI/180);
    let y2=150-radius*Math.cos(end*Math.PI/180);
    let path=document.createElementNS("http://www.w3.org/2000/svg","path");
    let d=`M150 150 L${x1} ${y1} A${radius} ${radius} 0 0 1 ${x2} ${y2} Z`;
    path.setAttribute("d",d);
    path.setAttribute("fill",i%2?"#ff4da6":"#ff0066");
    path.setAttribute("stroke","white");
    path.setAttribute("stroke-width","1");
    svg.appendChild(path);
    let text=document.createElementNS("http://www.w3.org/2000/svg","text");
    let tx=150+(radius-30)*Math.sin((start+angle/2)*Math.PI/180);
    let ty=150-(radius-30)*Math.cos((start+angle/2)*Math.PI/180);
    text.setAttribute("x",tx);
    text.setAttribute("y",ty);
    text.setAttribute("fill","white");
    text.setAttribute("font-size","12");
    text.setAttribute("text-anchor","middle");
    text.setAttribute("alignment-baseline","middle");
    text.textContent=i+1;
    svg.appendChild(text);
  }

  // Flecha indicadora fija
  if(!document.querySelector(".pointer")){
    let pointer=document.createElement("div");
    pointer.className="pointer";
    pointer.innerText="⬇️";
    pointer.style.position="absolute";
    pointer.style.top="90px";
    pointer.style.left="50%";
    pointer.style.transform="translateX(-50%)";
    pointer.style.fontSize="28px";
    pointer.style.color="gold";
    document.getElementById("game").appendChild(pointer);
  }
}

function spin(){
  if(players.length<2) return;

  // reproducir sonido de spin y obtener duración
  let s=document.getElementById("spinSound");
  s.currentTime=0;
  s.play().catch(()=>{});
  let duracion = s.duration || 4; // si no se detecta duración, usa 4s

  // calcular giros aleatorios
  let vueltas = Math.floor(Math.random()*10+5); // entre 5 y 15 vueltas
  let grados = vueltas*360 + Math.floor(Math.random()*360);

  // animar ruleta con duración del audio
  let wheel=document.getElementById("wheel");
  wheel.style.transition=`transform ${duracion}s cubic-bezier(.17,.67,.12,.99)`;
  wheel.style.transform=`rotate(${grados}deg)`;

  // mostrar reto al terminar el audio
  setTimeout(elegir, duracion*1000);
}

function elegir(){
  let i=Math.floor(Math.random()*retos.length);
  if(usados.has(i)){ alert("Este reto ya salió"); return; }
  cur=i;
  document.getElementById("rt").innerText="Reto "+(i+1);
  document.getElementById("rd").innerText=retos[i].texto;
  document.getElementById("rp").innerText=retos[i].puntos+" puntos";
  document.getElementById("modal").classList.remove("hidden");
}

function resp(ok){
  document.getElementById("modal").classList.add("hidden");
  if(ok){
    usados.add(cur);
    scores[turn]+=retos[cur].puntos;
    hearts();
  }
  turn=(turn+1)%players.length;
  update();
}

function end(){
  show("final");

  // reproducir sonido de victoria
  let w=document.getElementById("winSound");
  w.currentTime=0;
  w.play().catch(()=>{});

  let r=players.map((p,i)=>({p,s:scores[i]})).sort((a,b)=>b.s-a.s);

  document.getElementById("ganador").innerHTML =
    `<span style="color:#FFD700; font-size:32px; font-weight:bold;">
      🏆 El ganador es: ${r[0].p}
    </span>`;

  document.getElementById("rank").innerHTML="<tr><th>#</th><th>Jugador</th><th>Puntos</th></tr>"+
    r.map((x,i)=>`<tr><td>${i+1}</td><td>${x.p}</td><td>${x.s}</td></tr>`).join("");

  let imgFelicitaciones = document.createElement("img");
  imgFelicitaciones.src = "felicitaciones.png";
  imgFelicitaciones.style.marginTop = "20px";
  imgFelicitaciones.style.width = "300px";
  imgFelicitaciones.style.borderRadius = "15px";
  imgFelicitaciones.style.boxShadow = "0 0 25px #ff4da6";
  document.getElementById("final").appendChild(imgFelicitaciones);

  hearts();
  lanzarConfeti();
}

function hearts(){
  for(let i=0;i<10;i++){
    let h=document.createElement("div");
    h.className="heart";
    h.innerText="💖";
    h.style.left=Math.random()*100+"%";
    document.body.appendChild(h);
    setTimeout(()=>h.remove(),3000);
  }
}

function lanzarConfeti(){
  for(let i=0;i<80;i++){
    let c=document.createElement("div");
    c.innerText="🎉";
    c.style.position="fixed";
    c.style.left=Math.random()*100+"%";
    c.style.top="-20px";
    c.style.fontSize="24px";
    c.style.animation=`caer ${3+Math.random()*2}s linear forwards`;
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),5000);
  }
}
