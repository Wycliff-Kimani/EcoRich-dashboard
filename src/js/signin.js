import Alpine from "alpinejs";
import persist from "@alpinejs/persist";

import "./auth/signin-form";

Alpine.plugin(persist);
window.Alpine = Alpine;
Alpine.start();
