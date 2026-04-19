import{s as b,c as p,e as d,u as E,t as P,A as T}from"./utils-qpE3-oji.js";class y{static async getStoreConfig(){const{data:e,error:t}=await b.from("store_config").select("*").eq("id",1).maybeSingle();if(t)throw t;return{id:1,loja:(e==null?void 0:e.loja)??"Imagine Art",whatsapp:(e==null?void 0:e.whatsapp)??"",mensagem:(e==null?void 0:e.mensagem)??"Olá! Gostaria de fazer este pedido:",moeda:(e==null?void 0:e.moeda)??"BRL",banner:(e==null?void 0:e.banner)??"Escolha seus produtos personalizados.",delivery_lead_days:Math.max(1,Number((e==null?void 0:e.delivery_lead_days)??5))}}static async getProducts(){const{data:e,error:t}=await b.from("products").select("*").eq("active",!0).order("created_at",{ascending:!1});if(t)throw t;return(e??[]).map(i=>({...i,custom_fields:Array.isArray(i.custom_fields)?i.custom_fields:[]}))}static async getSchools(){const{data:e,error:t}=await b.from("schools").select("*").eq("active",!0).order("name",{ascending:!0});if(t)throw t;return e??[]}static async getPaymentMethods(){const{data:e,error:t}=await b.from("payment_methods").select("*").eq("active",!0).order("name",{ascending:!0});if(t)throw t;return e??[]}}const n={config:{loja:"Imagine Art",whatsapp:"",mensagem:"Olá! Gostaria de fazer este pedido:",moeda:"BRL",banner:""},products:[],schools:[],paymentMethods:[],cart:[]},q=document.querySelector("#app");function x(){q.innerHTML=`
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

      <div class="checkout-sections" style="margin-top:18px">
        <div class="card checkout-customer-card">
          <h2>Dados do cliente</h2>
          <div class="form-grid checkout-customer-grid">
            <div><label>Nome</label><input class="input" id="cNome"></div>
            <div><label>Telefone</label><input class="input" id="cTelefone"></div>
            <div><label>E-mail</label><input class="input" id="cEmail"></div>
            <div><label>Forma de pagamento</label><select class="input" id="cPagamento"></select></div>
          </div>
          <div class="checkout-customer-notes" style="margin-top:12px">
            <label>Observações gerais</label>
            <input class="input" id="cObs" placeholder="Prazo, detalhes, observações do pedido">
          </div>
          <div id="orderStatus" class="status hidden"></div>
        </div>
        <div class="card hidden checkout-summary-card" id="resumoCard">
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
  `}const o=a=>document.getElementById(a);function m(a,e="ok"){const t=o("orderStatus");t.classList.remove("hidden"),t.className=`status ${e}`,t.textContent=a}function $(){const e=o("cPagamento").selectedOptions[0];return Number((e==null?void 0:e.dataset.fee)||0)}function w(){return n.cart.reduce((a,e)=>a+e.sale_price*e.qtd,0)}function C(){return w()+$()}function L(){o("cartCount").textContent=`${n.cart.reduce((a,e)=>a+e.qtd,0)} item(s)`,o("cartTotal").textContent=p(C(),n.config.moeda)}function j(a=""){return'<option value="">Selecione a escola</option>'+n.schools.map(e=>`
    <option value="${d(e.name)}" ${e.name===a?"selected":""}>${d(e.name)}</option>
  `).join("")}function z(){const a=o("filtroCategoria"),e=[...new Set(n.products.map(t=>t.category||"Sem categoria"))];a.innerHTML='<option value="">Todas as categorias</option>'+e.map(t=>`<option value="${d(t)}">${d(t)}</option>`).join("")}function M(){const a=o("buscaCatalogo").value.trim().toLowerCase(),e=o("filtroCategoria").value;return n.products.filter(t=>{const i=[t.name,t.category||"",t.description||""].join(" ").toLowerCase().includes(a),r=!e||(t.category||"Sem categoria")===e;return i&&r})}function _(){const a=o("catalogGrid"),e=M();if(!e.length){a.innerHTML='<div class="card"><strong>Nenhum produto disponível.</strong><div style="margin-top:6px;color:#6b7280">Cadastre produtos no admin para exibir aqui.</div></div>';return}a.innerHTML=e.map(t=>{const r=(t.custom_fields||[]).map((l,s)=>`
      <div>
        <label>${d(l)}</label>
        <input class="input" id="field-${t.id}-${s}" placeholder="${d(l)}">
      </div>
    `).join("");return`
      <div class="product-card">
        <div class="product-image-wrap">${t.image_url?`<img class="product-image" src="${t.image_url}" alt="${d(t.name)}">`:"<div>Sem imagem</div>"}</div>
        <div class="product-info">
          <div class="smallcaps">${d(t.category||"Produto")}</div>
          <div><strong>${d(t.name)}</strong></div>
          <div style="color:#6b7280">${d(t.description||"")}</div>
          <div class="price">${p(t.sale_price,n.config.moeda)}</div>
          <div>
            <label>Escola</label>
            <select class="input" id="school-${t.id}">${j()}</select>
          </div>
          ${r}
          <div class="toolbar">
            <div class="qty">
              <button type="button" data-role="dec" data-id="${t.id}">−</button>
              <span id="qty-${t.id}">1</span>
              <button type="button" data-role="inc" data-id="${t.id}">+</button>
            </div>
            <button class="btn primary" data-role="add" data-id="${t.id}">Adicionar</button>
          </div>
        </div>
      </div>
    `}).join("")}function N(){const a=o("cPagamento");if(!n.paymentMethods.length){a.innerHTML='<option value="">Nenhuma forma de pagamento disponível</option>';return}a.innerHTML=n.paymentMethods.map(e=>{const t=e.extra_fee>0?`${e.name} (+ ${p(e.extra_fee,n.config.moeda)})`:e.name;return`<option value="${d(e.name)}" data-fee="${e.extra_fee}">${d(t)}</option>`}).join("")}function g(){var e;L();const a=o("resumoPedido");if(!n.cart.length){a.innerHTML='<tr><td colspan="5">Nenhum item adicionado.</td></tr>';return}a.innerHTML=n.cart.map(t=>`
    <tr>
      <td>${d(t.nome)}</td>
      <td>${t.qtd}</td>
      <td>${d(t.personalizacao||"—")}</td>
      <td>${p(t.sale_price*t.qtd,n.config.moeda)}</td>
      <td><button class="btn small" data-role="remove-cart" data-id="${t.id}">Remover</button></td>
    </tr>
  `).join(""),$()>0&&a.insertAdjacentHTML("beforeend",`
      <tr>
        <td><strong>Taxa da forma de pagamento</strong></td>
        <td>—</td>
        <td>${d(((e=o("cPagamento").selectedOptions[0])==null?void 0:e.textContent)||"")}</td>
        <td>${p($(),n.config.moeda)}</td>
        <td>—</td>
      </tr>
    `)}function A(){o("storeNameTop").textContent=n.config.loja,o("bannerText").textContent=n.config.banner||"Escolha seus produtos personalizados."}function k(a,e){const t=o(`qty-${a}`);t.textContent="1";const i=o(`school-${a}`);i&&(i.value=""),e.forEach((r,l)=>{const s=o(`field-${a}-${l}`);s&&(s.value="")})}function O(a){const e=n.products.find(u=>u.id===a);if(!e)return;const t=o(`school-${a}`).value.trim();if(!t){m("Selecione a escola deste produto antes de adicionar.","error");return}const i=Number(o(`qty-${a}`).textContent||"1"),r=e.custom_fields||[];let l="",s="";const v=r.map((u,c)=>{var S;const h=((S=o(`field-${a}-${c}`))==null?void 0:S.value.trim())||"",f=u.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();return(f.includes("crianca")||f==="nome")&&(l=h||l),(f.includes("turma")||f.includes("sala"))&&(s=h||s),h?`${u}: ${h}`:""}).filter(Boolean).join(" | ");n.cart.push({id:E(),productId:e.id,nome:e.name,qtd:i,sale_price:e.sale_price,personalizacao:[t?`Escola: ${t}`:"",v].filter(Boolean).join(" | "),school_name:t,child_name:l,classroom:s}),k(a,r),g(),m("Produto adicionado ao pedido.","ok")}async function B(){if(!n.cart.length)return m("Adicione ao menos um item.","error"),!1;const a=o("cNome").value.trim(),e=o("cTelefone").value.trim(),t=o("cEmail").value.trim(),i=o("cPagamento").value.trim(),r=o("cObs").value.trim();if(!a||!e)return m("Preencha nome e telefone.","error"),!1;const l=[...new Set(n.cart.map(c=>c.school_name).filter(Boolean))],s=[...new Set(n.cart.map(c=>c.child_name).filter(Boolean))],v=[...new Set(n.cart.map(c=>c.classroom).filter(Boolean))],u={client_name:a,phone:e,email:t||null,school_name:l.join(", ")||null,child_name:s.join(", ")||null,classroom:v.join(", ")||null,order_date:P(),payment_method:i||null,notes:r||null,subtotal_amount:w(),extra_fee:$(),total_amount:C(),items:n.cart.map(c=>({productId:c.productId,nome:c.nome,qtd:c.qtd,sale_price:c.sale_price,personalizacao:c.personalizacao,school_name:c.school_name,child_name:c.child_name,classroom:c.classroom}))};return m("Salvando pedido...","warn"),await T.invoke("create-order",u),m("Pedido salvo com sucesso!","ok"),!0}async function H(){const a=(n.config.whatsapp||"").replace(/\D/g,"");if(!a){m("Configure o WhatsApp da loja no admin.","error");return}if(!await B())return;const t=o("cPagamento").value.trim(),i=n.cart.map((s,v)=>[`${v+1}. ${s.qtd}x ${s.nome} — ${p(s.sale_price*s.qtd,n.config.moeda)}`,s.school_name?`   Escola: ${s.school_name}`:"",s.personalizacao?`   Personalização: ${s.personalizacao}`:"",s.child_name?`   Criança: ${s.child_name}`:"",s.classroom?`   Turma/Sala: ${s.classroom}`:""].filter(Boolean).join(`
`)).join(`
`),r=[n.config.mensagem||"Olá! Gostaria de fazer este pedido:","","*Pedido:*",i,"",`*Total:* ${p(C(),n.config.moeda)}`,`*Cliente:* ${o("cNome").value.trim()}`,`*Telefone:* ${o("cTelefone").value.trim()}`,o("cEmail").value.trim()?`*E-mail:* ${o("cEmail").value.trim()}`:"",t?`*Pagamento:* ${t}`:"",o("cObs").value.trim()?`*Observações:* ${o("cObs").value.trim()}`:""].filter(Boolean).join(`
`);n.cart=[],g(),["cNome","cTelefone","cEmail","cObs"].forEach(s=>{o(s).value=""});const l=encodeURIComponent(r);window.open(`https://wa.me/${a}?text=${l}`,"_blank")}function R(){document.addEventListener("click",a=>{const e=a.target,t=e.dataset.role,i=e.dataset.id;if(!(!t||!i)){if(t==="inc"||t==="dec"){const r=o(`qty-${i}`),l=Number(r.textContent||"1");r.textContent=String(Math.max(1,l+(t==="inc"?1:-1)))}t==="add"&&O(i),t==="remove-cart"&&(n.cart=n.cart.filter(r=>r.id!==i),g())}}),o("buscaCatalogo").addEventListener("input",_),o("filtroCategoria").addEventListener("change",_),o("cPagamento").addEventListener("change",g),o("openResumo").addEventListener("click",()=>o("resumoCard").classList.remove("hidden")),o("hideResumo").addEventListener("click",()=>o("resumoCard").classList.add("hidden")),o("saveAndSendBtn").addEventListener("click",()=>void H())}async function F(){x(),R();const[a,e,t,i]=await Promise.all([y.getStoreConfig(),y.getProducts(),y.getSchools(),y.getPaymentMethods()]);n.config=a,n.products=e,n.schools=t,n.paymentMethods=i,A(),N(),z(),_(),g()}F().catch(a=>{x(),m(a instanceof Error?a.message:"Erro ao iniciar o catálogo.","error")});
