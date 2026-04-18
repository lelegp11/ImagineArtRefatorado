var M=Object.defineProperty;var x=(t,e,i)=>e in t?M(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var b=(t,e,i)=>x(t,typeof e!="symbol"?e+"":e,i);import{s as f,A as n,u as $,e as l,c as u,t as A}from"./utils-D5_6vtM7.js";const m=class m{static async uploadProductImage(e,i){const d=e.name.split(".").pop()||"jpg",c=`products/${i}/cover.${d}`,{error:v}=await f.storage.from(m.PRODUCT_BUCKET).upload(c,e,{upsert:!0,contentType:e.type||"image/jpeg",cacheControl:"3600"});if(v)throw v;const{data:p}=f.storage.from(m.PRODUCT_BUCKET).getPublicUrl(c);return p.publicUrl}};b(m,"PRODUCT_BUCKET","product-images");let g=m;const s={products:[],schools:[],paymentMethods:[],orders:[],config:{loja:"Imagine Art",whatsapp:"",mensagem:"Olá! Gostaria de fazer este pedido:",moeda:"BRL",banner:""},currentFile:null,editingProductId:null,editingSchoolId:null,editingPaymentMethodId:null},N=document.querySelector("#app"),a=t=>document.getElementById(t);function w(){N.innerHTML=`
    <div class="topbar">
      <div class="topbar-inner">
        <div class="brand"><div class="logo"></div><div><div>Imagine Art</div><small>Admin</small></div></div>
        <div class="nav" id="navBar">
          <button class="btn small active" data-view="dashboard">Dashboard</button>
          <button class="btn small" data-view="produtos">Produtos</button>
          <button class="btn small" data-view="escolas">Escolas</button>
          <button class="btn small" data-view="pagamentos">Pagamentos</button>
          <button class="btn small" data-view="pedidos">Pedidos</button>
          <button class="btn small" data-view="configuracoes">Configurações</button>
        </div>
        <div class="toolbar">
          <button class="btn small" id="btnPreviewCliente">Abrir catálogo</button>
          <button class="btn small" id="btnRefresh">Atualizar</button>
          <button class="btn danger small hidden" id="btnLogout">Sair</button>
        </div>
      </div>
    </div>
    <div class="container">
      <section id="authView" class="view">
        <div class="grid grid-2">
          <div class="card">
            <h2 style="margin-top:0">Entrar no painel</h2>
            <div class="grid grid-2">
              <div><label>E-mail</label><input class="input" id="authEmail"></div>
              <div><label>Senha</label><input class="input" id="authPassword" type="password"></div>
            </div>
            <div class="toolbar" style="margin-top:14px">
              <button class="btn primary" id="btnLogin">Entrar</button>
              <button class="btn" id="btnSignup">Criar conta admin</button>
            </div>
            <div id="authStatus" class="status hidden"></div>
          </div>
          <div class="card">
            <h2 style="margin-top:0">Projeto pronto para Supabase</h2>
            <div class="status warn">Use sua conta admin do Supabase Auth para acessar o painel.</div>
          </div>
        </div>
      </section>

      <section id="appView" class="hidden">
        <section id="dashboard" class="view">
          <div class="hero">
            <div class="hero-content">
              <div>
                <div class="smallcaps" style="color:#ddd">Gestão interna</div>
                <h1>Painel profissional conectado ao Supabase.</h1>
                <p>Acompanhe produtos, pedidos, escolas e configurações em uma estrutura separada por frontend e backend.</p>
              </div>
              <div class="hero-panel">
                <div class="smallcaps" style="color:#e9d5ff">Resumo rápido</div>
                <div class="grid grid-2" style="margin-top:10px">
                  <div class="card" style="background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.14);color:#fff"><div class="smallcaps" style="color:#fff">Produtos</div><div class="value" id="heroProdutos">0</div></div>
                  <div class="card" style="background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.14);color:#fff"><div class="smallcaps" style="color:#fff">Pedidos</div><div class="value" id="heroPedidos">0</div></div>
                  <div class="card" style="background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.14);color:#fff"><div class="smallcaps" style="color:#fff">Receita</div><div class="value" id="heroReceita">R$ 0,00</div></div>
                  <div class="card" style="background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.14);color:#fff"><div class="smallcaps" style="color:#fff">Lucro</div><div class="value" id="heroLucro">R$ 0,00</div></div>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-4" style="margin-top:18px">
            <div class="card kpi"><div class="smallcaps">Receita total</div><div class="value" id="kpiReceita">R$ 0,00</div></div>
            <div class="card kpi"><div class="smallcaps">Lucro estimado</div><div class="value" id="kpiLucro">R$ 0,00</div></div>
            <div class="card kpi"><div class="smallcaps">Ticket médio</div><div class="value" id="kpiTicket">R$ 0,00</div></div>
            <div class="card kpi"><div class="smallcaps">Margem média</div><div class="value" id="kpiMargem">0%</div></div>
          </div>
        </section>

        <section id="produtos" class="view hidden">
          <div class="grid grid-2">
            <div class="card">
              <div class="toolbar"><h2 style="margin:0">Cadastro de produto</h2><span class="spacer"></span><button class="btn small" id="resetProduto">Limpar</button></div>
              <div class="form-grid" style="margin-top:12px">
                <div><label>Nome</label><input class="input" id="pNome"></div>
                <div><label>Categoria</label><input class="input" id="pCategoria"></div>
                <div><label>Preço de venda</label><input class="input" id="pPreco" type="number" step="0.01"></div>
                <div><label>Custo</label><input class="input" id="pCusto" type="number" step="0.01"></div>
                <div><label>Tempo de produção</label><input class="input" id="pTempo" type="number" step="1"></div>
                <div><label>SKU</label><input class="input" id="pSku"></div>
                <div><label>Ativo</label><select class="input" id="pActive"><option value="true">Sim</option><option value="false">Não</option></select></div>
                <div><label>Foto</label><input class="input" id="pFoto" type="file" accept="image/*"></div>
              </div>
              <div style="margin-top:12px"><label>Descrição</label><textarea class="input" id="pDescricao" rows="3"></textarea></div>
              <div style="margin-top:12px"><label>Campos de personalização (separados por vírgula)</label><input class="input" id="pCampos" placeholder="Nome, Tema, Turma"></div>
              <div class="toolbar" style="margin-top:14px"><img id="previewFoto" class="thumb hidden" alt="Prévia"><span class="spacer"></span><button class="btn primary" id="saveProdutoBtn">Salvar produto</button></div>
              <div id="produtoStatus" class="status">Preencha os dados e clique em salvar.</div>
            </div>
            <div class="card">
              <div class="toolbar"><h2 style="margin:0">Produtos cadastrados</h2><span class="spacer"></span><input class="input" id="buscaProduto" placeholder="Buscar produto" style="max-width:260px"></div>
              <div class="table-wrap" style="margin-top:14px"><table><thead><tr><th>Foto</th><th>Nome</th><th>Categoria</th><th>Preço</th><th>Custo</th><th>Ativo</th><th>Ações</th></tr></thead><tbody id="productsTable"></tbody></table></div>
            </div>
          </div>
        </section>

        <section id="escolas" class="view hidden">
          <div class="grid grid-2">
            <div class="card">
              <div class="toolbar"><h2 style="margin:0">Cadastro de escola</h2><span class="spacer"></span><button class="btn small" id="resetEscola">Limpar</button></div>
              <div class="grid grid-3" style="margin-top:12px">
                <div><label>Nome</label><input class="input" id="schoolName"></div>
                <div><label>% de repasse</label><input class="input" id="schoolPercentage" type="number" step="0.01"></div>
                <div><label>Ativa</label><select class="input" id="schoolActive"><option value="true">Sim</option><option value="false">Não</option></select></div>
              </div>
              <div class="toolbar" style="margin-top:14px"><button class="btn primary" id="saveSchoolBtn">Salvar escola</button></div>
              <div id="schoolStatus" class="status">Cadastre aqui as escolas e o percentual de repasse.</div>
            </div>
            <div class="card"><h2 style="margin-top:0">Escolas cadastradas</h2><div class="table-wrap"><table><thead><tr><th>Nome</th><th>% repasse</th><th>Ativa</th><th>Ações</th></tr></thead><tbody id="schoolsTable"></tbody></table></div></div>
          </div>
        </section>

        <section id="pagamentos" class="view hidden">
          <div class="grid grid-2">
            <div class="card">
              <div class="toolbar"><h2 style="margin:0">Cadastro de forma de pagamento</h2><span class="spacer"></span><button class="btn small" id="resetPaymentMethod">Limpar</button></div>
              <div class="grid grid-2" style="margin-top:12px">
                <div><label>Nome</label><input class="input" id="paymentMethodName"></div>
                <div><label>Ativa</label><select class="input" id="paymentMethodActive"><option value="true">Sim</option><option value="false">Não</option></select></div>
                <div><label>Taxa fixa</label><input class="input" id="paymentMethodFee" type="number" step="0.01" value="0"></div>
                <div><label>Descrição</label><input class="input" id="paymentMethodDescription"></div>
              </div>
              <div class="toolbar" style="margin-top:14px"><button class="btn primary" id="savePaymentMethodBtn">Salvar forma de pagamento</button></div>
              <div id="paymentMethodStatus" class="status">Cadastre aqui as formas de pagamento.</div>
            </div>
            <div class="card"><h2 style="margin-top:0">Formas de pagamento cadastradas</h2><div class="table-wrap"><table><thead><tr><th>Nome</th><th>Taxa fixa</th><th>Ativa</th><th>Ações</th></tr></thead><tbody id="paymentMethodsTable"></tbody></table></div></div>
          </div>
        </section>

        <section id="pedidos" class="view hidden">
          <div class="card">
            <div class="toolbar"><h2 style="margin:0">Pedidos recebidos</h2><span class="spacer"></span><button class="btn small" id="refreshOrdersBtn">Atualizar pedidos</button></div>
            <div class="table-wrap" style="margin-top:14px"><table><thead><tr><th>Cliente</th><th>Contato</th><th>Data</th><th>Pagamento</th><th>Total</th><th>Pago</th><th>Entregue</th><th>Ações</th></tr></thead><tbody id="ordersTable"></tbody></table></div>
          </div>
        </section>

        <section id="configuracoes" class="view hidden">
          <div class="grid grid-2">
            <div class="card">
              <h2 style="margin-top:0">Configurações rápidas da loja</h2>
              <div class="grid grid-2">
                <div><label>Nome da loja</label><input class="input" id="cfgLoja"></div>
                <div><label>WhatsApp principal</label><input class="input" id="cfgWhatsapp"></div>
                <div><label>Mensagem inicial</label><input class="input" id="cfgMsg"></div>
                <div><label>Moeda</label><input class="input" id="cfgMoeda"></div>
              </div>
              <div style="margin-top:12px"><label>Texto do banner</label><textarea class="input" id="cfgBanner" rows="3"></textarea></div>
              <div class="toolbar" style="margin-top:14px"><button class="btn success" id="saveConfigBtn">Salvar configurações</button></div>
              <div id="configStatus" class="status">Atualize os dados da loja e salve.</div>
            </div>
          </div>
        </section>
      </section>
    </div>
  `}function o(t,e,i=""){const d=a(t);d.textContent=e,d.className=`status ${i}`.trim()}function S(){a("authView").classList.add("hidden"),a("appView").classList.remove("hidden"),a("btnLogout").classList.remove("hidden")}function P(){a("authView").classList.remove("hidden"),a("appView").classList.add("hidden"),a("btnLogout").classList.add("hidden")}function h(t){document.querySelectorAll("#appView .view").forEach(e=>e.classList.add("hidden")),a(t).classList.remove("hidden"),document.querySelectorAll("#navBar button").forEach(e=>e.classList.toggle("active",e.dataset.view===t))}function _(t){return t.items.reduce((e,i)=>{const d=s.products.find(c=>c.id===i.productId);return e+Number((d==null?void 0:d.cost)||0)*i.qtd},0)}function T(){const t=s.orders.reduce((v,p)=>v+Number(p.total_amount||0),0),e=s.orders.reduce((v,p)=>v+_(p),0),i=t-e,d=s.orders.length?t/s.orders.length:0,c=t>0?i/t:0;a("heroProdutos").textContent=String(s.products.length),a("heroPedidos").textContent=String(s.orders.length),a("heroReceita").textContent=u(t,s.config.moeda),a("heroLucro").textContent=u(i,s.config.moeda),a("kpiReceita").textContent=u(t,s.config.moeda),a("kpiLucro").textContent=u(i,s.config.moeda),a("kpiTicket").textContent=u(d,s.config.moeda),a("kpiMargem").textContent=`${(c*100).toFixed(1)}%`}function k(){const t=a("buscaProduto").value.trim().toLowerCase(),e=s.products.filter(i=>[i.name,i.category||"",i.sku||""].join(" ").toLowerCase().includes(t));a("productsTable").innerHTML=e.length?e.map(i=>`
    <tr>
      <td>${i.image_url?`<img class="thumb" src="${i.image_url}" alt="${l(i.name)}">`:"—"}</td>
      <td><strong>${l(i.name)}</strong><div style="color:#6b7280;font-size:12px">${l(i.sku||"")}</div></td>
      <td>${l(i.category||"")}</td>
      <td>${u(i.sale_price,s.config.moeda)}</td>
      <td>${u(i.cost,s.config.moeda)}</td>
      <td>${i.active?"Sim":"Não"}</td>
      <td>
        <div class="toolbar">
          <button class="btn small" data-role="edit-product" data-id="${i.id}">Editar</button>
          <button class="btn danger small" data-role="delete-product" data-id="${i.id}">Excluir</button>
        </div>
      </td>
    </tr>
  `).join(""):'<tr><td colspan="7">Nenhum produto cadastrado.</td></tr>'}function F(){a("schoolsTable").innerHTML=s.schools.length?s.schools.map(t=>`
    <tr>
      <td>${l(t.name)}</td>
      <td>${t.percentage.toFixed(2)}%</td>
      <td>${t.active?"Sim":"Não"}</td>
      <td><div class="toolbar"><button class="btn small" data-role="edit-school" data-id="${t.id}">Editar</button><button class="btn danger small" data-role="delete-school" data-id="${t.id}">Excluir</button></div></td>
    </tr>
  `).join(""):'<tr><td colspan="4">Nenhuma escola cadastrada.</td></tr>'}function B(){a("paymentMethodsTable").innerHTML=s.paymentMethods.length?s.paymentMethods.map(t=>`
    <tr>
      <td><strong>${l(t.name)}</strong><div style="font-size:12px;color:#6b7280">${l(t.description||"")}</div></td>
      <td>${u(t.extra_fee,s.config.moeda)}</td>
      <td>${t.active?"Sim":"Não"}</td>
      <td><div class="toolbar"><button class="btn small" data-role="edit-payment" data-id="${t.id}">Editar</button><button class="btn danger small" data-role="delete-payment" data-id="${t.id}">Excluir</button></div></td>
    </tr>
  `).join(""):'<tr><td colspan="4">Nenhuma forma de pagamento cadastrada.</td></tr>'}function I(){a("ordersTable").innerHTML=s.orders.length?s.orders.map(t=>`
    <tr>
      <td><strong>${l(t.client_name)}</strong><div style="font-size:12px;color:#6b7280">${l(t.school_name||"")}</div></td>
      <td>${l(t.phone)}<div style="font-size:12px;color:#6b7280">${l(t.email||"")}</div></td>
      <td>${l(t.order_date)}</td>
      <td>${l(t.payment_method||"")}</td>
      <td>${u(t.total_amount,s.config.moeda)}</td>
      <td><input type="checkbox" data-role="toggle-paid" data-id="${t.id}" ${t.amount_paid>=t.total_amount?"checked":""}></td>
      <td><input type="checkbox" data-role="toggle-delivered" data-id="${t.id}" ${t.delivered_at?"checked":""}></td>
      <td><button class="btn danger small" data-role="delete-order" data-id="${t.id}">Excluir</button></td>
    </tr>
  `).join(""):'<tr><td colspan="8">Nenhum pedido recebido.</td></tr>'}function R(){a("cfgLoja").value=s.config.loja,a("cfgWhatsapp").value=s.config.whatsapp,a("cfgMsg").value=s.config.mensagem,a("cfgMoeda").value=s.config.moeda,a("cfgBanner").value=s.config.banner}function L(){s.editingProductId=null,s.currentFile=null,["pNome","pCategoria","pPreco","pCusto","pTempo","pSku","pDescricao","pCampos"].forEach(t=>{a(t).value=""}),a("pActive").value="true",a("pFoto").value="",a("previewFoto").classList.add("hidden"),o("produtoStatus","Preencha os dados e clique em salvar.")}function C(){s.editingSchoolId=null,a("schoolName").value="",a("schoolPercentage").value="0",a("schoolActive").value="true",o("schoolStatus","Cadastre aqui as escolas e o percentual de repasse.")}function E(){s.editingPaymentMethodId=null,a("paymentMethodName").value="",a("paymentMethodFee").value="0",a("paymentMethodDescription").value="",a("paymentMethodActive").value="true",o("paymentMethodStatus","Cadastre aqui as formas de pagamento.")}async function r(){const t=await n.getDashboardData();s.products=t.products.map(e=>({...e,custom_fields:Array.isArray(e.custom_fields)?e.custom_fields:[]})),s.schools=t.schools,s.paymentMethods=t.paymentMethods,s.orders=t.orders,s.config=t.config,T(),k(),F(),B(),I(),R()}async function D(){var d;const t=s.editingProductId||$();o("produtoStatus","Salvando produto...","warn");let e=((d=s.products.find(c=>c.id===t))==null?void 0:d.image_url)||null;s.currentFile&&(e=await g.uploadProductImage(s.currentFile,t));const i={id:t,name:a("pNome").value.trim(),category:a("pCategoria").value.trim()||null,sale_price:Number(a("pPreco").value||0),cost:Number(a("pCusto").value||0),production_time:Number(a("pTempo").value||0),sku:a("pSku").value.trim()||null,active:a("pActive").value==="true",description:a("pDescricao").value.trim()||null,custom_fields:a("pCampos").value.split(",").map(c=>c.trim()).filter(Boolean),image_url:e};await n.invoke("save-product",i),L(),await r(),o("produtoStatus","Produto salvo com sucesso.","ok")}function j(t){const e=s.products.find(i=>i.id===t);if(e){if(s.editingProductId=e.id,a("pNome").value=e.name,a("pCategoria").value=e.category||"",a("pPreco").value=String(e.sale_price),a("pCusto").value=String(e.cost),a("pTempo").value=String(e.production_time||0),a("pSku").value=e.sku||"",a("pActive").value=String(e.active),a("pDescricao").value=e.description||"",a("pCampos").value=(e.custom_fields||[]).join(", "),e.image_url){const i=a("previewFoto");i.src=e.image_url,i.classList.remove("hidden")}h("produtos"),o("produtoStatus",`Editando: ${e.name}`,"warn")}}async function U(){const t={id:s.editingSchoolId||void 0,name:a("schoolName").value.trim(),percentage:Number(a("schoolPercentage").value||0),active:a("schoolActive").value==="true"};await n.invoke("save-school",t),C(),await r(),o("schoolStatus","Escola salva com sucesso.","ok")}function q(t){const e=s.schools.find(i=>i.id===t);e&&(s.editingSchoolId=e.id,a("schoolName").value=e.name,a("schoolPercentage").value=String(e.percentage),a("schoolActive").value=String(e.active),h("escolas"),o("schoolStatus",`Editando: ${e.name}`,"warn"))}async function O(){const t={id:s.editingPaymentMethodId||void 0,name:a("paymentMethodName").value.trim(),extra_fee:Number(a("paymentMethodFee").value||0),description:a("paymentMethodDescription").value.trim()||null,active:a("paymentMethodActive").value==="true"};await n.invoke("save-payment-method",t),E(),await r(),o("paymentMethodStatus","Forma de pagamento salva com sucesso.","ok")}function z(t){const e=s.paymentMethods.find(i=>i.id===t);e&&(s.editingPaymentMethodId=e.id,a("paymentMethodName").value=e.name,a("paymentMethodFee").value=String(e.extra_fee),a("paymentMethodDescription").value=e.description||"",a("paymentMethodActive").value=String(e.active),h("pagamentos"),o("paymentMethodStatus",`Editando: ${e.name}`,"warn"))}async function V(){const t={id:1,loja:a("cfgLoja").value.trim(),whatsapp:a("cfgWhatsapp").value.trim(),mensagem:a("cfgMsg").value.trim(),moeda:a("cfgMoeda").value.trim()||"BRL",banner:a("cfgBanner").value.trim(),updated_at:new Date().toISOString()};await n.invoke("save-store-config",t),await r(),o("configStatus","Configurações salvas com sucesso.","ok")}async function y(t,e,i){const d=s.orders.find(c=>c.id===t);d&&(await n.invoke("update-order-status",{id:t,amount_paid:e==="paid"?i?d.total_amount:0:d.amount_paid,delivered_at:e==="delivered"?i?A():null:d.delivered_at}),await r())}async function H(){try{await n.signIn(a("authEmail").value.trim(),a("authPassword").value),o("authStatus","Login realizado com sucesso.","ok"),S(),await r()}catch(t){o("authStatus",t instanceof Error?t.message:"Erro ao entrar.","error")}}async function K(){try{await n.signUp(a("authEmail").value.trim(),a("authPassword").value),o("authStatus","Conta criada. Faça login em seguida.","ok")}catch(t){o("authStatus",t instanceof Error?t.message:"Erro ao criar conta.","error")}}async function W(){const t=await n.getSession();t!=null&&t.user?(S(),await r()):P()}function G(){document.querySelectorAll("#navBar button").forEach(t=>t.addEventListener("click",()=>h(t.dataset.view||"dashboard"))),a("btnPreviewCliente").addEventListener("click",()=>window.open("/index.html","_blank")),a("btnRefresh").addEventListener("click",()=>void r()),a("btnLogout").addEventListener("click",()=>void n.signOut().then(P)),a("btnLogin").addEventListener("click",()=>void H()),a("btnSignup").addEventListener("click",()=>void K()),a("saveProdutoBtn").addEventListener("click",()=>void D()),a("resetProduto").addEventListener("click",L),a("saveSchoolBtn").addEventListener("click",()=>void U()),a("resetEscola").addEventListener("click",C),a("savePaymentMethodBtn").addEventListener("click",()=>void O()),a("resetPaymentMethod").addEventListener("click",E),a("saveConfigBtn").addEventListener("click",()=>void V()),a("buscaProduto").addEventListener("input",k),a("pFoto").addEventListener("change",t=>{var d;const e=((d=t.target.files)==null?void 0:d[0])||null;s.currentFile=e;const i=a("previewFoto");e?(i.src=URL.createObjectURL(e),i.classList.remove("hidden")):i.classList.add("hidden")}),a("refreshOrdersBtn").addEventListener("click",()=>void r()),document.addEventListener("click",async t=>{const e=t.target,i=e.dataset.role,d=e.dataset.id;!i||!d||(i==="edit-product"&&j(d),i==="edit-school"&&q(d),i==="edit-payment"&&z(d),i==="delete-product"&&(await n.invoke("delete-product",{id:d}),await r()),i==="delete-school"&&(await n.invoke("delete-school",{id:d}),await r()),i==="delete-payment"&&(await n.invoke("delete-payment-method",{id:d}),await r()),i==="delete-order"&&(await n.invoke("delete-order",{id:d}),await r()))}),document.addEventListener("change",t=>{const e=t.target,i=e.dataset.role,d=e.dataset.id;!i||!d||(i==="toggle-paid"&&y(d,"paid",e.checked),i==="toggle-delivered"&&y(d,"delivered",e.checked))})}async function J(){w(),G(),await W()}J().catch(t=>{w(),o("authStatus",t instanceof Error?t.message:"Erro ao iniciar painel.","error")});
