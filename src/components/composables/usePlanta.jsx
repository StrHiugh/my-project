import {useState, useEffect, useCallback} from 'react';

export function usePlanta() {
    const [plantas, setPlantas] = useState(null);
    const [error, setError] = useState(null);

    const fetchPlantas = useCallback(async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/planta/`, {
                headers: {
                    Authorization: `Token cfc8340bc8d44383934ef380d4a9f71c26305ad6`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al consumir la API');
            }

            const data = await response.json();
            setPlantas(data.results); // Guarda los datos obtenidos en el estado
            return data.results;
        } catch (error) {
            setError(error.message); // Guarda el mensaje de error en el estado
            console.error(error);

        }
    },[]);

    // Puedes usar useEffect si deseas cargar las plantas cuando el componente se monta
    useEffect(() => {
        fetchPlantas();
    }, []); // Dependencias para volver a cargar cuando cambian iduser o token

    return {
        plantas,
        error,
        fetchPlantas, // Devuelve la función si necesitas llamarla manualmente
    };
}
