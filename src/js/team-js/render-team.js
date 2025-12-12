function renderTeamCards() {
  const container = document.getElementById("team-cards-container");
  teamMembers.forEach((member) => {
    const card = document.createElement("div");
    card.className =
      "bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200";
    card.innerHTML = `
      <div class="flex items-start">
        <img src="${member.image}" alt="${member.name}" class="w-16 h-16 rounded-full object-cover mr-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-200">${member.name}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">${member.role}</p>
        </div>
      </div>
      <p class="mt-4 text-sm text-gray-700 dark:text-gray-300">${member.description}</p>
      <a href="${member.profile}" class="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium" aria-label="View profile of ${member.name}">View Profile</a>
    `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderTeamCards();
});
