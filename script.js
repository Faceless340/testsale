/* ============================================
   Калькулятор Dayzborn — логика
   UI «Журнал выжившего»
   ============================================ */

/* Ключ localStorage для количеств */
const STORAGE_KEY = 'dayzborn-calc-qty-v1';

/* Каталоги предметов по калькуляторам.
   Позже можно задать разные цены для Базы и Листничества. */
const CATALOG = {
  baza: [
    {
      title: 'Мутанина',
      items: [
        { name: 'Ухо химеры', p2: 30000, pus: 45000, qty: 0 },
        { name: 'Коготь химеры', p2: 30000, pus: 45000, qty: 0 },
        { name: 'Рука зомби', p2: 35000, pus: 55000, qty: 0 },
        { name: 'Зубы шипастого', p2: 35000, pus: 45000, qty: 0 },
        { name: 'Язык пиявки', p2: 35000, pus: 45000, qty: 0 },
        { name: 'Глаз плоти', p2: 30000, pus: 50000, qty: 0 },
        { name: 'Хвост собаки', p2: 30000, pus: 45000, qty: 0 },
        { name: 'Коготь мут. медведя', p2: 30000, pus: 45000, qty: 0 },
        { name: 'Рука излома', p2: 20000, pus: 33000, qty: 0 },
        { name: 'Копыто кабана', p2: 30000, pus: 45000, qty: 0 },
        { name: 'Голова тушкана', p2: 30000, pus: 45000, qty: 0 },
        { name: 'Лапа крысоволка', p2: 35000, pus: 45000, qty: 0 },
        { name: 'Ухо телёса', p2: 35000, pus: 45000, qty: 0 },
        { name: 'Часть мухомора', p2: 35000, pus: 45000, qty: 0 },
        { name: 'Челюсть с языком', p2: 35000, pus: 45000, qty: 0 },
        { name: 'Коготь трупожора', p2: 35000, pus: 45000, qty: 0 },
        { name: 'Красное ухо мозгодава', p2: 35000, pus: 45000, qty: 0 },
        { name: 'Лапа кота-Баюна', p2: 35000, pus: 45000, qty: 0 },
        { name: 'Ухо шныря', p2: 20000, pus: 30000, qty: 0 },
        { name: 'Хвост псевдособаки', p2: 7500, pus: 15000, qty: 0 },
        { name: 'Щупальце кровососа', p2: 10000, pus: 20000, qty: 0 },
        { name: 'Рога мутанта', p2: 100000, pus: 135000, qty: 0 },
        { name: 'Кисть костереза', p2: 25000, pus: 35000, qty: 0 },
        { name: 'Щупальце костереза', p2: 25000, pus: 35000, qty: 0 },
        { name: 'Кислый нарост', p2: 45000, pus: 70000, qty: 0 },
        { name: 'Ухо мозгодава', p2: 20000, pus: 30000, qty: 0 },
        { name: 'Глаз теневника', p2: 20000, pus: 30000, qty: 0 },
        { name: 'Голова рептилойда', p2: 80000, pus: 100000, qty: 0 },
        { name: 'Жетон подопытного', p2: 45000, pus: 55000, qty: 0 },
        { name: 'Биомасса мутанта', p2: 20000, pus: 30000, qty: 0 },
        { name: 'Субстанция', p2: 35000, pus: 50000, qty: 0 }
      ]
    },
    {
      title: 'Исследования',
      items: [
        { name: 'Исследования', p2: 25000, pus: 30000, qty: 0 }
      ]
    },
    {
      title: 'Артефакты',
      items: [
        { name: 'Душа', p2: 600000, pus: 700000, qty: 0 },
        { name: 'Компас', p2: 1750000, pus: 2000000, qty: 0 },
        { name: 'Бусы бабки', p2: 1750000, pus: 2000000, qty: 0 },
        { name: 'Медуза', p2: 1750000, pus: 2000000, qty: 0 },
        { name: 'Кровь камня', p2: 1750000, pus: 2000000, qty: 0 },
        { name: 'Огненный шар', p2: 1750000, pus: 2000000, qty: 0 },
        { name: 'Золотая рыбка', p2: 1750000, pus: 2000000, qty: 0 },
        { name: 'Монолит', p2: 1750000, pus: 2000000, qty: 0 },
        { name: 'Гравиконце', p2: 1750000, pus: 2000000, qty: 0 },
        { name: 'Батарейка', p2: 1750000, pus: 2000000, qty: 0 },
        { name: 'Кристалл', p2: 1750000, pus: 2000000, qty: 0 }
      ]
    },
    {
      title: 'Ножи',
      items: [
        { name: 'Нож 1 ранг', p2: 35000, pus: 55000, qty: 0 },
        { name: 'Нож 2 ранг', p2: 100000, pus: 130000, qty: 0 }
      ]
    }
  ],

  /* Калькулятор «Листничество» — руда, шкуры, рыба */
  listnichestvo: [
    {
      title: 'Руда',
      items: [
        { name: 'Железная руда', p2: 5000, pus: 8000, qty: 0 },
        { name: 'Медная руда', p2: 7000, pus: 11000, qty: 0 },
        { name: 'Угольный камень', p2: 3000, pus: 5000, qty: 0 },
        { name: 'Серебряная руда', p2: 25000, pus: 35000, qty: 0 },
        { name: 'Золотая руда', p2: 45000, pus: 65000, qty: 0 },
        { name: 'Сера', p2: 12000, pus: 18000, qty: 0 }
      ]
    },
    {
      title: 'Шкуры',
      items: [
        { name: 'Шкура волка', p2: 15000, pus: 22000, qty: 0 },
        { name: 'Шкура кабана', p2: 12000, pus: 18000, qty: 0 },
        { name: 'Шкура оленя', p2: 18000, pus: 27000, qty: 0 },
        { name: 'Шкура медведя', p2: 40000, pus: 55000, qty: 0 },
        { name: 'Шкура лисы', p2: 10000, pus: 15000, qty: 0 },
        { name: 'Сырая кожа', p2: 8000, pus: 12000, qty: 0 }
      ]
    },
    {
      title: 'Рыба',
      items: [
        { name: 'Карп', p2: 4000, pus: 6500, qty: 0 },
        { name: 'Щука', p2: 6000, pus: 9000, qty: 0 },
        { name: 'Окунь', p2: 3500, pus: 5500, qty: 0 },
        { name: 'Сом', p2: 15000, pus: 22000, qty: 0 },
        { name: 'Лосось', p2: 20000, pus: 30000, qty: 0 },
        { name: 'Вяленая рыба', p2: 8000, pus: 12000, qty: 0 }
      ]
    }
  ]
};

