/* Shared game menu: a bar with ☰ at the top of each game page; the button
   opens a side panel listing the games. A page includes it with
     <script src="../menu.js" data-game="lines98"></script>
   placed first in <body>. The page's colour tokens (--panel, --line, --text,
   --muted, --accent, --bg) are used, so it follows the page's theme.
   To add a game: one entry in GAMES. */
(function(){
    'use strict';
    const GAMES = [
        {id: 'lines98', name: 'Lines 98', desc: 'Xếp 5 bi cùng màu thành hàng'},
        {id: 'sudoku', name: 'Sudoku', desc: 'Điền số 1–9, mỗi hàng, cột, ô 3×3 một lần'}
    ];
    const me = document.currentScript;
    const base = new URL('./', me.src);                    // the site root (where menu.js is)
    const current = me.dataset.game || '';
    const game = GAMES.find(g => g.id === current);

    const css = `
.gm-bar{ display:flex; align-items:center; gap:10px; max-width:480px; margin:0 auto 10px; }
.gm-btn{ flex:none; width:40px; height:40px; display:inline-flex; align-items:center; justify-content:center; padding:0;
         font:inherit; color:var(--text); background:var(--panel); border:1px solid var(--line); border-radius:10px; cursor:pointer; }
.gm-btn:hover{ border-color:var(--muted); }
.gm-title{ font-size:18px; font-weight:700; color:var(--text); }
.gm-shade{ position:fixed; inset:0; background:rgba(0,0,0,.45); z-index:50; opacity:0; transition:opacity .2s; }
.gm-shade.on{ opacity:1; }
.gm-panel{ position:fixed; top:0; left:0; bottom:0; width:min(280px,82vw); background:var(--panel); color:var(--text); z-index:51;
           box-shadow:4px 0 24px rgba(0,0,0,.35); transform:translateX(-102%); transition:transform .22s ease; display:flex; flex-direction:column;
           padding:14px 12px calc(14px + env(safe-area-inset-bottom)); }
.gm-panel.on{ transform:none; }
.gm-panel[hidden], .gm-shade[hidden]{ display:none; }
.gm-head{ display:flex; align-items:center; justify-content:space-between; margin:0 4px 12px; }
.gm-head b{ font-size:16px; }
.gm-panel a{ display:block; padding:11px 12px; border-radius:10px; color:inherit; text-decoration:none; border:1px solid transparent; margin-bottom:6px; }
.gm-panel a:hover{ background:var(--bg); }
.gm-panel a.cur{ border-color:var(--accent); background:var(--bg); }
.gm-panel a b{ display:block; font-size:15px; }
.gm-panel a span{ display:block; font-size:12px; color:var(--muted); margin-top:2px; }
.gm-home{ margin-top:auto; font-size:13px; }
@media (prefers-reduced-motion: reduce){ .gm-shade, .gm-panel{ transition:none; } }`;
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    const icon = (d) => '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="' + d + '"/></svg>';
    const bar = document.createElement('div');
    bar.className = 'gm-bar';
    bar.innerHTML = '<button class="gm-btn" type="button" aria-label="Chọn trò chơi" aria-expanded="false" aria-controls="gmPanel">'
        + icon('M4 6h16M4 12h16M4 18h16') + '</button><span class="gm-title"></span>';
    bar.querySelector('.gm-title').textContent = game ? game.name : 'Web Games';
    me.after(bar);

    const shade = document.createElement('div');
    shade.className = 'gm-shade';
    shade.hidden = true;
    const panel = document.createElement('nav');
    panel.className = 'gm-panel';
    panel.id = 'gmPanel';
    panel.hidden = true;
    panel.setAttribute('aria-label', 'Trò chơi');
    panel.innerHTML = '<div class="gm-head"><b>Trò chơi</b><button class="gm-btn" type="button" aria-label="Đóng">' + icon('M6 6l12 12M18 6L6 18') + '</button></div>';
    GAMES.forEach(g => {
        const a = document.createElement('a');
        a.href = new URL(g.id + '/', base).href;
        if(g.id === current){ a.className = 'cur'; a.setAttribute('aria-current', 'page'); }
        a.innerHTML = '<b></b><span></span>';
        a.querySelector('b').textContent = g.name;
        a.querySelector('span').textContent = g.desc;
        panel.appendChild(a);
    });
    const home = document.createElement('a');
    home.className = 'gm-home';
    home.href = base.href;
    home.textContent = 'Tất cả trò chơi';
    panel.appendChild(home);
    document.body.append(shade, panel);

    const btn = bar.querySelector('.gm-btn');
    let open = false;
    function set(on){
        if(on === open) return;
        open = on;
        btn.setAttribute('aria-expanded', String(on));
        if(on){
            shade.hidden = panel.hidden = false;
            requestAnimationFrame(() => { shade.classList.add('on'); panel.classList.add('on'); });
            (panel.querySelector('a.cur') || panel.querySelector('a')).focus();
        }else{
            shade.classList.remove('on'); panel.classList.remove('on');
            setTimeout(() => { if(!open) shade.hidden = panel.hidden = true; }, 230);
            btn.focus();
        }
    }
    btn.addEventListener('click', () => set(true));
    panel.querySelector('.gm-head .gm-btn').addEventListener('click', () => set(false));
    shade.addEventListener('click', () => set(false));
    document.addEventListener('keydown', e => {
        if(open && e.key === 'Escape'){ e.stopImmediatePropagation(); set(false); }
    }, true);
    window.gameMenuOpen = () => open;                    // games ignore their keys while it is open
})();
