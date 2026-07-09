const LOCAL_BEEP_DATA_URI = "data:audio/wav;base64,UklGRsQPAABXQVZFZm10IBAAAAABAAEAQB8AAIA+AAACABAAZGF0YaAPAAAAAPgDeAcWCoILkwtECr8HUAReAGH80vgc9pH0YPSP9fv3WftE/0QD4waxCVkLqguaCkkI/QQaARb9avmF9sD0TvQ/9Xb3r/qJ/o4CRwZCCSULtgvlCsoIpQXVAc79Cfr59vr0SPT69Pn2CfrO/dUBpQXKCOUKtgslC0IJRwaOAon+r/p29z/1TvTA9IX2avkW/RoB/QRJCJoKqgtZC7EJ4wZEA0T/Wfv794/1YPSR9Bz20vhh/F4AUAS/B0QKkwuCCxYKeAf4AwAACPyI+Or1fvRt9Lz1Qfiw+6L/nwMuB+QJbwugC3EKBQinBLwAvPwd+U/2p/RW9Gb1t/cD++b+6gKWBnsJQAuyC8EKighRBXcBcv25+b722/RK9Bv1Nvdb+iv+MgL3BQcJBgu4CwYLBwn3BTICK/5b+jb3G/VK9Nv0vva5+XL9dwFRBYoIwQqyC0ALewmWBuoC5v4D+7f3ZvVW9Kf0T/Yd+bz8vACnBAUIcQqgC28L5AkuB58Dov+w+0H4vPVt9H706vWI+Aj8AAD4A3gHFgqCC5MLRAq/B1AEXgBh/NL4HPaR9GD0j/X791n7RP9EA+MGsQlZC6oLmgpJCP0EGgEW/Wr5hfbA9E70P/V296/6if6OAkcGQgklC7YL5QrKCKUF1QHO/Qn6+fb69Ej0+vT59gn6zv3VAaUFygjlCrYLJQtCCUcGjgKJ/q/6dvc/9U70wPSF9mr5Fv0aAf0ESQiaCqoLWQuxCeMGRANE/1n7+/eP9WD0kfQc9tL4YfxeAFAEvwdECpMLggsWCngH+AMAAAj8iPjq9X70bfS89UH4sPui/58DLgfkCW8LoAtxCgUIpwS8ALz8HflP9qf0VvRm9bf3A/vm/uoClgZ7CUALsgvBCooIUQV3AXL9ufm+9tv0SvQb9Tb3W/or/jIC9wUHCQYLuAsGCwcJ9wUyAiv+W/o29xv1SvTb9L72ufly/XcBUQWKCMEKsgtAC3sJlgbqAub+A/u392b1VvSn9E/2Hfm8/LwApwQFCHEKoAtvC+QJLgefA6L/sPtB+Lz1bfR+9Or1iPgI/AAA+AN4BxYKgguTC0QKvwdQBF4AYfzS+Bz2kfRg9I/1+/dZ+0T/RAPjBrEJWQuqC5oKSQj9BBoBFv1q+YX2wPRO9D/1dvev+on+jgJHBkIJJQu2C+UKygilBdUBzv0J+vn2+vRI9Pr0+fYJ+s791QGlBcoI5Qq2CyULQglHBo4Cif6v+nb3P/VO9MD0hfZq+Rb9GgH9BEkImgqqC1kLsQnjBkQDRP9Z+/v3j/Vg9JH0HPbS+GH8XgBQBL8HRAqTC4ILFgp4B/gDAAAI/Ij46vV+9G30vPVB+LD7ov+fAy4H5AlvC6ALcQoFCKcEvAC8/B35T/an9Fb0ZvW39wP75v7qApYGewlAC7ILwQqKCFEFdwFy/bn5vvbb9Er0G/U291v6K/4yAvcFBwkGC7gLBgsHCfcFMgIr/lv6Nvcb9Ur02/S+9rn5cv13AVEFigjBCrILQAt7CZYG6gLm/gP7t/dm9Vb0p/RP9h35vPy8AKcEBQhxCqALbwvkCS4HnwOi/7D7Qfi89W30fvTq9Yj4CPwAAPgDeAcWCoILkwtECr8HUAReAGH80vgc9pH0YPSP9fv3WftE/0QD4waxCVkLqguaCkkI/QQaARb9avmF9sD0TvQ/9Xb3r/qJ/o4CRwZCCSULtgvlCsoIpQXVAc79Cfr59vr0SPT69Pn2CfrO/dUBpQXKCOUKtgslC0IJRwaOAon+r/p29z/1TvTA9IX2avkW/RoB/QRJCJoKqgtZC7EJ4wZEA0T/Wfv794/1YPSR9Bz20vhh/F4AUAS/B0QKkwuCCxYKeAf4AwAACPyI+Or1fvRt9Lz1Qfiw+6L/nwMuB+QJbwugC3EKBQinBLwAvPwd+U/2p/RW9Gb1t/cD++b+6gKWBnsJQAuyC8EKighRBXcBcv25+b722/RK9Bv1Nvdb+iv+MgL3BQcJBgu4CwYLBwn3BTICK/5b+jb3G/VK9Nv0vva5+XL9dwFRBYoIwQqyC0ALewmWBuoC5v4D+7f3ZvVW9Kf0T/Yd+bz8vACnBAUIcQqgC28L5AkuB58Dov+w+0H4vPVt9H706vWI+Aj8AAD4A3gHFgqCC5MLRAq/B1AEXgBh/NL4HPaR9GD0j/X791n7RP9EA+MGsQlZC6oLmgpJCP0EGgEW/Wr5hfbA9E70P/V296/6if6OAkcGQgklC7YL5QrKCKUF1QHO/Qn6+fb69Ej0+vT59gn6zv3VAaUFygjlCrYLJQtCCUcGjgKJ/q/6dvc/9U70wPSF9mr5Fv0aAf0ESQiaCqoLWQuxCeMGRANE/1n7+/eP9WD0kfQc9tL4YfxeAFAEvwdECpMLggsWCngH+AMAAAj8iPjq9X70bfS89UH4sPui/58DLgfkCW8LoAtxCgUIpwS8ALz8HflP9qf0VvRm9bf3A/vm/uoClgZ7CUALsgvBCooIUQV3AXL9ufm+9tv0SvQb9Tb3W/or/jIC9wUHCQYLuAsGCwcJ9wUyAiv+W/o29xv1SvTb9L72ufly/XcBUQWKCMEKsgtAC3sJlgbqAub+A/u392b1VvSn9E/2Hfm8/LwApwQFCHEKoAtvC+QJLgefA6L/sPtB+Lz1bfR+9Or1iPgI/AAA+AN4BxYKgguTC0QKvwdQBF4AYfzS+Bz2kfRg9I/1+/dZ+0T/RAPjBrEJWQuqC5oKSQj9BBoBFv1q+YX2wPRO9D/1dvev+on+jgJHBkIJJQu2C+UKygilBdUBzv0J+vn2+vRI9Pr0+fYJ+s791QGlBcoI5Qq2CyULQglHBo4Cif6v+nb3P/VO9MD0hfZq+Rb9GgH9BEkImgqqC1kLsQnjBkQDRP9Z+/v3j/Vg9JH0HPbS+GH8XgBQBL8HRAqTC4ILFgp4B/gDAAAI/Ij46vV+9G30vPVB+LD7ov+fAy4H5AlvC6ALcQoFCKcEvAC8/B35T/an9Fb0ZvW39wP75v7qApYGewlAC7ILwQqKCFEFdwFy/bn5vvbb9Er0G/U291v6K/4yAvcFBwkGC7gLBgsHCfcFMgIr/lv6Nvcb9Ur02/S+9rn5cv13AVEFigjBCrILQAt7CZYG6gLm/gP7t/dm9Vb0p/RP9h35vPy8AKcEBQhxCqALbwvkCS4HnwOi/7D7Qfi89W30fvTq9Yj4CPwAAPgDeAcWCoILkwtECr8HUAReAGH80vgc9pH0YPSP9fv3WftE/0QD4waxCVkLqguaCkkI/QQaARb9avmF9sD0TvQ/9Xb3r/qJ/o4CRwZCCSULtgvlCsoIpQXVAc79Cfr59vr0SPT69Pn2CfrO/dUBpQXKCOUKtgslC0IJRwaOAon+r/p29z/1TvTA9IX2avkW/RoB/QRJCJoKqgtZC7EJ4wZEA0T/Wfv794/1YPSR9Bz20vhh/F4AUAS/B0QKkwuCCxYKeAf4AwAACPyI+Or1fvRt9Lz1Qfiw+6L/nwMuB+QJbwugC3EKBQinBLwAvPwd+U/2p/RW9Gb1t/cD++b+6gKWBnsJQAuyC8EKighRBXcBcv25+b722/RK9Bv1Nvdb+iv+MgL3BQcJBgu4CwYLBwn3BTICK/5b+jb3G/VK9Nv0vva5+XL9dwFRBYoIwQqyC0ALewmWBuoC5v4D+7f3ZvVW9Kf0T/Yd+bz8vACnBAUIcQqgC28L5AkuB58Dov+w+0H4vPVt9H706vWI+Aj8AAD4A3gHFgqCC5MLRAq/B1AEXgBh/NL4HPaR9GD0j/X791n7RP9EA+MGsQlZC6oLmgpJCP0EGgEW/Wr5hfbA9E70P/V296/6if6OAkcGQgklC7YL5QrKCKUF1QHO/Qn6+fb69Ej0+vT59gn6zv3VAaUFygjlCrYLJQtCCUcGjgKJ/q/6dvc/9U70wPSF9mr5Fv0aAf0ESQiaCqoLWQuxCeMGRANE/1n7+/eP9WD0kfQc9tL4YfxeAFAEvwdECpMLggsWCngH+AMAAAj8iPjq9X70bfS89UH4sPui/58DLgfkCW8LoAtxCgUIpwS8ALz8HflP9qf0VvRm9bf3A/vm/uoClgZ7CUALsgvBCooIUQV3AXL9ufm+9tv0SvQb9Tb3W/or/jIC9wUHCQYLuAsGCwcJ9wUyAiv+W/o29xv1SvTb9L72ufly/XcBUQWKCMEKsgtAC3sJlgbqAub+A/u392b1VvSn9E/2Hfm8/LwApwQFCHEKoAtvC+QJLgefA6L/sPtB+Lz1bfR+9Or1iPgI/AAA+AN4BxYKgguTC0QKvwdQBF4AYfzS+Bz2kfRg9I/1+/dZ+0T/RAPjBrEJWQuqC5oKSQj9BBoBFv1q+YX2wPRO9D/1dvev+on+jgJHBkIJJQu2C+UKygilBdUBzv0J+vn2+vRI9Pr0+fYJ+s791QGlBcoI5Qq2CyULQglHBo4Cif6v+nb3P/VO9MD0hfZq+Rb9GgH9BEkImgqqC1kLsQnjBkQDRP9Z+/v3j/Vg9JH0HPbS+GH8XgBQBL8HRAqTC4ILFgp4B/gDAAAI/Ij46vV+9G30vPVB+LD7ov+fAy4H5AlvC6ALcQoFCKcEvAC8/B35T/an9Fb0ZvW39wP75v7qApYGewlAC7ILwQqKCFEFdwFy/bn5vvbb9Er0G/U291v6K/4yAvcFBwkGC7gLBgsHCfcFMgIr/lv6Nvcb9Ur02/S+9rn5cv13AVEFigjBCrILQAt7CZYG6gLm/gP7t/dm9Vb0p/RP9h35vPy8AKcEBQhxCqALbwvkCS4HnwOi/7D7Qfi89W30fvTq9Yj4CPwAAPgDeAcWCoILkwtECr8HUAReAGH80vgc9pH0YPSP9fv3WftE/0QD4waxCVkLqguaCkkI/QQaARb9avmF9sD0TvQ/9Xb3r/qJ/o4CRwZCCSULtgvlCsoIpQXVAc79Cfr59vr0SPT69Pn2CfrO/dUBpQXKCOUKtgslC0IJRwaOAon+r/p29z/1TvTA9IX2avkW/RoB/QRJCJoKqgtZC7EJ4wZEA0T/Wfv794/1YPSR9Bz20vhh/F4AUAS/B0QKkwuCCxYKeAf4AwAACPyI+Or1fvRt9Lz1Qfiw+6L/nwMuB+QJbwugC3EKBQinBLwAvPwd+U/2p/RW9Gb1t/cD++b+6gKWBnsJQAuyC8EKighRBXcBcv25+b722/RK9Bv1Nvdb+iv+MgL3BQcJBgu4CwYLBwn3BTICK/5b+jb3G/VK9Nv0vva5+XL9dwFRBYoIwQqyC0ALewmWBuoC5v4D+7f3ZvVW9Kf0T/Yd+bz8vACnBAUIcQqgC28L5AkuB58Dov+w+0H4vPVt9H706vWI+Aj8";
/* =========================================================
   Anki Sensei — Web App para Meta Ray-Ban Display
   Entrada: Neural Band / touch strip -> ArrowUp/Down/Left/Right + Enter
   Salida: pantalla aditiva 600x600 + bocinas (TTS japonés)
   ========================================================= */

