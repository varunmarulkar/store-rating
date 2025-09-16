import { signup, signin, logout } from "../Controllers/auth.controller.js";
import { isAuth } from "../Middleware/isAuth.js";

export function authRoute(app){
    app.post("/signup", signup);
    app.post("/signin", signin);
    app.post("/logout", logout);

    app.get("/auth/check", isAuth, (req, res) => {
        res.status(200).json({ message: "Authenticated", user: req.user });
    });
}
