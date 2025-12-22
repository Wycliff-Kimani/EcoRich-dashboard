function renderPostsTable() {
  const tbody = document.getElementById("posts-table-body");
  posts.forEach((post) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-4 py-3">${post.content}</td>
      <td class="px-4 py-3">${post.platform}</td>
      <td class="px-4 py-3">${post.date}</td>
      <td class="px-4 py-3 text-right"><button class="text-blue-500 hover:underline">Edit</button> <button class="text-red-500 hover:underline ml-2">Delete</button></td>
    `;
    tbody.appendChild(row);
  });
}

document.getElementById("create-post-form").addEventListener("submit", (e) => {
  e.preventDefault();
  // Backend logic here (e.g., fetch to /api/post)
  alert("Post published!"); // Placeholder
});

document.addEventListener("DOMContentLoaded", () => {
  renderPostsTable();
});
