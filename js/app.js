const SHOP = [
  ['🧢', 'Gorra', 30, 'hat'],
  ['🎩', 'Sombrero', 50, 'hat'],
  ['🎓', 'Birrete', 60, 'hat'],
  ['👑', 'Corona', 100, 'hat'],
  ['👓', 'Lentes', 25, 'face'],
  ['🕶️', 'Lentes de sol', 45, 'face'],
  ['🎀', 'Moño', 20, 'neck'],
  ['🧣', 'Bufanda', 35, 'neck']
];

const today = () => new Date().toDateString();
const yest = () => new Date(Date.now() - 864e5).toDateString();

let st = {
  photo: '',
  done: {},
  coins: 0,
  streak: 0,
  last: '',
  pet: false,
  petName: 'Chispa',
  own: [],
  wear: {},
  premium: false,
  theme: 'auto',
  day: '',
  dayLv: -1,
  userId: null
};

try {
  Object.assign(st, JSON.parse(localStorage.getItem('manitos2') || '{}'));
} catch (e) {}

if (st.day !== today()) {
  st.day = today();
  st.dayLv = -1;
}

if (st.last && st.last !== today() && st.last !== yest()) {
  st.streak = 0;
}

const save = () => {
  try {
    localStorage.setItem('manitos2', JSON.stringify(st));
  } catch (e) {}
};

const $ = id => document.getElementById(id);

let ui = { tab: 'lv', lv: null, game: null };
let resetAsk = false;

const secDone = (l, s) => st.done[l + '-' + s] || 0;
const lvCount = l => [0, 1, 2, 3].filter(s => secDone(l, s)).length;
const lvOpen = l => l === 0 || lvCount(l - 1) === 4;
const secOpen = (l, s) => s === 0 || secDone(l, s - 1);
const canToday = l => st.premium || st.dayLv < 0 || st.dayLv === l;

function theme() {
  const r = document.documentElement;
  st.theme === 'auto' ? r.removeAttribute('data-theme') : (r.dataset.theme = st.theme);
}

function toast(t) {
  const d = document.createElement('div');
  d.className = 'toast';
  d.textContent = t;
  document.body.append(d);
  setTimeout(() => d.remove(), 2600);
}

function modal(h) {
  $('modal').innerHTML = `<div class="modal"><div class="box">${h}</div></div>`;
}

const close = () => ($('modal').innerHTML = '');

function petHTML() {
  const w = st.wear;
  const g = s => (w[s] ? `<span class="a ${s}">${w[s]}</span>` : '');
  return `<div class="petbox"><span class="bob">🐥</span>${g('hat')}${g('face')}${g('neck')}</div>`;
}

function render() {
  document.body.classList.toggle('ingame', !!ui.game && ui.tab === 'lv');
  theme();
  
  $('top').innerHTML = `<span class="pill">🔥 ${st.streak}</span> <span class="pill">🪙 ${st.coins}</span> ${
    st.premium ? '<span class="pill">👑</span>' : ''
  }`;
  
  const T = [
    ['lv', 'Niveles'],
    ['pet', 'Mascota'],
    ['shop', 'Tienda'],
    ['me', 'Perfil'],
    ['cfg', 'Ajustes']
  ];
  
  $('nav').innerHTML = T.map(
    t => `<button data-a="tab" data-v="${t[0]}" class="${ui.tab === t[0] ? 'on' : ''}"><i class="nic i-${t[0]}"></i>${t[1]}</button>`
  ).join('');

  const v = {
    lv: vLevels,
    pet: vPet,
    shop: vShop,
    me: vMe,
    cfg: vCfg
  }[ui.tab]();

  $('app').innerHTML = v;
}