// ---------- Config de mazos ----------
const DECKS = [
  { key: 'core23k',    label: 'Core 2.3k · Vocabulario' },
  { key: 'heisig',     label: 'Kanji para Recordar (Heisig)' },
  { key: 'radicales',  label: 'Kanjis Radicales' },
  { key: 'verbos',     label: 'Verbos Japoneses' },
  { key: 'minna',      label: 'Minna no Nihongo I', hasSub: true },
];

const NEW_CARDS_PER_SESSION = 15;
const STORAGE_PREFIX = 'ankisensei:';

// ---------- Estado ----------
let state = {
  screen: 'menu',
  deckKey: null,     // e.g. 'core23k' or 'minna:Tema01'
  deckTitle: '',
  queue: [],          // array of {idx, card}
  pos: 0,
  revealed: false,
  sessionDone: 0,
};

// ============================================================
// SRS — algoritmo estilo SM-2 (igual filosofía que Anki)
// ============================================================
function loadDeckState(deckKey) {
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + deckKey);
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function saveDeckState(deckKey, st) {
  try {
    localStorage.setItem(STORAGE_PREFIX + deckKey, JSON.stringify(st));
  } catch (e) { /* storage full or unavailable — fail silently */ }
}

function getCardState(deckState, idx) {
  return deckState[idx] || { ease: 2.5, interval: 0, reps: 0, due: 0 };
}

