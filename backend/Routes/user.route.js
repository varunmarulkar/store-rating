import { isAuth } from "../Middleware/isAuth.js";
import { updatePassword, getAllStores, submitRating, modifyRating, getMe } from "../Controllers/user.controller.js";

export function userRoute(app) {
    app.put("/user/update-password", isAuth, updatePassword);
    app.get("/user/stores", isAuth, getAllStores);
    app.post("/user/ratings", isAuth, submitRating);
    app.put("/user/ratings", isAuth, modifyRating);
    app.get("/user/me", isAuth, getMe);
}