function vLevels() {
  if (ui.game) return vGame();

  if (ui.lv !== null) {
    const L = LV[ui.lv];
    const l = ui.lv;
    return `<button class="btn ghost" data-a="home" style="margin-top:12px;padding:8px 16px">← Niveles</button>
    <div class="hero"><h2>${L.n}</h2><p>Completa las 4 secciones para ganar 🪙25 extra</p></div>
    ${L.secs
      .map((s, i) => {
        const o = secOpen(l, i);
        const d = secDone(l, i);
        return `<div class="lv ${o ? '' : 'locked'}" style="margin:10px 0" ${
          o ? `data-a="play" data-s="${i}"` : ''
        }><div class="sec"><div class="num">${i + 1}</div><div><h3>Sección ${i + 1}</h3><small>${s
          .map(x => x.w)
          .join(' · ')}</small></div><div style="margin-left:auto;font-size:18px">${
          d ? '⭐'.repeat(d) : ''
        }</div></div></div>`;
      })
      .join('')}`;
  }

  return `<div class="hero"><h2>¡A jugar y aprender!</h2><p>${
    st.premium
      ? 'Premium: juega todos los niveles que quieras ✨'
      : 'Gratis: 1 nivel por día. ¡Elige bien!'
  }</p></div>
  <div class="grid">${LV.map((L, i) => {
    const o = lvOpen(i);
    const c = lvCount(i);
    return `<div class="lv ${o ? '' : 'locked'}" ${
      o ? `data-a="open" data-l="${i}"` : ''
    }><div class="lnum">${i + 1}</div><h3>${L.n}</h3><small>${
      o ? c + '/4 secciones' : 'Bloqueado'
    }</small><div class="bar"><i style="width:${c * 25}%"></i></div></div>`;
  }).join('')}</div>`;
}

function vPet() {
  if (!st.pet) {
    return `<div class="hero"><div class="petbox"><span>🥚</span></div><h2>Tu mascota está por nacer</h2><p>Juega 3 días seguidos para que eclosione.</p><div class="pill">🔥 ${st.streak} / 3 días</div></div>`;
  }

  const hoy = st.last === today();
  return `<div class="hero">${petHTML()}<h2>${st.petName}</h2><p>${
    hoy ? '¡Está feliz porque jugaste hoy! 💛' : 'Te extraña… ¡juega hoy para mantener la racha!'
  }</p><div class="pill">🔥 Racha: ${st.streak} días</div></div>
  ${
    ['hat', 'face', 'neck']
      .map(s => {
        const o = SHOP.filter(i => i[3] === s && st.own.includes(i[0]));
        return o.length
          ? `<div class="row"><b>${ { hat: 'Cabeza', face: 'Cara', neck: 'Cuello' }[s] }</b><span>${o
              .map(
                i =>
                  `<button class="btn ${
                    st.wear[s] === i[0] ? 'blue' : 'ghost'
                  }" style="padding:6px 12px;font-size:22px" data-a="wear" data-e="${i[0]}" data-s="${s}">${i[0]}</button>`
              )
              .join(' ')}</span></div>`
          : '';
      })
      .join('') || '<p class="note" style="text-align:center">Compra ropita en la tienda 🛍️</p>'
  }`;
}

function vShop() {
  return `<div class="hero"><h2>Tienda</h2><p>Tienes 🪙 ${st.coins}. Gana monedas completando secciones y niveles.</p>${
    st.pet ? '' : '<p class="note">Tu mascota nace tras 3 días de racha.</p>'
  }</div>
  <div class="grid">${SHOP.map(i => {
    const h = st.own.includes(i[0]);
    return `<div class="lv shop"><div class="e">${i[0]}</div><h3>${i[1]}</h3><button class="btn ${ h ? 'ghost' : '' }" style="margin-top:8px;padding:8px 14px" ${
      h ? 'disabled' : `data-a="buy" data-e="${i[0]}"`
    }>${h ? 'Tuyo ✓' : '🪙 ' + i[2]}</button></div>`;
  }).join('')}</div>`;
}