// grade: 1=Otra vez 2=Difícil 3=Bien 4=Fácil
function schedule(cardState, grade) {
  const now = Date.now();
  let { ease, interval, reps } = cardState;

  if (grade === 1) {
    reps = 0;
    interval = 0; // vuelve a aparecer en esta misma sesión (cola)
    ease = Math.max(1.3, ease - 0.20);
  } else {
    if (grade === 2) {
      ease = Math.max(1.3, ease - 0.15);
      interval = reps === 0 ? 1 : Math.max(1, interval * 1.2);
    } else if (grade === 3) {
      interval = reps === 0 ? 1 : (reps === 1 ? 6 : interval * ease);
    } else if (grade === 4) {
      ease = ease + 0.15;
      interval = reps === 0 ? 3 : (reps === 1 ? 8 : interval * ease * 1.3);
    }
    reps += 1;
  }

  const dueMs = grade === 1 ? now : now + interval * 24 * 60 * 60 * 1000;
  return { ease, interval, reps, due: dueMs };
}

function previewInterval(cardState, grade) {
  const result = schedule(cardState, grade);
  if (grade === 1) return '<1m';
  const days = result.interval;
  if (days < 1) return '<1d';
  if (days < 30) return Math.round(days) + 'd';
  if (days < 365) return Math.round(days / 30) + 'mo';
  return (days / 365).toFixed(1) + 'a';
}

