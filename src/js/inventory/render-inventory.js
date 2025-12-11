function renderInventorySummary() {
  const container = document.getElementById("inventory-summary-container");
  const cards = [
    {
      title: "Total Items",
      value: summaryData.totalItems,
      icon: "fas fa-boxes",
    },
    {
      title: "Total Value",
      value: `Kshs.${summaryData.totalValue}`,
      icon: "fas fa-dollar-sign",
    },
    {
      title: "Low Stock",
      value: summaryData.lowStockCount,
      icon: "fas fa-exclamation-triangle",
    },
  ];

  cards.forEach((card) => {
    const div = document.createElement("div");
    div.className = "bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md";
    div.innerHTML = `
      <i class="${card.icon} text-green-500 text-2xl mb-2"></i>
      <h3 class="text-lg font-semibold">${card.title}</h3>
      <p class="text-2xl">${card.value}</p>
    `;
    container.appendChild(div);
  });
}

function renderItemList() {
  const tbody = document.getElementById("inventory-table-body");
  inventoryItems.forEach((item) => {
    const row = document.createElement("tr");
    row.className =
      item.quantity <= item.threshold ? "bg-yellow-50 dark:bg-yellow-900" : "";
    row.innerHTML = `
      <td class="p-3">${item.name}</td>
      <td class="p-3">${item.category}</td>
      <td class="p-3">${item.quantity} ${item.unit}</td>
      <td class="p-3">${item.status}</td>
      <td class="p-3"><button class="text-blue-500">Edit</button></td>
    `;
    tbody.appendChild(row);
  });
}

function renderLowStockAlerts() {
  const container = document.getElementById("low-stock-container");
  const lowItems = getLowStockItems();
  if (lowItems.length === 0) {
    container.innerHTML = '<p class="text-green-600">No low stock items.</p>';
  } else {
    lowItems.forEach((item) => {
      const alert = document.createElement("div");
      alert.className = "bg-yellow-100 p-4 rounded-lg";
      alert.innerHTML = `<p><strong>${item.name}</strong> is low: ${item.quantity} ${item.unit} remaining.</p>`;
      container.appendChild(alert);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderInventorySummary();
  renderItemList();
  renderLowStockAlerts();
});