function vMe() {
  const stars = Object.values(st.done).reduce((a, b) => a + b, 0);
  const lv = LV.filter((_, i) => lvCount(i) === 4).length;

  return `<div class="hero"><div class="avatar">${
    st.photo ? `<img src="${st.photo}" alt="Mi foto">` : '<i class="nic i-me"></i>'
  }</div><h2>Mi perfil</h2>
  <div class="row" style="justify-content:center"><label class="btn blue" style="padding:8px 16px;font-size:15px;cursor:pointer">${
    st.photo ? 'Cambiar foto' : 'Agregar foto'
  }<input type="file" accept="image/*" id="ph" hidden></label>${
    st.photo
      ? '<button class="btn ghost" style="padding:8px 16px;font-size:15px" data-a="rmphoto">Quitar</button>'
      : ''
  }</div></div>
  <div class="grid" style="grid-template-columns:repeat(2,1fr)">
    <div class="stat"><b>🔥 ${st.streak}</b>racha</div>
    <div class="stat"><b>⭐ ${stars}</b>estrellas</div>
    <div class="stat"><b>🏆 ${lv}/${LV.length}</b>niveles</div>
    <div class="stat"><b>🪙 ${st.coins}</b>monedas</div>
  </div>
  <div class="lv" style="margin-top:14px;text-align:left">
    <h3>Guarda tu progreso</h3>
    <p class="note">Inicia sesión para no perder tu avance y usarlo en otros dispositivos.</p>
    <input class="inp" type="email" placeholder="Correo electrónico" id="em">
    <input class="inp" type="password" placeholder="Contraseña" id="pw">
    <div class="row">
      <button class="btn" data-a="login">Iniciar sesión</button>
      <button class="btn ghost" data-a="login">Crear cuenta</button>
    </div>
  </div>`;
}

