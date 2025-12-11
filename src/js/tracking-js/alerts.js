// Alerts Section

const sampleAlerts = [
  "Solar Waste-Bot idle for 23 minutes.",
  "Electric Waste-Bot requires cleaning.",
  "Low raw waste detected in storage.",
  "Delivery truck delayed due to rain.",
  "Fertilizer curing extended by 2 hours.",
];

function getRandomAlerts() {
  const count = Math.floor(Math.random() * 3) + 1; // 1–3 alerts
  return sampleAlerts.sort(() => Math.random() - 0.5).slice(0, count);
}

const alertsData = getRandomAlerts();
