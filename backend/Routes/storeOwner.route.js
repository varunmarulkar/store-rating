import { isAuth } from "../Middleware/isAuth.js";
import { updatePassword, storeDashboard } from "../Controllers/storeOwner.controller.js"; // Note the change here

export function storeOwnerRoute(app) {
    app.put("/store-owner/update-password", isAuth, updatePassword);
    app.get("/store-owner/dashboard", isAuth, storeDashboard);
}