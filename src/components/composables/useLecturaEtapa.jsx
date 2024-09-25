import { useState } from 'react';

// Hook personalizado para obtener lecturas de etapa
export function useLecturaEtapa() {
    const [error, setError] = useState(null); // Para manejar errores
    const [data, setData] = useState(null);   // Para almacenar los datos obtenidos
    const token = 'cfc8340bc8d44383934ef380d4a9f71c26305ad6'; // Reemplaza con el token que mencionaste

    // Función para obtener las lecturas por etapa
    async function fetchLectura(fkEtapaId) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/lectura/?fkEtapa=${fkEtapaId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Token ${token}`,  // Autenticación con el token proporcionado
                }
            });

            if (!response.ok) {
                throw new Error('Error al consumir la API');
            }

            const data = await response.json();
            setData(data.results);  // Actualiza los datos obtenidos
            return data;
        } catch (err) {
            setError(err.message);  // Captura el error
            throw new Error(err.message);
        }
    }

    // Función para obtener lecturas de un equipo específico
    async function fetchLecturaEquipo(fkEtapaId, fkESeccionEquipoSensor) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/lectura/?fkEtapa=${etapa}&fkESeccionEquipoSensor=${fkESeccionEquipoSensor}`, {
                method: 'GET',
                headers: {
                    Authorization: `Token ${token}`,  // Autenticación con el token proporcionado
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Error al consumir la API');
            }

            const data = await response.json();
            setData(data);  // Actualiza los datos obtenidos
            return data;
        } catch (err) {
            setError(err.message);  // Captura el error
            throw new Error(err.message);
        }
    }

    return {
        data,
        error,
        fetchLectura,
        fetchLecturaEquipo
    };
}
