const apiBase = '/products';

async function fetchProducts() {
  const res = await fetch(apiBase);
  const data = await res.json();
  return data.data || [];
}

function renderProducts(items) {
  const container = document.getElementById('products');
  container.innerHTML = '';
  if (!items.length) {
    container.innerText = 'No products yet.';
    return;
  }
  items.forEach((p) => {
    const el = document.createElement('div');
    el.className = 'product';
    el.innerHTML = `
      <div><strong>${p.productName}</strong> (${p.productCode})</div>
      <div>Category: ${p.category} — Qty: ${p.quantityInStock} — ₹${p.unitPrice}</div>
    `;
    container.appendChild(el);
  });
}

async function load() {
  try {
    const items = await fetchProducts();
    renderProducts(items);
  } catch (err) {
    console.error(err);
    document.getElementById('products').innerText = 'Failed to load products.';
  }
}

document.getElementById('productForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = Object.fromEntries(new FormData(form).entries());
  // convert numeric fields
  data.quantityInStock = Number(data.quantityInStock);
  data.reorderLevel = Number(data.reorderLevel);
  data.unitPrice = Number(data.unitPrice);

  try {
    const res = await fetch(apiBase, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (res.ok) {
      form.reset();
      load();
    } else {
      alert(result.message || 'Error');
    }
  } catch (err) {
    console.error(err);
    alert('Failed to add product');
  }
});

load();
