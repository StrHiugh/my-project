import {useState, useCallback, useEffect} from 'react';

// Hook personalizado para obtener sensores
export function useSensores() {
    const [sensores, setSensores] = useState(null);
    const [error, setError] = useState(null);

    // Función para obtener los sensores
    const fetchSensor = useCallback(async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/sensor/`, {
                headers: {
                    Authorization: `Token cfc8340bc8d44383934ef380d4a9f71c26305ad6`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al consumir la API');
            }

            const data = await response.json();
            setSensores(data.results); // Suponiendo que los datos están en data.results
        } catch (err) {
            setError(err.message);
        }
    }, []);

    useEffect(() => {
        fetchSensor();
    }, []); // Dependencias para volver a cargar cuando cambian iduser o token

    return {
        sensores,
        error,
        fetchSensor,
    };
}
