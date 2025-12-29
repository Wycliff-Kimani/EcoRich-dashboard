import { auth, db } from "./firebase.js"; // Adjust path if needed
console.log("profile.js loaded");
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "/index.html"; // Or "/signin.html" if that's your login page
    return;
  }

  const userRef = doc(db, "users", user.uid);
  let data = {};

  const snap = await getDoc(userRef);
  if (!snap.exists()) {
    // Create blank profile with your fields
    await setDoc(userRef, {
      firstName: "",
      lastName: "",
      phone: "",
      bio: "", // e.g., "CEO and Co-Founder"
      country: "",
      city: "",
      postalCode: "",
      companyId: "", // e.g., "Admin" or role
      email: user.email, // Auto from auth
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("Blank profile created");
  } else {
    data = snap.data();
    console.log("Profile loaded", data);
  }

  // Update UI elements (add these classes to your HTML)
  document.querySelector(".profile-name").textContent =
    `${data.firstName || "Not set"} ${data.lastName || ""}`;
  document.querySelector(".profile-bio").textContent = data.bio || "Not set";
  document.querySelector(".profile-location").textContent =
    `${data.city || "Not set"}, ${data.country || "Not set"}`;

  // Personal Info section
  document.querySelector(".first-name").textContent =
    data.firstName || "Not set";
  document.querySelector(".last-name").textContent = data.lastName || "Not set";
  document.querySelector(".email").textContent = user.email; // Always from auth
  document.querySelector(".phone").textContent = data.phone || "Not set";
  document.querySelector(".bio-detail").textContent = data.bio || "Not set";

  // Address section
  document.querySelector(".country").textContent = data.country || "Not set";
  document.querySelector(".city").textContent = data.city || "Not set";
  document.querySelector(".postal-code").textContent =
    data.postalCode || "Not set";
  document.querySelector(".company-id").textContent =
    data.companyId || "Not set";
});

// Expose save handlers so Alpine (inline @click) can call them.
window.savePersonalInfo = async () => {
  const user = auth.currentUser;
  if (!user) {
    alert("Not logged in");
    return;
  }
  try {
    await setDoc(
      doc(db, "users", user.uid),
      {
        firstName: document.getElementById("firstNameInput")?.value || "",
        lastName: document.getElementById("lastNameInput")?.value || "",
        email: document.getElementById("emailInput")?.value || user.email,
        phone: document.getElementById("phoneInput")?.value || "",
        bio: document.getElementById("bioInput")?.value || "",
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log("Personal info saved");
    location.reload();
  } catch (error) {
    console.error("Save error:", error);
    alert("Error saving: " + error.message);
  }
};

window.saveAddress = async () => {
  const user = auth.currentUser;
  if (!user) {
    alert("Not logged in");
    return;
  }
  try {
    await setDoc(
      doc(db, "users", user.uid),
      {
        country: document.getElementById("countryInput")?.value || "",
        city: document.getElementById("cityInput")?.value || "",
        postalCode: document.getElementById("postalCodeInput")?.value || "",
        companyId: document.getElementById("companyIdInput")?.value || "",
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    console.log("Address saved");
    location.reload();
  } catch (error) {
    console.error("Save error:", error);
    alert("Error saving: " + error.message);
  }
};
