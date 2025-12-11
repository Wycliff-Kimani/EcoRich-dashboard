// Waste Collection Overview

const wasteCollectionStatus = [
  "No pending pickups",
  "1 pickup pending",
  "Waste in transit",
  "All pickups completed",
];

function getRandomWasteStatus() {
  return wasteCollectionStatus[
    Math.floor(Math.random() * wasteCollectionStatus.length)
  ];
}

function getRandomWasteKg() {
  return Math.floor(Math.random() * (300 - 50 + 1)) + 50; // 50–300kg
}

const wasteCollectionData = {
  date: new Date().toDateString(),
  status: getRandomWasteStatus(),
  collectedKg: getRandomWasteKg(),
};
