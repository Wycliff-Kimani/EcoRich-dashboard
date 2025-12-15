function renderSummaryCards() {
  const container = document.getElementById("trainings-summary-container");
  const cards = [
    { title: "Total Trainings", value: summaryData.total },
    { title: "Upcoming", value: summaryData.upcoming },
    { title: "Completed", value: summaryData.completed },
    { title: "Total Participants", value: summaryData.participants },
  ];
  cards.forEach((card) => {
    const div = document.createElement("div");
    div.className = "rounded-lg border bg-white p-4";
    div.innerHTML = `<p class="text-sm text-gray-500">${card.title}</p><p class="text-2xl font-semibold">${card.value}</p>`;
    container.appendChild(div);
  });
}

function renderTrainingCards() {
  const container = document.getElementById("trainings-cards-container");
  trainings.forEach((training) => {
    const statusColor =
      training.status === "Upcoming"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-green-100 text-green-800";
    const card = document.createElement("div");
    card.className = "bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md";
    card.innerHTML = `
      <h3 class="text-lg font-semibold">${training.title}</h3>
      <p class="text-sm text-gray-600">Category: ${training.category}</p>
      <p class="text-sm text-gray-600">Mode: ${training.mode}</p>
      <p class="text-sm text-gray-600">Date: ${training.date}</p>
      <p class="text-sm text-gray-600">Location: ${training.location}</p>
      <p class="text-sm text-gray-600">Participants: ${training.participants}</p>
      <span class="inline-block px-2 py-1 text-xs rounded-full ${statusColor}">${training.status}</span>
      <div class="mt-4 flex gap-2">
        <a href="edit-training.html?id=${training.id}" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium">Edit</a>
        <a href="view-training-details.html?id=${training.id}" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">View Details</a>
      </div>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderSummaryCards();
  renderTrainingCards();
});
