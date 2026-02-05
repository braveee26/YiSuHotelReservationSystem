import { index, route } from "@react-router/dev/routes";

export default [
    index("routes/index.jsx"),
    route("/login", "routes/login.jsx"),
    route("/register", "routes/register.jsx"),
    route("/admin", "routes/admin/adminCenter.jsx"),
    route("/merchant", "routes/merchant/merchantCenter.jsx"),
];