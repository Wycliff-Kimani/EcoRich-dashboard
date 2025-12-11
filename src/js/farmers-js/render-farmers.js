function renderFarmersSummary() {
  const container = document.getElementById("farmers-summary-container");
  const cards = [
    {
      title: "Total Farmers",
      value: summaryData.totalFarmers,
      icon: "fas fa-users",
      color: "text-blue-500",
    },
    {
      title: "Active Farmers",
      value: summaryData.activeFarmers,
      icon: "fas fa-user-check",
      color: "text-green-500",
    },
    {
      title: "Total Orders",
      value: summaryData.totalOrders,
      icon: "fas fa-shopping-cart",
      color: "text-indigo-500",
    },
  ];

  cards.forEach((card) => {
    const div = document.createElement("div");
    div.className =
      "bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200";
    div.innerHTML = `
      <i class="${card.icon} ${card.color} text-2xl mb-2"></i>
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">${card.title}</h3>
      <p class="text-2xl text-gray-700 dark:text-gray-300">${card.value}</p>
    `;
    container.appendChild(div);
  });
}

function renderActiveOrders() {
  const container = document.getElementById("active-orders-container");
  if (!container) return; // Safety check
  if (activeOrders.length === 0) {
    container.innerHTML =
      '<p class="text-gray-600 dark:text-gray-400">No active orders.</p>';
    return;
  }
  activeOrders.forEach((order) => {
    const farmer = farmers.find((f) => f.id === order.farmerId);
    const card = document.createElement("div");
    card.className = "bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md";
    card.innerHTML = `
      <h3 class="text-lg font-semibold">${farmer ? farmer.name : "Unknown"} - ${order.order}</h3>
      <p class="text-sm text-gray-600 dark:text-gray-400">Status: ${order.status}</p>
    `;
    container.appendChild(card);
  });
}

const itemsPerPage = 15;
let currentPage = 1;
let filteredFarmers = [...farmers]; // Starts as full list; updates on search

function renderFarmersList() {
  const tbody = document.getElementById("farmers-table-body");
  if (!tbody) return; // Safety check
  tbody.innerHTML = ""; // Clear previous rows

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageData = filteredFarmers.slice(start, end);

  if (pageData.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML =
      '<td colspan="5" class="p-3 text-center text-gray-600 dark:text-gray-400">No farmers found.</td>';
    tbody.appendChild(row);
    return;
  }

  pageData.forEach((farmer) => {
    const statusLower = farmer.status.toLowerCase();
    const statusBadge =
      statusLower === "active"
        ? '<span class="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Active</span>'
        : statusLower === "pending payment"
          ? '<span class="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">Pending</span>'
          : '<span class="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Inactive</span>';

    const row = document.createElement("tr");
    row.className = "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors";
    row.innerHTML = `
      <td class="p-3 text-gray-800 dark:text-gray-200">${farmer.name}</td>
      <td class="p-3 text-gray-600 dark:text-gray-400">${farmer.location}</td>
      <td class="p-3 text-gray-800 dark:text-gray-200">${farmer.orders}</td>
      <td class="p-3">${statusBadge}</td>
      <td class="p-3">
        <button class="text-blue-500 hover:underline" aria-label="Edit ${farmer.name}">Edit</button>
        <button class="text-green-500 hover:underline ml-2" aria-label="View Details for ${farmer.name}">Details</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function renderPagination() {
  const container = document.getElementById("pagination-container");
  if (!container) return; // Safety check
  container.innerHTML = ""; // Clear previous buttons

  const totalPages = Math.ceil(filteredFarmers.length / itemsPerPage);
  if (totalPages <= 1) return; // No need for pagination

  // Prev button
  const prevBtn = document.createElement("button");
  prevBtn.textContent = "Prev";
  prevBtn.className = `px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-200 text-gray-500" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`;
  prevBtn.disabled = currentPage === 1;
  prevBtn.setAttribute("aria-label", "Previous page");
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderFarmersList();
      renderPagination();
    }
  });
  container.appendChild(prevBtn);

  // All page numbers (shows 1 to totalPages for full visibility as per your preference)
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement("button");
    pageBtn.textContent = i;
    pageBtn.className = `px-3 py-1 rounded ${i === currentPage ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`;
    pageBtn.setAttribute("aria-label", `Go to page ${i}`);
    pageBtn.addEventListener("click", () => {
      currentPage = i;
      renderFarmersList();
      renderPagination();
    });
    container.appendChild(pageBtn);
  }

  // Next button
  const nextBtn = document.createElement("button");
  nextBtn.textContent = "Next";
  nextBtn.className = `px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-200 text-gray-500" : "bg-blue-100 text-blue-700 hover:bg-blue-200"}`;
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.setAttribute("aria-label", "Next page");
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderFarmersList();
      renderPagination();
    }
  });
  container.appendChild(nextBtn);
}

function setupSearch() {
  const searchInput = document.getElementById("farmers-search");
  if (!searchInput) return; // Safety check
  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    filteredFarmers = farmers.filter(
      (farmer) =>
        farmer.name.toLowerCase().includes(term) ||
        farmer.location.toLowerCase().includes(term) ||
        farmer.status.toLowerCase().includes(term)
    );
    currentPage = 1; // Reset to first page on search
    renderFarmersList();
    renderPagination();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFarmersSummary();
  renderActiveOrders();
  setupSearch();
  renderFarmersList(); // Must call after setupSearch for initial render
  renderPagination();
});
