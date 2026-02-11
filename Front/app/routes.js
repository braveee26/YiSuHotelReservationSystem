import { index, route, layout } from "@react-router/dev/routes";

export default [
    index("routes/index.jsx"),
    route("/login", "routes/login.jsx"),
    route("/register", "routes/register.jsx"),
    
    layout("routes/admin/layout.jsx", [
        route("/admin", "routes/admin/profile.jsx"),
        route("/admin/audit", "routes/admin/audit.jsx"),
        route("/admin/property", "routes/admin/property.jsx"),
        route("/admin/users", "routes/admin/users.jsx"),
    ]),
    
    layout("routes/merchant/layout.jsx", [
        route("/merchant", "routes/merchant/hotels.jsx"),
        route("/merchant/profile", "routes/merchant/profile.jsx"),
    ]),
    
    route("*", "routes/notfound.jsx")
];