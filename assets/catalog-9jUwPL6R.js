import{s as b,c as p,e as c,u as E,t as P,A as T}from"./utils-D_CECM-2.js";class ${static async getStoreConfig(){const{data:e,error:a}=await b.from("store_config").select("*").eq("id",1).maybeSingle();if(a)throw a;return{id:1,loja:(e==null?void 0:e.loja)??"Imagine Art",whatsapp:(e==null?void 0:e.whatsapp)??"",mensagem:(e==null?void 0:e.mensagem)??"Olá! Gostaria de fazer este pedido:",moeda:(e==null?void 0:e.moeda)??"BRL",banner:(e==null?void 0:e.banner)??"Escolha seus produtos personalizados."}}static async getProducts(){const{data:e,error:a}=await b.from("products").select("*").eq("active",!0).order("created_at",{ascending:!1});if(a)throw a;return(e??[]).map(i=>({...i,custom_fields:Array.isArray(i.custom_fields)?i.custom_fields:[]}))}static async getSchools(){const{data:e,error:a}=await b.from("schools").select("*").eq("active",!0).order("name",{ascending:!0});if(a)throw a;return e??[]}static async getPaymentMethods(){const{data:e,error:a}=await b.from("payment_methods").select("*").eq("active",!0).order("name",{ascending:!0});if(a)throw a;return e??[]}}const n={config:{loja:"Imagine Art",whatsapp:"",mensagem:"Olá! Gostaria de fazer este pedido:",moeda:"BRL",banner:""},products:[],schools:[],paymentMethods:[],cart:[]},q=document.querySelector("#app");function w(){q.innerHTML=`
    <div class="topbar">
      <div class="topbar-inner">
        <div class="brand"><div class="logo"></div><div><div id="storeNameTop">Imagine Art</div><small>Catálogo • Pedido via WhatsApp</small></div></div>
        <div class="toolbar">
          <select id="filtroCategoria" class="input" style="max-width:220px"></select>
          <input class="input" id="buscaCatalogo" placeholder="Buscar produto" style="max-width:260px">
        </div>
      </div>
    </div>
    <div class="container">
      <section class="hero">
        <div class="hero-content">
          <div>
            <div class="smallcaps" style="color:#ddd">Catálogo online</div>
            <h1>Escolha seus produtos personalizados.</h1>
            <p id="bannerText">Coleção personalizada pronta para encantar seus clientes.</p>
          </div>
          <div class="hero-panel">
            <div class="smallcaps" style="color:#e9d5ff">Como funciona</div>
            <p>Escolha os produtos, informe a personalização e salve o pedido.</p>
          </div>
        </div>
      </section>

      <div class="notice" style="margin-top:16px">
        Selecione os itens, preencha a personalização e clique em <strong>Salvar pedido e enviar no WhatsApp</strong>.
      </div>

      <section class="catalog-grid" id="catalogGrid"></section>

      <div class="checkout-bar">
        <div>
          <div class="smallcaps">Resumo do pedido</div>
          <div><strong id="cartCount">0 item(s)</strong> • <span id="cartTotal">R$ 0,00</span></div>
        </div>
        <div class="toolbar">
          <button class="btn" id="openResumo">Ver resumo</button>
          <button class="btn success" id="saveAndSendBtn">Salvar pedido e enviar no WhatsApp</button>
        </div>
      </div>

      <div class="grid grid-2" style="margin-top:18px">
        <div class="card">
          <h2>Dados do cliente</h2>
          <div class="form-grid">
            <div><label>Nome</label><input class="input" id="cNome"></div>
            <div><label>Telefone</label><input class="input" id="cTelefone"></div>
            <div><label>E-mail</label><input class="input" id="cEmail"></div>
            <div><label>Forma de pagamento</label><select class="input" id="cPagamento"></select></div>
          </div>
          <div style="margin-top:12px">
            <label>Observações gerais</label>
            <input class="input" id="cObs" placeholder="Prazo, detalhes, observações do pedido">
          </div>
          <div id="orderStatus" class="status hidden"></div>
        </div>
        <div class="card hidden" id="resumoCard">
          <div class="toolbar">
            <h2 style="margin:0">Resumo do pedido</h2>
            <span class="spacer"></span>
            <button class="btn" id="hideResumo">Fechar</button>
          </div>
          <div class="table-wrap" style="margin-top:14px">
            <table>
              <thead><tr><th>Produto</th><th>Qtd</th><th>Personalização</th><th>Subtotal</th><th>Ação</th></tr></thead>
              <tbody id="resumoPedido"></tbody>
            </table>
          </div>
          <div class="footer-note">Confira tudo antes de salvar ou enviar.</div>
        </div>
      </div>
    </div>
  `}const o=t=>document.getElementById(t);function m(t,e="ok"){const a=o("orderStatus");a.classList.remove("hidden"),a.className=`status ${e}`,a.textContent=t}function y(){const e=o("cPagamento").selectedOptions[0];return Number((e==null?void 0:e.dataset.fee)||0)}function x(){return n.cart.reduce((t,e)=>t+e.sale_price*e.qtd,0)}function _(){return x()+y()}function L(){o("cartCount").textContent=`${n.cart.reduce((t,e)=>t+e.qtd,0)} item(s)`,o("cartTotal").textContent=p(_(),n.config.moeda)}function j(t=""){return'<option value="">Selecione a escola</option>'+n.schools.map(e=>`
    <option value="${c(e.name)}" ${e.name===t?"selected":""}>${c(e.name)}</option>
  `).join("")}function z(){const t=o("filtroCategoria"),e=[...new Set(n.products.map(a=>a.category||"Sem categoria"))];t.innerHTML='<option value="">Todas as categorias</option>'+e.map(a=>`<option value="${c(a)}">${c(a)}</option>`).join("")}function A(){const t=o("buscaCatalogo").value.trim().toLowerCase(),e=o("filtroCategoria").value;return n.products.filter(a=>{const i=[a.name,a.category||"",a.description||""].join(" ").toLowerCase().includes(t),r=!e||(a.category||"Sem categoria")===e;return i&&r})}function C(){const t=o("catalogGrid"),e=A();if(!e.length){t.innerHTML='<div class="card"><strong>Nenhum produto disponível.</strong><div style="margin-top:6px;color:#6b7280">Cadastre produtos no admin para exibir aqui.</div></div>';return}t.innerHTML=e.map(a=>{const r=(a.custom_fields||[]).map((l,s)=>`
      <div>
        <label>${c(l)}</label>
        <input class="input" id="field-${a.id}-${s}" placeholder="${c(l)}">
      </div>
    `).join("");return`
      <div class="product-card">
        <div class="product-image-wrap">${a.image_url?`<img class="product-image" src="${a.image_url}" alt="${c(a.name)}">`:"<div>Sem imagem</div>"}</div>
        <div class="product-info">
          <div class="smallcaps">${c(a.category||"Produto")}</div>
          <div><strong>${c(a.name)}</strong></div>
          <div style="color:#6b7280">${c(a.description||"")}</div>
          <div class="price">${p(a.sale_price,n.config.moeda)}</div>
          <div>
            <label>Escola</label>
            <select class="input" id="school-${a.id}">${j()}</select>
          </div>
          ${r}
          <div class="toolbar">
            <div class="qty">
              <button type="button" data-role="dec" data-id="${a.id}">−</button>
              <span id="qty-${a.id}">1</span>
              <button type="button" data-role="inc" data-id="${a.id}">+</button>
            </div>
            <button class="btn primary" data-role="add" data-id="${a.id}">Adicionar</button>
          </div>
        </div>
      </div>
    `}).join("")}function M(){const t=o("cPagamento");if(!n.paymentMethods.length){t.innerHTML='<option value="">Nenhuma forma de pagamento disponível</option>';return}t.innerHTML=n.paymentMethods.map(e=>{const a=e.extra_fee>0?`${e.name} (+ ${p(e.extra_fee,n.config.moeda)})`:e.name;return`<option value="${c(e.name)}" data-fee="${e.extra_fee}">${c(a)}</option>`}).join("")}function g(){var e;L();const t=o("resumoPedido");if(!n.cart.length){t.innerHTML='<tr><td colspan="5">Nenhum item adicionado.</td></tr>';return}t.innerHTML=n.cart.map(a=>`
    <tr>
      <td>${c(a.nome)}</td>
      <td>${a.qtd}</td>
      <td>${c(a.personalizacao||"—")}</td>
      <td>${p(a.sale_price*a.qtd,n.config.moeda)}</td>
      <td><button class="btn small" data-role="remove-cart" data-id="${a.id}">Remover</button></td>
    </tr>
  `).join(""),y()>0&&t.insertAdjacentHTML("beforeend",`
      <tr>
        <td><strong>Taxa da forma de pagamento</strong></td>
        <td>—</td>
        <td>${c(((e=o("cPagamento").selectedOptions[0])==null?void 0:e.textContent)||"")}</td>
        <td>${p(y(),n.config.moeda)}</td>
        <td>—</td>
      </tr>
    `)}function N(){o("storeNameTop").textContent=n.config.loja,o("bannerText").textContent=n.config.banner||"Escolha seus produtos personalizados."}function O(t,e){const a=o(`qty-${t}`);a.textContent="1";const i=o(`school-${t}`);i&&(i.value=""),e.forEach((r,l)=>{const s=o(`field-${t}-${l}`);s&&(s.value="")})}function B(t){const e=n.products.find(u=>u.id===t);if(!e)return;const a=o(`school-${t}`).value.trim();if(!a){m("Selecione a escola deste produto antes de adicionar.","error");return}const i=Number(o(`qty-${t}`).textContent||"1"),r=e.custom_fields||[];let l="",s="";const v=r.map((u,d)=>{var S;const f=((S=o(`field-${t}-${d}`))==null?void 0:S.value.trim())||"",h=u.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();return(h.includes("crianca")||h==="nome")&&(l=f||l),(h.includes("turma")||h.includes("sala"))&&(s=f||s),f?`${u}: ${f}`:""}).filter(Boolean).join(" | ");n.cart.push({id:E(),productId:e.id,nome:e.name,qtd:i,sale_price:e.sale_price,personalizacao:[a?`Escola: ${a}`:"",v].filter(Boolean).join(" | "),school_name:a,child_name:l,classroom:s}),O(t,r),g(),m("Produto adicionado ao pedido.","ok")}async function H(){if(!n.cart.length)return m("Adicione ao menos um item.","error"),!1;const t=o("cNome").value.trim(),e=o("cTelefone").value.trim(),a=o("cEmail").value.trim(),i=o("cPagamento").value.trim(),r=o("cObs").value.trim();if(!t||!e)return m("Preencha nome e telefone.","error"),!1;const l=[...new Set(n.cart.map(d=>d.school_name).filter(Boolean))],s=[...new Set(n.cart.map(d=>d.child_name).filter(Boolean))],v=[...new Set(n.cart.map(d=>d.classroom).filter(Boolean))],u={client_name:t,phone:e,email:a||null,school_name:l.join(", ")||null,child_name:s.join(", ")||null,classroom:v.join(", ")||null,order_date:P(),payment_method:i||null,notes:r||null,subtotal_amount:x(),extra_fee:y(),total_amount:_(),items:n.cart.map(d=>({productId:d.productId,nome:d.nome,qtd:d.qtd,sale_price:d.sale_price,personalizacao:d.personalizacao,school_name:d.school_name,child_name:d.child_name,classroom:d.classroom}))};return m("Salvando pedido...","warn"),await T.invoke("create-order",u,{requireAuth:!1}),m("Pedido salvo com sucesso!","ok"),!0}async function R(){const t=(n.config.whatsapp||"").replace(/\D/g,"");if(!t){m("Configure o WhatsApp da loja no admin.","error");return}if(!await H())return;const a=o("cPagamento").value.trim(),i=n.cart.map((s,v)=>[`${v+1}. ${s.qtd}x ${s.nome} — ${p(s.sale_price*s.qtd,n.config.moeda)}`,s.school_name?`   Escola: ${s.school_name}`:"",s.personalizacao?`   Personalização: ${s.personalizacao}`:"",s.child_name?`   Criança: ${s.child_name}`:"",s.classroom?`   Turma/Sala: ${s.classroom}`:""].filter(Boolean).join(`
`)).join(`
`),r=[n.config.mensagem||"Olá! Gostaria de fazer este pedido:","","*Pedido:*",i,"",`*Total:* ${p(_(),n.config.moeda)}`,`*Cliente:* ${o("cNome").value.trim()}`,`*Telefone:* ${o("cTelefone").value.trim()}`,o("cEmail").value.trim()?`*E-mail:* ${o("cEmail").value.trim()}`:"",a?`*Pagamento:* ${a}`:"",o("cObs").value.trim()?`*Observações:* ${o("cObs").value.trim()}`:""].filter(Boolean).join(`
`);n.cart=[],g(),["cNome","cTelefone","cEmail","cObs"].forEach(s=>{o(s).value=""});const l=encodeURIComponent(r);window.open(`https://wa.me/${t}?text=${l}`,"_blank")}function k(){document.addEventListener("click",t=>{const e=t.target,a=e.dataset.role,i=e.dataset.id;if(!(!a||!i)){if(a==="inc"||a==="dec"){const r=o(`qty-${i}`),l=Number(r.textContent||"1");r.textContent=String(Math.max(1,l+(a==="inc"?1:-1)))}a==="add"&&B(i),a==="remove-cart"&&(n.cart=n.cart.filter(r=>r.id!==i),g())}}),o("buscaCatalogo").addEventListener("input",C),o("filtroCategoria").addEventListener("change",C),o("cPagamento").addEventListener("change",g),o("openResumo").addEventListener("click",()=>o("resumoCard").classList.remove("hidden")),o("hideResumo").addEventListener("click",()=>o("resumoCard").classList.add("hidden")),o("saveAndSendBtn").addEventListener("click",()=>void R())}async function F(){w(),k();const[t,e,a,i]=await Promise.all([$.getStoreConfig(),$.getProducts(),$.getSchools(),$.getPaymentMethods()]);n.config=t,n.products=e,n.schools=a,n.paymentMethods=i,N(),M(),z(),C(),g()}F().catch(t=>{w(),m(t instanceof Error?t.message:"Erro ao iniciar o catálogo.","error")});