const CALC_TITLES = {
  baza: 'База сдерживания',
  listnichestvo: 'Листничество'
};

/* Состояние */
let currentCalc = 'baza';
let sections = [];
let flat = [];
let activeFilter = 'all';
let holdTimer = null;
let holdInterval = null;

/* Формат числа с пробелами */
function fmt(n) {
  return Math.round(n).toLocaleString('ru-RU');
}

/* Загрузка qty из localStorage */
function loadSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (typeof saved !== 'object' || !saved) return;

    Object.keys(CATALOG).forEach(function (calcId) {
      CATALOG[calcId].forEach(function (sec) {
        sec.items.forEach(function (item) {
          const key = calcId + '::' + item.name;
          if (saved[key] != null) {
            item.qty = Math.max(0, parseInt(saved[key], 10) || 0);
          }
        });
      });
    });
  } catch (e) {}
}

/* Сохранение qty */
function saveQty() {
  try {
    const data = {};
    Object.keys(CATALOG).forEach(function (calcId) {
      CATALOG[calcId].forEach(function (sec) {
        sec.items.forEach(function (item) {
          if (item.qty > 0) {
            data[calcId + '::' + item.name] = item.qty;
          }
        });
      });
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
}

/* Строка таблицы */
function buildRow(item, flatIdx) {
  const tr = document.createElement('tr');
  tr.dataset.flat = flatIdx;
  tr.dataset.name = item.name.toLowerCase();
  if (item.qty > 0) tr.classList.add('has-qty');

  tr.innerHTML =
    '<td class="name">' + item.name + '</td>' +
    '<td class="price">' + fmt(item.p2) + '</td>' +
    '<td class="price">' + fmt(item.pus) + '</td>' +
    '<td class="qty">' +
      '<div class="qty-control">' +
        '<button type="button" class="qty-btn" data-action="minus" data-flat="' + flatIdx + '" aria-label="Уменьшить">−</button>' +
        '<input type="number" min="0" inputmode="numeric" value="' + item.qty + '" data-flat="' + flatIdx + '" aria-label="Количество">' +
        '<button type="button" class="qty-btn" data-action="plus" data-flat="' + flatIdx + '" aria-label="Увеличить">+</button>' +
      '</div>' +
    '</td>';
  return tr;
}

/* Установка количества */
function setQty(idx, val, skipSave) {
  val = Math.max(0, parseInt(val, 10) || 0);
  flat[idx].qty = val;

  const input = document.querySelector('input[data-flat="' + idx + '"]');
  if (input) input.value = val;

  const tr = document.querySelector('tr[data-flat="' + idx + '"]');
  if (tr) tr.classList.toggle('has-qty', val > 0);

  recalculate();
  if (!skipSave) saveQty();
}

function clearHold() {
  if (holdTimer) { clearTimeout(holdTimer); holdTimer = null; }
  if (holdInterval) { clearInterval(holdInterval); holdInterval = null; }
}

/* Удержание +/− */
function startHold(btn) {
  clearHold();
  const idx = +btn.dataset.flat;
  const delta = btn.dataset.action === 'plus' ? 1 : -1;
  setQty(idx, flat[idx].qty + delta);

  holdTimer = setTimeout(function () {
    holdInterval = setInterval(function () {
      setQty(idx, flat[idx].qty + delta);
    }, 80);
  }, 400);
}

/* Левое меню категорий */
function buildCategoryMenu() {
  const list = document.getElementById('sidebar');
  list.innerHTML = '';

  /* Пункт «Все» */
  const allBtn = document.createElement('button');
  allBtn.type = 'button';
  allBtn.className = 'menu-item' + (activeFilter === 'all' ? ' active' : '');
  allBtn.dataset.filter = 'all';
  allBtn.innerHTML =
    '<span class="mi-icon">◆</span>' +
    '<span class="mi-label">Все</span>';
  list.appendChild(allBtn);

  sections.forEach(function (sec) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'menu-item' + (activeFilter === sec.title.toLowerCase() ? ' active' : '');
    btn.dataset.filter = sec.title.toLowerCase();
    btn.innerHTML =
      '<span class="mi-icon">◇</span>' +
      '<span class="mi-label">' + sec.title + '</span>';
    list.appendChild(btn);
  });

  /* Счётчик категорий */
  const countEl = document.getElementById('catCount');
  if (countEl) countEl.textContent = String(sections.length);

  list.querySelectorAll('.menu-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      list.querySelectorAll('.menu-item').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      applyFilter();
    });
  });
}

