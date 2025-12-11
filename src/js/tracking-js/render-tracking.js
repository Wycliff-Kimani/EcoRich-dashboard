// ================= MACHINE STATUS =================
function renderMachineStatus() {
  const container = document.getElementById("machine-status-container");
  container.innerHTML = "";

  machineStatusData.forEach((machine) => {
    const card = document.createElement("div");
    card.className =
      "bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200";

    card.innerHTML = `
      <div class="flex items-center mb-2">
        <i class="fas fa-robot text-green-500 mr-2"></i>
        <h3 class="font-semibold text-lg text-gray-800 dark:text-gray-200">${machine.name}</h3>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Current Stage: <span class="font-medium">${machine.stage}</span>
      </p>
      <div class="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-3 overflow-hidden">
        <div class="h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-width duration-300"
          style="width: ${machine.percent}%" aria-label="Progress: ${machine.percent}%"></div>
      </div>
      <p class="text-sm mt-1 text-gray-700 dark:text-gray-300">${machine.percent}% complete</p>
    `;

    container.appendChild(card);
  });
}

// ================= WASTE COLLECTION =================
function renderWasteCollection() {
  const box = document.getElementById("waste-collection-container");
  box.classList.add(
    "rounded-xl",
    "shadow-md",
    "border",
    "border-gray-200",
    "dark:border-gray-700",
    "hover:shadow-lg",
    "transition-shadow",
    "duration-200"
  );

  // Determine status color
  let statusColor = "text-gray-700 dark:text-gray-300";
  if (wasteCollectionData.status.includes("pending")) {
    statusColor = "text-yellow-600 dark:text-yellow-400";
  } else if (wasteCollectionData.status.includes("completed")) {
    statusColor = "text-green-600 dark:text-green-500";
  }

  box.innerHTML = `
    <div class="flex items-center mb-2">
      <i class="fas fa-truck-loading text-blue-500 mr-2"></i>
      <h3 class="font-semibold text-lg text-gray-800 dark:text-gray-200">Waste Collection Overview</h3>
    </div>
    <p class="text-sm text-gray-600 dark:text-gray-400">Date: ${wasteCollectionData.date}</p>
    <p class="mt-1 ${statusColor}">
      Status: <strong>${wasteCollectionData.status}</strong>
    </p>
    <p class="mt-1 text-gray-700 dark:text-gray-300">Collected: ${wasteCollectionData.collectedKg} kg</p>
  `;
}

// ================= DELIVERY TRACKING =================
function renderDeliveryTracking() {
  const container = document.getElementById("delivery-tracking-container");
  container.innerHTML = "";

  deliveryTrackingData.forEach((delivery) => {
    const card = document.createElement("div");
    card.className =
      "bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-200";

    // Status badge
    let statusBadge = "";
    if (delivery.status === "Pending") {
      statusBadge = `<span class="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pending</span>`;
    } else if (delivery.status === "In Transit") {
      statusBadge = `<span class="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">In Transit</span>`;
    } else if (delivery.status === "Delivered") {
      statusBadge = `<span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Delivered</span>`;
    }

    card.innerHTML = `
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center">
          <i class="fas fa-shipping-fast text-indigo-500 mr-2"></i>
          <h3 class="font-semibold text-lg text-gray-800 dark:text-gray-200">${delivery.farmer}</h3>
        </div>
        ${statusBadge}
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400">Bags: ${delivery.bags}</p>
      <p class="text-sm text-gray-600 dark:text-gray-400">Location: ${delivery.location}</p>
    `;

    container.appendChild(card);
  });
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded", () => {
  renderMachineStatus();
  renderWasteCollection();
  renderDeliveryTracking();
});