// ============================================================
// Datos de mazos
// ============================================================
function getDeckCards(deckKey) {
  const data = window.ANKI_DATA;
  if (deckKey.startsWith('minna:')) {
    const tema = deckKey.split(':')[1];
    return (data.minna.subdecks[tema] || []);
  }
  return (data[deckKey] || {}).cards || [];
}

function getDeckTitle(deckKey) {
  const data = window.ANKI_DATA;
  if (deckKey.startsWith('minna:')) {
    const tema = deckKey.split(':')[1];
    return 'Minna I · ' + tema;
  }
  return (data[deckKey] || {}).title || deckKey;
}

function buildQueue(deckKey) {
  const cards = getDeckCards(deckKey);
  const deckState = loadDeckState(deckKey);
  const now = Date.now();

  const due = [];
  const fresh = [];

  cards.forEach((card, idx) => {
    const cs = deckState[idx];
    if (!cs) { fresh.push(idx); }
    else if (cs.due <= now) { due.push(idx); }
  });

  shuffle(due);
  shuffle(fresh);
  const selectedFresh = fresh.slice(0, NEW_CARDS_PER_SESSION);
  const combined = due.concat(selectedFresh);
  shuffle(combined);
  return combined.map(idx => ({ idx, card: cards[idx] }));
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ============================================================
// Vistas / pantallas
// ============================================================
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(name).classList.add('active');
  state.screen = name;
  focusFirst();
}

