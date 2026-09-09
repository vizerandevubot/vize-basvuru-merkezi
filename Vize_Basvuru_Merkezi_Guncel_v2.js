(function () {
  'use strict';

  const grid = document.getElementById('grid');
  const search = document.getElementById('search');
  const count = document.getElementById('count');
  const empty = document.getElementById('empty');
  const filters = Array.from(document.querySelectorAll('.filter'));

  if (!grid || !search || !count || !empty) return;

  let category = 'all';

  function normalize(value) {
    return String(value || '')
      .toLocaleLowerCase('tr')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function refresh() {
    const query = normalize(search.value.trim());
    const cards = Array.from(grid.querySelectorAll('.card'));
    let visible = 0;

    cards.forEach(function (card) {
      const matchesCategory = category === 'all' || card.dataset.category === category;
      const matchesSearch = normalize(card.textContent).includes(query);
      const show = matchesCategory && matchesSearch;
      card.style.display = show ? 'flex' : 'none';
      if (show) visible += 1;
    });

    count.textContent = visible + ' bağlantı';
    empty.style.display = visible ? 'none' : 'block';
  }

  search.addEventListener('input', refresh);
  search.addEventListener('search', refresh);

  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      category = button.dataset.f || 'all';
      filters.forEach(function (item) {
        item.classList.toggle('active', item === button);
      });
      refresh();
    });
  });

  refresh();
}());
