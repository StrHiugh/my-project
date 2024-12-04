import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const SECRET_KEY = "abcdefghi123456789";

export function useAuth() {
    const getToken = () => {
        const encryptedToken = Cookies.get('auth_token');
        let token = null;

        if (encryptedToken) {
            try {
                const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
                token = bytes.toString(CryptoJS.enc.Utf8);
            } catch (error) {
                console.error("Error al desencriptar el token:", error);
            }
        }

        return token;
    };

    return { getToken };
}