/* Отрисовка таблицы */
function render() {
  const tbody = document.getElementById('tbody');
  tbody.innerHTML = '';
  flat = [];

  sections.forEach(function (sec) {
    const secTr = document.createElement('tr');
    secTr.className = 'section';
    secTr.dataset.section = sec.title.toLowerCase();
    secTr.innerHTML = '<td class="section-cell" colspan="4">' + sec.title + '</td>';
    tbody.appendChild(secTr);

    sec.items.forEach(function (item) {
      const flatIdx = flat.length;
      flat.push(item);
      tbody.appendChild(buildRow(item, flatIdx));
    });
  });

  tbody.querySelectorAll('input').forEach(function (inp) {
    inp.addEventListener('input', function () {
      setQty(+inp.dataset.flat, inp.value);
    });
    inp.addEventListener('focus', function () { this.select(); });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setQty(+inp.dataset.flat, flat[+inp.dataset.flat].qty + 1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setQty(+inp.dataset.flat, flat[+inp.dataset.flat].qty - 1);
      }
    });
  });

  tbody.querySelectorAll('.qty-btn').forEach(function (btn) {
    btn.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      startHold(btn);
    });
    btn.addEventListener('pointerup', clearHold);
    btn.addEventListener('pointerleave', clearHold);
    btn.addEventListener('pointercancel', clearHold);
  });

  buildCategoryMenu();
  recalculate();
  applyFilter();
}

