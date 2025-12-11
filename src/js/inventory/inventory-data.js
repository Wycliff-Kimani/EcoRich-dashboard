// Sample Inventory Data (replace with real data later)
const inventoryItems = [
  {
    id: 1,
    name: "Organic Waste",
    category: "Raw Materials",
    quantity: 2000,
    unit: "kgs",
    threshold: 4000,
    status: "Low",
  },
  {
    id: 2,
    name: "25 kg fertilizer",
    category: "Products",
    quantity: 50,
    unit: "bags",
    threshold: 100,
    status: "Critically Low",
  },
  {
    id: 3,
    name: "50 Kg bags",
    category: "Products",
    quantity: 132,
    unit: "bags",
    threshold: 50,
    status: "Sufficient",
  },
  // Add more...
];

function getLowStockItems() {
  return inventoryItems.filter((item) => item.quantity <= item.threshold);
}

const summaryData = {
  totalItems: inventoryItems.length,
  totalValue: inventoryItems.reduce((acc, item) => acc + item.quantity * 10, 0), // Mock value
  lowStockCount: getLowStockItems().length,
};
