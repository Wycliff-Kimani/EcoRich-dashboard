// Delivery Tracking

const sampleDeliveries = [
  {
    farmer: "John Mwangi",
    bags: "4 x 50kg",
    location: "Thika",
    status: "Pending",
  },
  {
    farmer: "Mary Achieng",
    bags: "2 x 25kg",
    location: "Kilimambogo",
    status: "In Transit",
  },
  {
    farmer: "Peter Kimani",
    bags: "6 x 50kg",
    location: "Murang'a",
    status: "Delivered",
  },
  {
    farmer: "Lucy Njeri",
    bags: "3 x 25kg",
    location: "Machakos",
    status: "Delivered",
  },
  {
    farmer: "Brian Otieno",
    bags: "5 x 50kg",
    location: "NAivasha",
    status: "Pending",
  },
  {
    farmer: "Sarah Wambui",
    bags: "1 x 25kg",
    location: "Ruiru",
    status: "In Transit",
  },
];

function getRandomDeliveries() {
  const count = Math.floor(Math.random() * (6 - 3 + 1)) + 3; // 3–6
  return sampleDeliveries.sort(() => Math.random() - 0.5).slice(0, count);
}

const deliveryTrackingData = getRandomDeliveries();