function focusFirst() {
  const activeScreen = document.querySelector('.screen.active');
  const preferred = activeScreen && activeScreen.querySelector('.focusable[data-default-focus="true"]');
  if (preferred && preferred.offsetParent !== null) { preferred.focus(); return; }
  const focusables = getFocusables();
  if (focusables.length) focusables[0].focus();
}

function getFocusables() {
  const activeScreen = document.querySelector('.screen.active');
  if (!activeScreen) return [];
  return Array.from(activeScreen.querySelectorAll('.focusable:not([disabled]):not(.hidden)'))
    .filter(el => el.offsetParent !== null);
}

// ---------- Menú principal ----------
function renderMenu() {
  const list = document.getElementById('deck-list');
  list.innerHTML = '';
  DECKS.forEach((d, i) => {
    const btn = document.createElement('button');
    btn.className = 'focusable';
    btn.dataset.action = 'select-deck';
    btn.dataset.deck = d.key;
    if (i === 0) btn.dataset.defaultFocus = 'true';

    let countLabel = '';
    if (!d.hasSub) {
      const total = getDeckCards(d.key).length;
      const st = loadDeckState(d.key);
      const now = Date.now();
      let dueCount = 0, newCount = 0;
      getDeckCards(d.key).forEach((c, idx) => {
        const cs = st[idx];
        if (!cs) newCount++;
        else if (cs.due <= now) dueCount++;
      });
      countLabel = `${dueCount} pend · ${newCount} nuevas`;
    } else {
      countLabel = '19 temas ›';
    }

    btn.innerHTML = `<span class="deck-name">${d.label}</span><span class="deck-count">${countLabel}</span>`;
    list.appendChild(btn);
  });
}

