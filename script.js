const KEY_FROTA="maquinapro_frota";
const frotaInicial=[
 {id:1,registro:"REG-001",categoria:"Escavadeira",quantidade:5,status:"Disponível",atualizado:"17/08/2026 22:00"},
 {id:2,registro:"REG-002",categoria:"Retroescavadeira",quantidade:3,status:"Em operação",atualizado:"17/08/2026 21:30"},
 {id:3,registro:"REG-003",categoria:"Pá carregadeira",quantidade:2,status:"Em manutenção",atualizado:"17/08/2026 20:15"},
 {id:4,registro:"REG-004",categoria:"Motoniveladora",quantidade:4,status:"Disponível",atualizado:"17/08/2026 19:45"}
];
function getFrota(){
 const data=localStorage.getItem(KEY_FROTA);
 if(!data){localStorage.setItem(KEY_FROTA,JSON.stringify(frotaInicial));return [...frotaInicial]}
 return JSON.parse(data);
}
function statusClass(s){
 if(s==="Disponível") return "available";
 if(s==="Em operação") return "busy";
 if(s==="Em manutenção") return "maint";
 if(s==="Reservado") return "reserved";
 return "inactive";
}
function esc(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function renderFrota(){
 const q=(document.getElementById("busca").value||"").toLowerCase();
 const f=getFrota().filter(m=>(m.registro+" "+m.categoria+" "+m.status).toLowerCase().includes(q));
 document.getElementById("tabelaFrota").innerHTML=f.map(m=>`<tr>
 <td><strong>${esc(m.registro)}</strong></td>
 <td>${esc(m.categoria)}</td>
 <td>${m.quantidade}</td>
 <td><span class="badge ${statusClass(m.status)}">${esc(m.status)}</span></td>
 <td class="muted">${esc(m.atualizado)}</td>
 </tr>`).join("") || '<tr><td colspan="5">Nenhum registro encontrado.</td></tr>';
 const total=frotaInicial; const all=getFrota();
 document.getElementById("totalRegistros").textContent=all.length;
 document.getElementById("totalMaquinas").textContent=all.reduce((a,x)=>a+Number(x.quantidade||0),0);
 document.getElementById("disponiveis").textContent=all.filter(x=>x.status==="Disponível").reduce((a,x)=>a+Number(x.quantidade||0),0);
 document.getElementById("manutencao").textContent=all.filter(x=>x.status==="Em manutenção").reduce((a,x)=>a+Number(x.quantidade||0),0);
}
renderFrota();
window.addEventListener("storage",renderFrota);

// WhatsApp: informe o número da empresa abaixo no formato internacional,
// somente números, incluindo o código do país e DDD.
// Exemplo Brasil: 5511999999999
const WHATSAPP_NUMERO = "5571984120177";
const WHATSAPP_MENSAGEM = "Olá! Gostaria de obter informações sobre a MáquinaPro.";
const whatsappLink = document.getElementById("whatsappLink");
if (whatsappLink) {
  whatsappLink.href = "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + encodeURIComponent(WHATSAPP_MENSAGEM);
}

// Menu mobile
const menuToggle=document.querySelector(".menu-toggle");
const mainNav=document.querySelector(".main-nav");
if(menuToggle && mainNav){
  menuToggle.addEventListener("click",()=>mainNav.classList.toggle("mobile-open"));
  mainNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>mainNav.classList.remove("mobile-open")));
}

/* =========================================================
   STATUS DINÂMICO DA FROTA
   ========================================================= */
(function(){
  function normalizarStatus(valor){
    return String(valor || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g,"")
      .replace(/\s+/g," ");
  }

  function aplicarCorStatus(el){
    if(!el) return;
    const texto=normalizarStatus(
      el.dataset.status ||
      el.getAttribute("data-status") ||
      el.textContent
    );

    el.classList.remove(
      "status-disponivel","status-available",
      "status-operacao","status-em-operacao","status-alugada","status-busy",
      "status-manutencao","status-em-manutencao","status-maintenance",
      "status-reservada","status-reserved",
      "status-indisponivel","status-inactive"
    );

    let classe="status-indisponivel";
    if(texto.includes("disponivel") && !texto.includes("indisponivel")){
      classe="status-disponivel";
    }else if(
      texto.includes("operacao") ||
      texto.includes("alugada") ||
      texto.includes("em uso") ||
      texto.includes("ocupada")
    ){
      classe="status-operacao";
    }else if(texto.includes("manutencao")){
      classe="status-manutencao";
    }else if(texto.includes("reservad")){
      classe="status-reservada";
    }else if(texto.includes("indisponivel") || texto.includes("inativa")){
      classe="status-indisponivel";
    }

    el.classList.add(classe);
    el.dataset.status=texto;
    el.classList.add("fleet-status");
  }

  function atualizarStatusDaFrota(){
    document.querySelectorAll(
      '#frota .status, #frota .status-badge, #frota .badge, #frota [data-status], #frota select'
    ).forEach(el=>{
      if(el.tagName === "SELECT"){
        aplicarCorStatus(el);
        el.addEventListener("change",()=>aplicarCorStatus(el));
      }else{
        aplicarCorStatus(el);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", atualizarStatusDaFrota);

  // Se o painel atualizar a tabela sem recarregar a página,
  // as cores são reaplicadas automaticamente.
  const observer=new MutationObserver(()=>{
    atualizarStatusDaFrota();
  });
  observer.observe(document.body,{childList:true,subtree:true,characterData:true});
})();
