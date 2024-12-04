import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const SECRET_KEY = "abcdefghi123456789";

const ProtectedRoute = ({ children }) => {
    const encryptedToken = Cookies.get("auth_token");

    if (!encryptedToken) {
        return <Navigate to="/Login" replace />;
    }

    // Desencripta el token para validarlo (opcional)
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
        const token = bytes.toString(CryptoJS.enc.Utf8);

        if (!token) {
            // Si el token no es válido, redirige al inicio de sesión
            return <Navigate to="/Login" replace />;
        }
    } catch (error) {
        console.error("Error desencriptando el token:", error);
        return <Navigate to="/Login" replace />;
    }

    // Si el usuario está autenticado, renderiza la ruta protegida
    return children;
};

export default ProtectedRoute;