// ---------- Submenú Minna no Nihongo ----------
function renderSubmenu() {
  const list = document.getElementById('tema-list');
  list.innerHTML = '';
  const temas = Object.keys(window.ANKI_DATA.minna.subdecks).sort();
  temas.forEach((tema, i) => {
    const deckKey = 'minna:' + tema;
    const cards = getDeckCards(deckKey);
    const st = loadDeckState(deckKey);
    const now = Date.now();
    let dueCount = 0, newCount = 0;
    cards.forEach((c, idx) => {
      const cs = st[idx];
      if (!cs) newCount++;
      else if (cs.due <= now) dueCount++;
    });
    const btn = document.createElement('button');
    btn.className = 'focusable';
    btn.dataset.action = 'select-deck';
    btn.dataset.deck = deckKey;
    if (i === 0) btn.dataset.defaultFocus = 'true';
    btn.innerHTML = `<span class="deck-name">${tema}</span><span class="deck-count">${dueCount} pend · ${newCount} nuevas</span>`;
    list.appendChild(btn);
  });
}

// ---------- Pantalla de estudio ----------
function startStudy(deckKey) {
  state.deckKey = deckKey;
  state.deckTitle = getDeckTitle(deckKey);
  state.queue = buildQueue(deckKey);
  state.pos = 0;
  state.sessionDone = 0;

  document.getElementById('deck-title-label').textContent = state.deckTitle;

  if (state.queue.length === 0) {
    showScreen('done');
    document.getElementById('done-stat').textContent = 'No hay tarjetas pendientes en este mazo ahora mismo.';
    return;
  }
  showScreen('study');
  renderCard();
}

function renderCard() {
  if (state.pos >= state.queue.length) {
    finishSession();
    return;
  }
  state.revealed = false;
  const { card } = state.queue[state.pos];

  document.getElementById('counter-label').textContent = `${state.pos + 1} / ${state.queue.length}`;
  document.getElementById('progress-fill').style.width = (100 * state.pos / state.queue.length) + '%';

  document.getElementById('card-front').textContent = card.front || '';
  const subEl = document.getElementById('card-sub');
  subEl.textContent = card.sub || '';
  subEl.style.display = card.sub ? 'block' : 'none';

  document.getElementById('card-back').style.display = 'none';
  document.getElementById('card-back').textContent = card.back || '';
  document.getElementById('card-example').style.display = 'none';
  document.getElementById('card-example').textContent = card.ex || '';
  document.getElementById('card-example-back').style.display = 'none';
  document.getElementById('card-example-back').textContent = card.exback || '';

  document.getElementById('reveal-row').style.display = 'flex';
  document.getElementById('grade-row').style.display = 'none';

  speakCard(card);
  focusFirst();
}

function revealAnswer() {
  state.revealed = true;
  document.getElementById('card-back').style.display = 'block';
  if (document.getElementById('card-example').textContent) document.getElementById('card-example').style.display = 'block';
  if (document.getElementById('card-example-back').textContent) document.getElementById('card-example-back').style.display = 'block';

  document.getElementById('reveal-row').style.display = 'none';
  document.getElementById('grade-row').style.display = 'flex';

  const deckState = loadDeckState(state.deckKey);
  const { idx } = state.queue[state.pos];
  const cs = getCardState(deckState, idx);
  [1, 2, 3, 4].forEach(g => {
    document.getElementById('int-' + g).textContent = previewInterval(cs, g);
  });

  focusFirst();
}

function gradeCurrent(grade) {
  const deckState = loadDeckState(state.deckKey);
  const { idx } = state.queue[state.pos];
  const cs = getCardState(deckState, idx);
  const updated = schedule(cs, grade);
  deckState[idx] = updated;
  saveDeckState(state.deckKey, deckState);

  if (grade === 1) {
    // vuelve a la cola, unas posiciones más adelante
    const item = state.queue[state.pos];
    const reinsertAt = Math.min(state.queue.length, state.pos + 4);
    state.queue.splice(state.pos, 1);
    state.queue.splice(reinsertAt, 0, item);
  } else {
    state.sessionDone++;
    state.pos++;
  }
  renderCard();
}

