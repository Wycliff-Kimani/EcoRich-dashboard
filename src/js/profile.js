import { auth, db } from "./firebase.js";
console.log("profile.js loaded");
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

// Safe DOM helper — avoids exceptions when this module is loaded on non-profile pages
function setText(selector, text) {
  const el = document.querySelector(selector);
  if (el) el.textContent = text;
}

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "/index.html";
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
      companyId: "",
      email: user.email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("Blank profile created");
  } else {
    data = snap.data();
    console.log("Profile loaded", data);
  }

  // Update UI elements (add these classes to your HTML)
  setText(
    ".profile-name",
    `${data.firstName || "Not set"} ${data.lastName || ""}`
  );
  setText(".profile-bio", data.bio || "Not set");
  setText(
    ".profile-location",
    `${data.city || "Not set"}, ${data.country || "Not set"}`
  );

  // Personal Info section
  setText(".first-name", data.firstName || "Not set");
  setText(".last-name", data.lastName || "Not set");
  setText(".email", user.email || ""); // Always from auth
  setText(".phone", data.phone || "Not set");
  setText(".bio-detail", data.bio || "Not set");

  // Address section
  setText(".country", data.country || "Not set");
  setText(".city", data.city || "Not set");
  setText(".postal-code", data.postalCode || "Not set");
  setText(".company-id", data.companyId || "Not set");
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