/* Пересчёт итогов */
function recalculate() {
  let total2 = 0;
  let totalUs = 0;

  flat.forEach(function (item) {
    total2 += item.p2 * item.qty;
    totalUs += item.pus * item.qty;
  });

  document.getElementById('total2').textContent = fmt(total2);
  document.getElementById('totalUs').textContent = fmt(totalUs);

  const diff = totalUs - total2;
  const half = Math.round(diff * 0.5);
  const give = totalUs - half;

  document.getElementById('diff').textContent = fmt(diff);
  document.getElementById('half').textContent = fmt(half);
  document.getElementById('give').textContent = fmt(give);

  updateSelectedList();
}

/* Блок «Выбрано» */
function updateSelectedList() {
  const list = document.getElementById('selectedList');
  const container = document.getElementById('selectedItems');
  const selected = flat.filter(function (i) { return i.qty > 0; });

  if (selected.length === 0) {
    list.classList.remove('visible');
    container.innerHTML = '';
    return;
  }

  list.classList.add('visible');
  container.innerHTML = selected.map(function (item) {
    return (
      '<div class="selected-item">' +
      '<span class="s-name" title="' + item.name + '">' + item.name + '</span>' +
      '<span class="s-qty">×' + item.qty + '</span>' +
      '</div>'
    );
  }).join('');
}

/* Фильтр поиск + категория */
function applyFilter() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  let visibleCount = 0;
  const sectionHasVisible = {};

  document.querySelectorAll('#tbody tr[data-flat]').forEach(function (tr) {
    const nameMatch = !q || tr.dataset.name.indexOf(q) !== -1;

    let prev = tr.previousElementSibling;
    while (prev && !prev.classList.contains('section')) {
      prev = prev.previousElementSibling;
    }
    const sectionKey = prev ? prev.dataset.section : '';
    const sectionMatch = activeFilter === 'all' || sectionKey === activeFilter;
    const match = nameMatch && sectionMatch;

    tr.classList.toggle('hidden', !match);
    if (match) {
      visibleCount++;
      if (prev) sectionHasVisible[prev.dataset.section] = true;
    }
  });

  document.querySelectorAll('#tbody tr.section').forEach(function (tr) {
    tr.classList.toggle('hidden', !sectionHasVisible[tr.dataset.section]);
  });

  document.getElementById('noResults').style.display =
    visibleCount === 0 ? 'block' : 'none';
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(function () { toast.classList.remove('show'); }, 2000);
}

function resetAll() {
  if (!flat.some(function (i) { return i.qty > 0; })) {
    showToast('Нечего сбрасывать');
    return;
  }
  flat.forEach(function (item, idx) {
    if (item.qty > 0) setQty(idx, 0, true);
  });
  saveQty();
  showToast('Все количества обнулены');
}

/* Копирует только цифры «Отдать» */
function copyGive() {
  const rawText = document.getElementById('give').textContent || '0';
  const numberOnly = rawText.replace(/[^\d]/g, '') || '0';

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(numberOnly).then(function () {
      showToast('Скопировано: ' + numberOnly);
    }).catch(function () { fallbackCopy(numberOnly); });
  } else {
    fallbackCopy(numberOnly);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.left = '-9999px';
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand('copy');
    showToast('Скопировано: ' + text);
  } catch (e) {
    showToast('Не удалось скопировать');
  }
  document.body.removeChild(ta);
}

/* Смена калькулятора */
function switchCalculator(calcId) {
  if (!CATALOG[calcId]) return;

  currentCalc = calcId;
  sections = CATALOG[calcId];
  activeFilter = 'all';

  document.querySelectorAll('.tab').forEach(function (tab) {
    const on = tab.dataset.calc === calcId;
    tab.classList.toggle('active', on);
    tab.setAttribute('aria-selected', on ? 'true' : 'false');
  });

  document.getElementById('calcTitle').textContent = CALC_TITLES[calcId] || calcId;
  document.getElementById('searchInput').value = '';
  render();
}

/* Старт */
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('searchInput').addEventListener('input', applyFilter);

  document.querySelectorAll('.tab').forEach(function (tab) {
    tab.addEventListener('click', function () {
      switchCalculator(tab.dataset.calc);
    });
  });

  document.getElementById('resetBtn').addEventListener('click', resetAll);
  document.getElementById('copyBtn').addEventListener('click', copyGive);

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') saveQty();
  });

  loadSaved();
  switchCalculator('baza');
});