function finishSession() {
  showScreen('done');
  document.getElementById('done-stat').textContent =
    `Repasaste ${state.sessionDone} tarjetas de "${state.deckTitle}".`;
}

// ---------- Audio por las bocinas ----------
// Las Ray-Ban Display corren las Web Apps dentro de un Android WebView, y
// Android WebView NO implementa la Web Speech API (speechSynthesis) — es una
// limitación conocida de la plataforma, no de esta app. Por eso: en
// escritorio (donde sí existe) usamos speechSynthesis; en las gafas caemos
// automáticamente a reproducir un mp3 generado al vuelo por un servicio de
// texto-a-voz, usando un <audio> normal (que sí funciona en WebView).
//
// Nota: el endpoint usado abajo (Google Translate TTS) es un servicio NO
// oficial y gratuito, sin API key. Es útil para prototipos pero puede
// cambiar, tener límites de uso, o requerir conexión a internet activa en
// las gafas. Para algo de producción, lo ideal sería una API de TTS oficial
// (Google Cloud TTS, Azure Speech, ElevenLabs, etc.) con tu propia API key.

const HAS_NATIVE_TTS = ('speechSynthesis' in window);
let japaneseVoice = null;
let voicesReady = false;
let audioUnlocked = false;

if (HAS_NATIVE_TTS) {
  const loadVoices = () => {
    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length) {
      japaneseVoice = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('ja')) || null;
      voicesReady = true;
    }
  };
  loadVoices();
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function setAudioStatus(text) {
  const el = document.getElementById('audio-status');
  if (el) el.textContent = text;
}

function remoteTtsUrl(text) {
  // Servicio no oficial, sin key. tl=ja fuerza acento japonés.
  return 'https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=' + encodeURIComponent(text);
}

function playRemoteTts(text, onOk, onFail) {
  const audioEl = document.getElementById('tts-audio');
  if (!audioEl) { onFail && onFail(); return; }
  audioEl.onerror = () => onFail && onFail();
  audioEl.oncanplay = null;
  audioEl.src = remoteTtsUrl(text);
  const p = audioEl.play();
  if (p && p.then) {
    p.then(() => onOk && onOk()).catch(() => onFail && onFail());
  } else {
    onOk && onOk();
  }
}

// Debe llamarse directamente dentro del handler del gesto (Enter/click) del
// botón de prueba para que cuente como interacción real del usuario y
// desbloquee el audio en ese navegador.
function unlockAudio() {
  if (HAS_NATIVE_TTS) {
    window.speechSynthesis.cancel();
    const test = new SpeechSynthesisUtterance('こんにちは');
    test.lang = 'ja-JP';
    if (japaneseVoice) test.voice = japaneseVoice;
    test.onstart = () => { audioUnlocked = true; setAudioStatus('✅ audio activado (voz del navegador)'); };
    test.onerror = () => { setAudioStatus('⚠️ el navegador bloqueó el audio — revisa volumen'); };
    setTimeout(() => { if (!audioUnlocked) setAudioStatus('⚠️ toca de nuevo o revisa el volumen'); }, 1500);
    window.speechSynthesis.speak(test);
    return;
  }

  // Paso 1: beep local embebido (data URI, no requiere internet). Si esto
  // falla, el problema es que ESTE navegador bloquea la reproducción de audio
  // en general (política de autoplay/gesto), sin importar la fuente.
  setAudioStatus('🔄 paso 1/2: probando audio local…');
  const audioEl = document.getElementById('tts-audio');
  audioEl.onerror = null;
  audioEl.src = LOCAL_BEEP_DATA_URI;
  const localPlay = audioEl.play();

  const runStep2 = () => {
    setAudioStatus('✅ paso 1 ok · probando servicio en línea…');
    playRemoteTts('こんにちは',
      () => { audioUnlocked = true; setAudioStatus('✅ audio activado (necesita internet)'); },
      () => { setAudioStatus('⚠️ paso 1 ok, pero el servicio en línea no respondió — revisa internet de las gafas'); }
    );
  };
  const step1Failed = (why) => {
    setAudioStatus('❌ este navegador bloquea todo audio (' + why + ') — revisa volumen/silencio de las gafas');
  };

  if (localPlay && localPlay.then) {
    localPlay.then(runStep2).catch(err => step1Failed(err && err.name ? err.name : 'reproducción rechazada'));
  } else {
    // Navegadores viejos sin promesa: asumimos que sí sonó
    runStep2();
  }
}

