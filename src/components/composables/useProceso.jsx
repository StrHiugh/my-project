// hooks/useProceso.js



import Cookies from "js-cookie";
import {useAuth} from "./useAuth.jsx";

export function useProceso() {
    const { getToken } = useAuth();
    const token = getToken();
    // Método para obtener procesos (GET)
    const fetchProceso = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/proceso/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al consumir la API');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw error; // Lanza el error para manejarlo más tarde
        }
    };

    // Método para crear un nuevo proceso (POST)
    const postProceso = async (proceso) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/proceso/registro/`, {
                method: 'POST',
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(proceso),
            });

            if (!response.ok) {
                throw new Error('Error al crear el proceso');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error; // Lanza el error para manejarlo más tarde
        }
    };

    return {
        fetchProceso,
        postProceso,
    };
}
