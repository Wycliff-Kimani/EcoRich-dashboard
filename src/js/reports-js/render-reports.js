function renderReportsCards() {
  const container = document.getElementById("reports-cards-container");
  reports.forEach((report) => {
    const card = document.createElement("div");
    card.className = "bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md";
    card.innerHTML = `
      <h3 class="text-lg font-semibold">${report.title}</h3>
      <p class="text-sm text-gray-600">Type: ${report.type}</p>
      <p class="text-sm text-gray-600">Date: ${report.date}</p>
      <div class="mt-4 flex gap-2">
        <a href="${report.file}" download class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Download</a>
        <button onclick="previewReport('${report.file}', '${report.type}')" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Preview</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function previewReport(file, type) {
  if (type === "PDF") {
    window.open(file, "_blank");
    return;
  }

  if (type === "DOCX") {
    fetch(file)
      .then((res) => res.arrayBuffer())
      .then((buffer) => mammoth.convertToHtml({ arrayBuffer: buffer }))
      .then((result) => {
        const previewWindow = window.open("", "_blank");
        previewWindow.document.write(`
          <html>
            <head>
              <title>Document Preview</title>
              <style>
                body { font-family: sans-serif; padding: 20px; }
              </style>
            </head>
            <body>
              ${result.value}
            </body>
          </html>
        `);
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to preview document");
      });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderReportsCards();
});
