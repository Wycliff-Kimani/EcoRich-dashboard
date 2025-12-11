// Machine Status Data

const machineStages = [
  "Feeding",
  "Shredding",
  "Processing",
  "Drying",
  "Curing",
  "Idle",
];

function getRandomStage() {
  return machineStages[Math.floor(Math.random() * machineStages.length)];
}

function getRandomPercent() {
  return Math.floor(Math.random() * 100) + 1; // 1–100%
}

const machineStatusData = [
  {
    name: "Solar Waste-Bot",
    stage: getRandomStage(),
    percent: getRandomPercent(),
  },
  {
    name: "Electric Waste-Bot",
    stage: getRandomStage(),
    percent: getRandomPercent(),
  },
];
