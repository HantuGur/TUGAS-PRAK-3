let expenses = []; // { id, name, amount }

const form = document.getElementById('expense-form');
const nameInput = document.getElementById('expense-name');
const amountInput = document.getElementById('expense-amount');
const listEl = document.getElementById('expense-list');
const totalEl = document.getElementById('total-amount');
const countEl = document.getElementById('total-count');

//nambahin data 
form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!name || isNaN(amount) || amount <= 0) return;

  expenses.push({
    id: Date.now(), // id unik sederhana
    name: name,
    amount: amount
  });

  form.reset();
  render();
});
// apus pengeluaran
function deleteExpense(id) {
  expenses = expenses.filter(function (item) {
    return item.id !== id;
  });
  render();
}
//render list jumlah
function render() {
  listEl.innerHTML = '';
  expenses.forEach(function (item) {
    const li = document.createElement('li');
    li.className = 'expense-item';
    li.innerHTML =
      '<div class="item-info">' +
        '<span class="item-name">' + item.name + '</span>' +
        '<span class="item-amount">Rp' + item.amount.toLocaleString('id-ID') + '</span>' +
      '</div>' +
      '<button data-id="' + item.id + '">Hapus</button>';
    listEl.appendChild(li);
  });
  document.querySelectorAll('.expense-item button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      deleteExpense(Number(btn.dataset.id));
    });
  });

  //buat total pengeluaran ini anjay
  const total = expenses.reduce(function (sum, item) {
    return sum + item.amount;
  }, 0);
  totalEl.textContent = 'Rp' + total.toLocaleString('id-ID');

  //jumlah data bro
  countEl.textContent = expenses.length;
}
render();