function vCfg() {
  return `<div class="hero"><h2>Ajustes</h2></div>
  <div class="lv" style="text-align:left">
    <div class="row"><b>Tema</b><span>${[
      ['auto', '🌗 Auto'],
      ['light', '☀️️ Claro'],
      ['dark', '🌙 Oscuro']
    ]
      .map(
        t =>
          `<button class="btn ${
            st.theme === t[0] ? 'blue' : 'ghost'
          }" style="padding:6px 12px" data-a="theme" data-v="${t[0]}">${t[1]}</button>`
      )
      .join(' ')}</span></div>
    <div class="row"><b>Plan</b><span>${
      st.premium ? '👑 Premium' : 'Gratis'
    }</span><button class="btn" style="padding:6px 14px" data-a="prem">${
    st.premium ? 'Ver plan' : 'Mejorar'
  }</button></div>
    ${
      st.pet
        ? `<div class="row"><b>Nombre de mascota</b><input class="inp" style="width:140px" id="pn" value="${st.petName}" maxlength="12"></div>`
        : ''
    }
    <div class="row"><b>Reiniciar progreso</b><button class="btn ghost" style="padding:6px 14px" data-a="reset">${
      resetAsk ? '¿Seguro? Toca otra vez' : 'Borrar todo'
    }</button></div>
  </div>
  <p class="note" style="text-align:center">EnSeñas v0.4 · Lengua de Señas Mexicana<br>Fotos de señas: Diccionario de Lengua de Señas Mexicana (Manos con Voz)</p>`;
}

function paywall(msg) {
  modal(`<div class="big">👑</div><h2>EnSeñas Premium</h2><p>${
    msg || 'Juega todos los niveles que quieras, cada día.'
  }</p>
  <div class="plan"><div><b>Mensual</b></div><b>$59 MXN</b></div>
  <div class="plan best"><div><b>Anual ⭐</b><br><small>Ahorra 40%</small></div><b>$429 MXN</b></div>
  <button class="btn" data-a="buy-prem">Probar Premium (demo)</button> 
  <button class="btn ghost" data-a="close" style="margin-top:8px">Ahora no</button>
  <p class="note">Demo: aquí iría la pasarela de pago.</p>`);
}

// ---- Juego
let first = null,
  lock = false,
  moves = 0,
  found = 0,
  total = 0;

function vGame() {
  return `<div class="row" style="margin-top:12px">
    <button class="btn ghost" data-a="quit" style="padding:8px 16px">← Salir</button>
    <h3>Sección ${ui.game.s + 1}</h3>
    <span class="pill">🐾 <span id="mv">0</span></span>
  </div>
  <div class="board ${ui.game.cards.length > 12 ? 'cols4' : ''}" id="board">
    ${ui.game.cards
      .map(
        c => `<button class="c" data-k="${c.k}" data-a="flip">
        <div class="in">
          <div class="ba">🤚</div>
          <div class="fa">${
            c.t === 's'
              ? `<img class="ph" alt="seña" src="assets/signs/${c.p.f}.jpg">`
              : `<span>${c.p.w}</span>`
          }</div>
        </div>
      </button>`
      )
      .join('')}
  </div>
  <p class="note" style="text-align:center">Une cada seña con su palabra 👋</p>`;
}

function play(s) {
  const l = ui.lv;
  if (!canToday(l)) {
    return paywall(
      'Hoy ya jugaste tu nivel gratis. ¡Vuelve mañana o hazte Premium para jugar sin límite!'
    );
  }

  if (st.dayLv < 0 && !st.premium) st.dayLv = l;

  if (st.last !== today()) {
    st.streak = st.last === yest() ? st.streak + 1 : 1;
    st.last = today();
    if (st.streak >= 3 && !st.pet) {
      st.pet = true;
      setTimeout(
        () =>
          modal(
            `<div class="big">🐥</div><h2>¡Nació tu mascota!</h2><p>3 días seguidos jugando. Cuídala y vístela en la tienda.</p><button class="btn" data-a="close">¡Yupi!</button>`
          ),
        400
      );
    }
  }
  save();

  const cards = LV[l].secs[s]
    .flatMap((p, k) => [
      { k, t: 's', p },
      { k, t: 'w', p }
    ])
    .sort(() => Math.random() - 0.5);

  total = LV[l].secs[s].length;
  moves = 0;
  found = 0;
  first = null;
  lock = false;

  ui.game = { s, cards };
  render();
}

function flip(b) {
  if (lock || b.classList.contains('f') || b.classList.contains('m')) return;

  b.classList.add('f');
  if (!first) {
    first = b;
    return;
  }

  moves++;
  $('mv').textContent = moves;
  lock = true;
  const a = first;
  first = null;
  const ok = a.dataset.k === b.dataset.k;

  setTimeout(
    () => {
      if (ok) {
        a.classList.add('m');
        b.classList.add('m');
        if (++found === total) win();
      }
      a.classList.remove('f');
      b.classList.remove('f');
      lock = false;
    },
    ok ? 500 : 900
  );
}

async function win() {
  const l = ui.lv,
    s = ui.game.s,
    stars = moves <= total + 2 ? 3 : moves <= total * 2 ? 2 : 1;

  let coins = secDone(l, s) ? 0 : 5;
  st.done[l + '-' + s] = Math.max(secDone(l, s), stars);

  const lvDone = lvCount(l) === 4 && !st['b' + l];
  if (lvDone) {
    st['b' + l] = 1;
    coins += 25;
  }

  st.coins += coins;
  save();

  // Guardar victoria en Backend si hay usuario logueado
  if (st.userId) {
    try {
      await fetch('https://ensenas-app.onrender.com/api/users/save-win', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: st.userId,
          levelIdx: l,
          sectionIdx: s,
          stars: stars,
          coinsEarned: st.coins,
          newStreak: st.streak,
          lastDay: st.last
        })
      });
    } catch (e) {
      console.warn('No se pudo guardar la victoria en MySQL');
    }
  }

  setTimeout(() => {
    modal(
      `<div class="big">${lvDone ? '🏆' : '🎉'}</div><h2>${
        lvDone ? '¡Nivel completado!' : '¡Muy bien!'
      }</h2><div style="font-size:32px">${'⭐'.repeat(stars)}</div><p>${moves} intentos${
        coins ? ` · +🪙 ${coins}` : ''
      }</p>
      <div style="display:grid;gap:10px;margin-top:10px">
        ${s < 3 ? '<button class="btn blue" data-a="nextsec">Siguiente sección →</button>' : ''}
        <button class="btn ghost" data-a="again">Repetir</button>
        <button class="btn ghost" data-a="quit">Volver</button>
      </div>`
    );
    render();
  }, 700);
}

// Cargar lecciones dinámicamente desde el Backend
async function cargarLeccionesBackend() {
  try {
    const res = await fetch('https://ensenas-app.onrender.com/api/levels');
    if (res.ok) {
      const data = await res.json();
      if (data && data.length > 0) {
        window.LV = data;
        render();
        console.log('✅ Lecciones cargadas desde MySQL');
      }
    }
  } catch (error) {
    console.warn('⚠️ Usando datos de data.js local');
  }
}

// Manejo de Eventos Click
document.addEventListener('click', async e => {
  const t = e.target.closest('[data-a]');
  if (!t) return;
  const a = t.dataset.a,
    d = t.dataset;

  if (a === 'tab') {
    ui.tab = d.v;
    ui.game = null;
    render();
  } else if (a === 'open') {
    ui.lv = +d.l;
    render();
  } else if (a === 'home') {
    ui.lv = null;
    render();
  } else if (a === 'play') {
    play(+d.s);
  } else if (a === 'flip') {
    flip(t);
  } else if (a === 'quit') {
    close();
    ui.game = null;
    render();
  } else if (a === 'again') {
    close();
    play(ui.game.s);
  } else if (a === 'nextsec') {
    close();
    play(ui.game.s + 1);
  } else if (a === 'close') {
    close();
  } else if (a === 'buy') {
    const i = SHOP.find(x => x[0] === d.e);
    if (st.coins < i[2]) return toast('Te faltan monedas 🪙 ¡Sigue jugando!');
    st.coins -= i[2];
    st.own.push(i[0]);
    st.wear[i[3]] = i[0];
    save();
    toast(st.pet ? '¡Tu mascota lo estrena!' : '¡Comprado!');
    render();
  } else if (a === 'wear') {
    st.wear[d.s] = st.wear[d.s] === d.e ? null : d.e;
    save();
    render();
  } else if (a === 'rmphoto') {
    st.photo = '';
    save();
    render();
  } else if (a === 'login') {
    const emailInp = $('em') ?$('em').value : '';
    if (!emailInp) return toast('Ingresa un correo electrónico');

    try {
      const res = await fetch('https://ensenas-app.onrender.com/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailInp, username: emailInp.split('@')[0] })
      });
      const data = await res.json();

      if (data.user) {
        st.userId = data.user.id;
        st.coins = data.user.coins;
        st.streak = data.user.streak;
        if (data.done) st.done = data.done;
        save();
        toast(`¡Bienvenido, ${data.user.username}!`);
        render();
      }
    } catch (err) {
      toast('Error al conectar con el servidor');
    }
  } else if (a === 'theme') {
    st.theme = d.v;
    save();
    render();
  } else if (a === 'prem') {
    st.premium ? toast('Ya eres Premium 👑') : paywall();
  } else if (a === 'buy-prem') {
    st.premium = true;
    save();
    close();
    render();
  } else if (a === 'reset') {
    if (!resetAsk) {
      resetAsk = true;
      render();
      return;
    }
    localStorage.removeItem('manitos2');
    location.reload();
  }
});

document.addEventListener('change', e => {
  if (e.target.id !== 'ph' || !e.target.files[0]) return;
  const fr = new FileReader();
  fr.onload = () => {
    const im = new Image();
    im.onload = () => {
      const c = document.createElement('canvas'),
        n = 240,
        m = Math.min(im.width, im.height);
      c.width = c.height = n;
      c.getContext('2d').drawImage(im, (im.width - m) / 2, (im.height - m) / 2, m, m, 0, 0, n, n);
      st.photo = c.toDataURL('image/jpeg', 0.85);
      save();
      render();
      toast('¡Foto guardada!');
    };
    im.onerror = () => toast('No se pudo leer esa imagen');
    im.src = fr.result;
  };
  fr.readAsDataURL(e.target.files[0]);
});

document.addEventListener('input', e => {
  if (e.target.id === 'pn') {
    st.petName = e.target.value || 'Chispa';
    save();
  }
});

cargarLeccionesBackend();
render();