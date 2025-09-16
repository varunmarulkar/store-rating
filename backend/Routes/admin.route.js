import { isAuth } from "../Middleware/isAuth.js";
import { isAdmin } from "../Middleware/isAdmin.js";
import { addUser, addStore, getUsers, getStores, adminDashboard } from "../Controllers/admin.controller.js";

export function adminRoute(app){
    app.post("/admin/users", isAdmin, addUser);
    app.post("/admin/stores", isAdmin, addStore);
    app.get("/admin/users", isAdmin, getUsers);
    app.get("/admin/stores", isAdmin, getStores);
    app.get("/admin/dashboard", isAdmin, adminDashboard);
}
