/* ==========================================================================
   Đạt Hiển mockup — shared header, horizontal mega-menu, footer.
   Mega-menu phân cấp: Danh mục ▸ Hãng SX ▸ Ngành hàng / Dòng thiết bị ▸ sản phẩm
   (cảm hứng alpharesources: tìm theo sản phẩm HOẶC theo hãng)
   ========================================================================== */
(function(){
  var C = window.CATALOG || {categories:[]};
  var LOGO = window.DH_LOGO || "";

  var CAT_ICON = {"Thiết bị":"🔬","Hóa chất":"⚗️","Tiêu hao":"🧪"};
  var CAT_DESC = {
    "Thiết bị":"Hệ thống phân tích & thiết bị phòng thí nghiệm",
    "Hóa chất":"Chuẩn hiệu chuẩn, CRM & hóa chất tham chiếu",
    "Tiêu hao":"Vật tư tiêu hao & phụ kiện tương thích thiết bị"
  };

  function esc(s){return (s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
  function href(p){return p}

  /* ---------- Bộ icon SVG (nét mảnh, currentColor) — thay emoji cho tông chuyên nghiệp kiểu alpharesources ---------- */
  var ICONS = {
    search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>',
    user:'<path d="M19 21v-1.5a4.5 4.5 0 0 0-4.5-4.5h-5A4.5 4.5 0 0 0 5 19.5V21"/><circle cx="12" cy="7.5" r="3.5"/>',
    cart:'<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2.5 3h2l2.3 11.1a1.6 1.6 0 0 0 1.6 1.3h8.9a1.6 1.6 0 0 0 1.6-1.25L21 6.5H6"/>',
    doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/>',
    phone:'<path d="M6.5 3h-2A1.5 1.5 0 0 0 3 4.6C3 13 11 21 19.4 21A1.5 1.5 0 0 0 21 19.5v-2a1.3 1.3 0 0 0-1.1-1.3l-3-.5a1.3 1.3 0 0 0-1.2.5l-1 1.3a13 13 0 0 1-5.7-5.7l1.3-1a1.3 1.3 0 0 0 .5-1.2l-.5-3A1.3 1.3 0 0 0 6.5 3z"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>',
    factory:'<path d="M3 21V9l6 4V9l6 4V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1"/><path d="M3 21h18V13l-6 4"/><path d="M7 21v-3M11 21v-3M15 21v-3"/>',
    microscope:'<path d="M6 20h11"/><path d="M4 22h16"/><path d="M13 20a6 6 0 0 0 0-12"/><path d="M9.5 5.2 8 8.6a2 2 0 0 0 1 2.6l1.4.6"/><path d="m11.3 4.4 2.7 1.2a1 1 0 0 1 .5 1.3l-.6 1.4a1 1 0 0 1-1.3.5l-2.7-1.2"/><path d="M8 17a5 5 0 0 1 3-9"/>',
    flask:'<path d="M9 3h6"/><path d="M10 3v6.5L5.4 17.6A2 2 0 0 0 7.1 20.7h9.8a2 2 0 0 0 1.7-3.1L14 9.5V3"/><path d="M7.5 15h9"/>',
    tube:'<path d="M8.5 2h7"/><path d="M14 2v16a2 2 0 0 1-4 0V2"/><path d="M10 12h4"/>',
    check:'<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.4 2.4L16 9.3"/>',
    fileCheck:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/><path d="m9 14 2 2 4-4"/>',
    wrench:'<path d="M14.5 6.2a3.8 3.8 0 0 0 4.8 4.8l-8.4 8.4a2 2 0 0 1-2.8-2.8z"/><path d="M18.5 5.5 15 9"/>',
    truck:'<path d="M3 6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v9H3z"/><path d="M14 8h3.6a1 1 0 0 1 .8.4l2.4 3.2a1 1 0 0 1 .2.6V15h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
    chat:'<path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l.9-4.4A8 8 0 1 1 20 12z"/>',
    shield:'<path d="M12 3 5 6v5c0 4.2 2.9 7.6 7 8.8 4.1-1.2 7-4.6 7-8.8V6z"/><path d="m9 12 2 2 4-4"/>',
    chevron:'<path d="m6 9 6 6 6-6"/>',
    card:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 9.5h18"/>',
    bank:'<path d="M4 10h16"/><path d="m12 3 8 4H4z"/><path d="M6 10v7M10 10v7M14 10v7M18 10v7"/><path d="M3 20h18"/>',
    box:'<path d="m12 3 8 4.2v9.6L12 21l-8-4.2V7.2z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/>',
    grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    tag:'<path d="M3 12V5a2 2 0 0 1 2-2h7l9 9-9 9z"/><circle cx="8" cy="8" r="1.5"/>',
    users:'<path d="M15 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20"/><circle cx="8.5" cy="7.5" r="3"/><path d="M16 4.2a3 3 0 0 1 0 5.6"/><path d="M18 14.3a4 4 0 0 1 3 3.7V20"/>',
    gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
    money:'<rect x="2.5" y="6" width="19" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v6M18 9v6"/>'
  };
  function svg(name,extraCls){
    var p = ICONS[name]; if(!p) return "";
    return '<svg class="svgi'+(extraCls?' '+extraCls:'')+'" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'+p+'</svg>';
  }
  var CAT_SVG = {"Thiết bị":"microscope","Hóa chất":"flask","Tiêu hao":"tube"};
  function catSvg(name,extraCls){ return svg(CAT_SVG[name]||"microscope",extraCls); }

  /* ---------- Ảnh sản phẩm thật (Pexels, miễn phí bản quyền) — ảnh mẫu theo danh mục ---------- */
  var IMG_POOL = {
    "Thiết bị":["assets/img/equip3.jpg","assets/img/equip5.jpg","assets/img/equip2.jpg","assets/img/equip6.jpg","assets/img/equip1.jpg","assets/img/equip4.jpg"],
    "Hóa chất":["assets/img/chem1.jpg","assets/img/chem2.jpg","assets/img/equip2.jpg"],
    "Tiêu hao":["assets/img/equip2.jpg","assets/img/chem2.jpg","assets/img/equip1.jpg"]
  };
  // gán ảnh theo từ khóa loại thiết bị (sát nội dung hơn), nếu không khớp thì luân phiên theo pool
  var IMG_KEYWORD = [
    [/hiển vi|microscop/i,"assets/img/equip5.jpg"],
    [/quang phổ|spectro|phổ|xrf|icp|oes/i,"assets/img/equip3.jpg"],
    [/sắc ký|chromato|gc|hplc/i,"assets/img/equip3.jpg"],
    [/hóa chất|reagent|dung môi|chuẩn|crm|catalyst/i,"assets/img/chem1.jpg"],
    [/áp suất|nhiệt|bể điều nhiệt|độ nhớt|viscos|đo lường/i,"assets/img/equip2.jpg"]
  ];
  function productImg(cat,idx,text){
    if(text){ for(var i=0;i<IMG_KEYWORD.length;i++){ if(IMG_KEYWORD[i][0].test(text)) return IMG_KEYWORD[i][1]; } }
    var pool = IMG_POOL[cat] || IMG_POOL["Thiết bị"];
    return pool[(idx||0) % pool.length];
  }

  /* ---------- collect all manufacturers (search-by-brand axis) ---------- */
  function allManufacturers(){
    var m = {};
    C.categories.forEach(function(cat){
      cat.manufacturers.forEach(function(man){
        if(man.name==="Khác") return;
        m[man.name] = (m[man.name]||0) + man.count;
      });
    });
    return Object.keys(m).sort().map(function(k){return {name:k,count:m[k]}});
  }

  /* ---------- build one category mega-menu ----------
     Rail trái LUÔN là Hãng sản xuất. Panel phải:
       - Vật tư tiêu hao (mọi sản phẩm có deviceBrand) → gom theo OEM "Tương thích" (2 cấp: Hãng SX ▸ OEM)
       - Thiết bị/Hóa chất → gom theo dòng thiết bị (line) như cũ. */
  function oemOf(p,m){ return p.deviceBrand || m.deviceBrand || ""; }
  function megaFor(cat){
    var mans = cat.manufacturers.filter(function(m){return m.name!=="Khác" || m.count>0;});
    // consumable-style: mọi sản phẩm trong danh mục đều có OEM tương thích
    var allP = [];
    mans.forEach(function(m){ m.lines.forEach(function(ln){ ln.products.forEach(function(p){ allP.push(oemOf(p,m)); }); }); });
    var useOEM = allP.length>0 && allP.every(Boolean);

    // left rail: Hãng sản xuất
    var left = '<div class="mm-h">Hãng sản xuất</div>';
    mans.forEach(function(m,i){
      left += '<div class="mm-man'+(i===0?' on':'')+'" data-mm="'+esc(cat.name)+'|'+i+'">'
            + '<span>'+esc(m.name)+'</span><span class="c">'+m.count+'</span></div>';
    });
    function trunc(t){ return esc(t.length>52?t.slice(0,52)+"…":t); }

    // right panels
    var right = "";
    mans.forEach(function(m,i){
      var cols = "";
      if(useOEM){
        // gom sản phẩm của hãng SX này theo OEM tương thích
        var byOem = {}, order = [];
        m.lines.forEach(function(ln){ ln.products.forEach(function(p){
          var oem = oemOf(p,m) || "Khác";
          if(!byOem[oem]){ byOem[oem]=[]; order.push(oem); }
          byOem[oem].push(p);
        }); });
        order.forEach(function(oem){
          cols += '<div class="mm-line"><div class="l-h">Tương thích: '+esc(oem)+'</div>';
          byOem[oem].slice(0,6).forEach(function(p){
            cols += '<a href="'+href("product.html")+'">'+trunc(p.model||p.deviceLine||p.name)+'</a>';
          });
          if(byOem[oem].length>6) cols += '<a href="catalog.html" style="color:var(--brand);font-weight:600">+ '+(byOem[oem].length-6)+' sản phẩm…</a>';
          cols += '</div>';
        });
      } else {
        m.lines.forEach(function(ln){
          cols += '<div class="mm-line"><div class="l-h">'+esc(ln.name)+'</div>';
          ln.products.slice(0,6).forEach(function(p){
            cols += '<a href="'+href("product.html")+'">'+trunc(p.model||p.deviceLine||p.name)+'</a>';
          });
          if(ln.products.length>6) cols += '<a href="catalog.html" style="color:var(--brand);font-weight:600">+ '+(ln.products.length-6)+' sản phẩm…</a>';
          cols += '</div>';
        });
      }
      if(!cols) cols = '<div class="muted" style="padding:20px 0">Đang cập nhật danh mục sản phẩm cho mục này.</div>';
      var tag = useOEM ? '<span class="pill teal">Vật tư tiêu hao</span>'
                       : (m.deviceBrand?'<span class="pill teal">Tương thích: '+esc(m.deviceBrand)+'</span>':'');
      right += '<div class="mm-panel" data-panel="'+esc(cat.name)+'|'+i+'" style="'+(i===0?'':'display:none')+'">'
             + '<div class="mm-title"><h4>'+esc(m.name)+'</h4>'
             + tag
             + '<span class="muted" style="font-size:12.5px">'+m.count+' sản phẩm</span></div>'
             + '<div class="mm-cols">'+cols+'</div></div>';
    });
    return '<div class="mega"><div class="mega-inner">'
         + '<div class="mm-left">'+left+'</div>'
         + '<div class="mm-right">'+right+'</div>'
         + '<div class="mm-foot"><span class="k">'+esc(cat.name)+' · '+mans.length+' hãng · '+cat.count+' sản phẩm</span>'
         + '<a class="link" style="color:var(--brand);font-weight:700" href="catalog.html">Xem toàn bộ danh mục '+esc(cat.name)+' →</a></div>'
         + '</div></div>';
  }

  /* ---------- manufacturers A-Z mega ---------- */
  function megaBrands(){
    var mans = allManufacturers();
    var grid = "";
    mans.forEach(function(m){
      grid += '<a href="catalog.html"><span>'+esc(m.name)+'</span><span class="c">'+m.count+'</span></a>';
    });
    return '<div class="mega"><div class="mega-inner" style="grid-template-columns:1fr">'
         + '<div class="mm-azgrid">'+grid+'</div>'
         + '<div class="mm-foot"><span class="k">🏭 '+mans.length+' thương hiệu quốc tế — đại diện chính hãng tại Việt Nam</span>'
         + '<a class="link" style="color:var(--brand);font-weight:700" href="catalog.html">Trang thương hiệu →</a></div>'
         + '</div></div>';
  }

  /* ---------- header markup ---------- */
  function headerHTML(cartCount,active){
    var tabs = "";
    C.categories.filter(function(cat){return cat.count>0;}).forEach(function(cat){
      tabs += '<div class="cat" data-cat="'+esc(cat.name)+'">'
            + '<a href="catalog.html">'+ catSvg(cat.name,'nav-i') +' '+esc(cat.name)+'<span class="tag">'+cat.count+'</span><span class="chev">'+svg('chevron')+'</span></a>'
            + megaFor(cat) + '</div>';
    });
    // brands tab
    tabs += '<div class="cat" data-cat="__brands"><a href="catalog.html">'+svg('factory','nav-i')+' Hãng sản xuất<span class="chev">'+svg('chevron')+'</span></a>'+megaBrands()+'</div>';
    // plain links
    tabs += '<div class="cat plain spacer"><a href="#">Giải pháp theo ngành</a></div>'
          + '<div class="cat plain"><a href="#">Hỗ trợ kỹ thuật</a></div>'
          + '<div class="cat plain"><a href="#">Tin tức</a></div>';

    return ''
    + '<div class="util"><div class="wrap">'
    + '<div class="u-left"><span>'+svg('phone','u-i')+'<b>028 6276 4010</b></span><span>'+svg('mail','u-i')+'info@dat-hien.com</span><span>'+svg('clock','u-i')+'08:00–18:00</span></div>'
    + '<div class="u-right"><span><a href="#">Tài liệu & Chứng nhận</a></span><span><a href="#">VN</a> / <a href="#">EN</a></span><span><a href="account.html">Doanh nghiệp / B2B</a></span></div>'
    + '</div></div>'
    + '<header class="site">'
    + '<div class="wrap head-main">'
    +   '<button class="nav-toggle" id="nav-toggle" aria-label="Mở danh mục" aria-controls="site-nav" aria-expanded="false"><span></span><span></span><span></span></button>'
    +   '<a class="brand" href="index.html"><img src="'+LOGO+'" alt="Đạt Hiển"/>'
    +     '<div class="b-txt"><div class="b-name">ĐẠT HIỂN</div><div class="b-sub">Scientific · Trust Partner</div></div></a>'
    +   '<div class="search" role="search"><label for="site-search" class="sr-only">Tìm sản phẩm</label>'
    +     '<input id="site-search" type="search" placeholder="Tìm thiết bị, hãng, tiêu chuẩn (ASTM, ISO, QCVN)…"/>'
    +     '<button class="s-btn" aria-label="Tìm kiếm">'+svg('search')+'</button></div>'
    +   '<div class="head-actions">'
    +     '<a class="icon-btn" href="rfq.html"><span class="ic">'+svg('doc')+'</span><span class="lbl">Yêu cầu báo giá</span></a>'
    +     '<a class="icon-btn" href="account.html"><span class="ic">'+svg('user')+'</span><span class="lbl">Tài khoản</span></a>'
    +     '<a class="icon-btn" href="cart.html" aria-label="Giỏ hàng, '+(cartCount||0)+' sản phẩm"><span class="ic badge">'+svg('cart')+'<b>'+(cartCount||0)+'</b></span><span class="lbl">Giỏ hàng</span></a>'
    +   '</div>'
    + '</div>'
    + '<div class="nav-scrim" id="nav-scrim"></div>'
    + '<nav class="cats" id="site-nav" aria-label="Danh mục sản phẩm"><div class="wrap">'+tabs+'</div></nav>'
    + '</header>';
  }

  function footerHTML(){
    return '<footer class="site">'
    + '<div class="wrap"><div class="foot-box">'
    + '<div class="cols">'
    + '<div><div class="fbrand"><img src="'+LOGO+'"/><b>ĐẠT HIỂN</b></div>'
    +   '<p class="muted" style="color:#b7c8d8">Nhà nhập khẩu & phân phối thiết bị khoa học, thiết bị phân tích và vật tư phòng thí nghiệm — đại diện chính hãng hơn 25 thương hiệu quốc tế tại Việt Nam.</p>'
    +   '<p style="margin-top:10px;display:flex;align-items:center;gap:8px;flex-wrap:wrap">'+svg('phone','u-i')+'028 6276 4010 · '+svg('mail','u-i')+'info@dat-hien.com</p></div>'
    + '<div><h5>Danh mục</h5><a href="catalog.html">Thiết bị phân tích</a><a href="catalog.html">Hóa chất & CRM</a><a href="catalog.html">Vật tư tiêu hao</a><a href="catalog.html">Theo tiêu chuẩn ASTM/ISO</a></div>'
    + '<div><h5>Khách hàng B2B</h5><a href="rfq.html">Yêu cầu báo giá (RFQ)</a><a href="account.html">Tài khoản doanh nghiệp</a><a href="#">Giá theo hợp đồng</a><a href="#">Hỗ trợ kỹ thuật & hiệu chuẩn</a></div>'
    + '<div><h5>Về Đạt Hiển</h5><a href="#">Giới thiệu</a><a href="#">Thương hiệu đối tác</a><a href="#">Tin tức</a><a href="#">Liên hệ</a></div>'
    + '</div>'
    + '<div class="bar"><span>© 2026 Công ty TNHH Đạt Hiển. Bản mẫu (mockup) phục vụ trình bày ý tưởng.</span><span>Việt Nam · Song ngữ VN/EN</span></div>'
    + '</div></div>'
    + '</footer>';
  }

  /* ---------- wire up interactions ---------- */
  function wire(){
    // mega-menu: đổi panel theo hãng (hover + focus cho bàn phím)
    document.querySelectorAll('.mm-man').forEach(function(el){
      el.setAttribute('tabindex','0');
      function activate(){
        var key = el.getAttribute('data-mm');
        var mega = el.closest('.mega');
        mega.querySelectorAll('.mm-man').forEach(function(x){x.classList.remove('on')});
        el.classList.add('on');
        mega.querySelectorAll('.mm-panel').forEach(function(p){
          p.style.display = (p.getAttribute('data-panel')===key)?'block':'none';
        });
      }
      el.addEventListener('mouseenter',activate);
      el.addEventListener('focus',activate);
    });

    // mobile nav drawer
    var toggle = document.getElementById('nav-toggle');
    var nav = document.getElementById('site-nav');
    var scrim = document.getElementById('nav-scrim');
    if(toggle && nav){
      function setOpen(open){
        nav.classList.toggle('open',open);
        scrim.classList.toggle('show',open);
        toggle.setAttribute('aria-expanded',open?'true':'false');
        toggle.setAttribute('aria-label',open?'Đóng danh mục':'Mở danh mục');
        document.body.style.overflow = open?'hidden':'';
      }
      toggle.addEventListener('click',function(){ setOpen(!nav.classList.contains('open')); });
      scrim.addEventListener('click',function(){ setOpen(false); });
      document.addEventListener('keydown',function(e){ if(e.key==='Escape') setOpen(false); });
    }
  }

  var THUMB_CLASS = {"Thiết bị":"tb-equip","Hóa chất":"tb-chem","Tiêu hao":"tb-consum"};
  function thumbClass(cat){ return THUMB_CLASS[cat] || "tb-equip"; }

  /* flatten all products for listing/home; attaches category+manufacturer+line */
  function flatProducts(){
    var out=[], counter={};
    C.categories.forEach(function(cat){
      cat.manufacturers.forEach(function(man){
        man.lines.forEach(function(ln){
          ln.products.forEach(function(p){
            var title = p.model || p.deviceLine || p.name;
            var i = counter[cat.name] = (counter[cat.name]||0);
            counter[cat.name]++;
            out.push({
              category:cat.name, manufacturer:man.name, line:ln.name,
              deviceBrand:p.deviceBrand||man.deviceBrand||"",  /* OEM tương thích: ưu tiên cấp sản phẩm */
              title:title, desc:p.name, deviceLine:p.deviceLine,
              standards:p.standards||[], icon:catSvg(cat.name),
              img:productImg(cat.name,i,(title||"")+" "+(ln.name||""))
            });
          });
        });
      });
    });
    return out;
  }

  window.DH = {
    logo: LOGO,
    catalog: C,
    allManufacturers: allManufacturers,
    flatProducts: flatProducts,
    thumbClass: thumbClass,
    icon: svg,
    catSvg: catSvg,
    productImg: productImg,
    mountShell: function(opts){
      opts = opts||{};
      var h = document.getElementById('site-header');
      if(h) h.innerHTML = headerHTML(opts.cart||3, opts.active);
      var f = document.getElementById('site-footer');
      if(f) f.innerHTML = footerHTML();
      // hydrate mọi [data-icon] trong trang thành SVG (cho HTML tĩnh)
      document.querySelectorAll('[data-icon]').forEach(function(el){
        el.innerHTML = svg(el.getAttribute('data-icon'), el.getAttribute('data-icon-cls')||'');
      });
      wire();
      var r = document.createElement('div');
      r.className='mock-ribbon';
      r.innerHTML='● <b>MOCKUP</b> — Đạt Hiển E-commerce · dữ liệu mẫu';
      document.body.appendChild(r);
    }
  };
})();