function speakCard(card) {
  const text = card && card.front;
  if (!text) return;
  if (HAS_NATIVE_TTS) {
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = 'ja-JP';
      utter.rate = 0.85;
      if (japaneseVoice) utter.voice = japaneseVoice;
      window.speechSynthesis.speak(utter);
    } catch (e) { /* ignorar */ }
  } else {
    playRemoteTts(text, null, () => setAudioStatus('⚠️ sin audio — revisa internet'));
  }
}

function repeatAudio() {
  const { card } = state.queue[state.pos] || {};
  if (card) speakCard(card);
}

// ============================================================
// Navegación: Neural Band / touch strip -> flechas + Enter
// ============================================================
const DPAD = {
  UP: 'ArrowUp', DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft', RIGHT: 'ArrowRight',
  SELECT: 'Enter',
};

function moveFocus(direction) {
  const focusables = getFocusables();
  if (!focusables.length) return;
  let idx = focusables.indexOf(document.activeElement);
  if (idx === -1) { focusables[0].focus(); return; }

  const forward = (direction === 'down' || direction === 'right');
  let next = forward ? idx + 1 : idx - 1;
  if (next < 0) next = focusables.length - 1;
  if (next >= focusables.length) next = 0;

  focusables[next].focus();
  focusables[next].scrollIntoView({ block: 'nearest' });
}

function activateFocused() {
  const el = document.activeElement;
  if (!el || !el.classList || !el.classList.contains('focusable')) return;

  const action = el.dataset.action;
  if (action === 'select-deck') {
    const deckKey = el.dataset.deck;
    const meta = DECKS.find(d => d.key === deckKey);
    if (meta && meta.hasSub) {
      renderSubmenu();
      showScreen('submenu');
    } else {
      startStudy(deckKey);
    }
  } else if (action === 'back') {
    if (state.screen === 'submenu') { renderMenu(); showScreen('menu'); }
    else { window.speechSynthesis && window.speechSynthesis.cancel(); renderMenu(); showScreen('menu'); }
  } else if (action === 'reveal') {
    revealAnswer();
  } else if (action === 'listen') {
    repeatAudio();
  } else if (action === 'test-audio') {
    unlockAudio();
  } else if (el.dataset.grade) {
    gradeCurrent(parseInt(el.dataset.grade, 10));
  }
}

document.addEventListener('keydown', function (e) {
  switch (e.key) {
    case DPAD.UP:     moveFocus('up');    break;
    case DPAD.DOWN:   moveFocus('down');  break;
    case DPAD.LEFT:   moveFocus('left');  break;
    case DPAD.RIGHT:  moveFocus('right'); break;
    case DPAD.SELECT: activateFocused();  break;
    default: return;
  }
  e.preventDefault();
});

// También permite tocar/click (para probar en escritorio/móvil)
document.addEventListener('click', function (e) {
  const el = e.target.closest('.focusable');
  if (el) { el.focus(); activateFocused(); }
});

// ============================================================
// Init
// ============================================================
renderMenu();
showScreen('menu');
