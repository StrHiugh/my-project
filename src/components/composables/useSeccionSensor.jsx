import {useEffect, useState} from 'react';
import {useAuth} from "./useAuth.jsx";

export function useSeccionSensor(fkseccionEquipo) {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const apiUrl = 'http://127.0.0.1:8000'; // Reemplaza esto con la URL base de tu API
    const { getToken } = useAuth();
    const token = getToken();

    async function fetchSeccionSensor() {
        try {
            const response = await fetch(`${apiUrl}/api/v1/seccionSensor/?fkseccionEquipo=${fkseccionEquipo}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al consumir la API');
            }

            const result = await response.json();
            setData(result.results); // Almacena los datos obtenidos en el estado
            return result;
        } catch (err) {
            setError(err.message);
            console.error(err);
        }
    }
    useEffect(() => {
        if (fkseccionEquipo) {
            fetchSeccionSensor();
        }
    }, []);


    return {
        data,
        error,
        fetchSeccionSensor,
    };
}
