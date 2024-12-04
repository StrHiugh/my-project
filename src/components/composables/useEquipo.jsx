// hooks/useEquipo.js
import {useCallback, useEffect, useState} from 'react';

export function useEquipo() {
    const [equipos, setEquipos] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');

    // Método para obtener equipos (GET)
    const fetchEquipos = useCallback(async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/equipo/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al consumir la API');
            }

            const data = await response.json();
            setEquipos(data.results);
            return data.results; // Devuelve solo las etapas si no hay fkequipo

        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    },[]); // No hay dependencias, se mantendrá estable

    // Método para crear un nuevo equipo (POST)
    const postEquipos = async (equipo) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/equipo/registro/`, {
                method: 'POST',
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(equipo),
            });

            if (!response.ok) {
                throw new Error('Error al crear el equipo');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    useEffect(() => {
        fetchEquipos(); // Llama a fetchEquipos cuando el componente se monte
    }, []); // Si necesitas que esto se ejecute de nuevo, añade dependencias

    return {
        equipos,
        error,
        fetchEquipos,
        postEquipos,
    };
}
