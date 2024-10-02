import { useState } from 'react';

// Hook personalizado para obtener lecturas de etapa
export function useLecturaEtapa() {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const token = 'cfc8340bc8d44383934ef380d4a9f71c26305ad6';

    // Función para obtener las lecturas por etapa
    async function fetchLectura(fkEtapaId) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/lectura/?fkEtapa=${fkEtapaId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Token ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Error al consumir la API');
            }

            const data = await response.json();
            setData(data.results);

            //obtener id del sensor
            const groupedData = data.results.reduce((acc, item) => {
                const sensorId = item.fkESeccionEquipoSensor.id; // Acceder al ID del sensor
                if (!acc[sensorId]) {
                    acc[sensorId] = [];
                }
                acc[sensorId].push(item); // Añadir el dato a la agrupación correspondiente
                return acc;
            }, {});

            // Para cada sensorId encontrado en la agrupación, hacemos la petición
            for (const sensorId in groupedData) {
                if (Object.prototype.hasOwnProperty.call(groupedData, sensorId)) {
                    console.log(`Realizando petición para sensorId: ${sensorId}`);

                    // Ahora, haces la petición específica para este sensorId
                    const sensorData = await fetchLecturaEquipo(fkEtapaId, sensorId);
                    console.log(`Datos obtenidos para sensor ${sensorId}:`, sensorData);
                }
            }


            return groupedData;
        } catch (err) {
            setError(err.message);
            throw new Error(err.message);
        }
    }



    // Función para obtener lecturas de un equipo específico
    async function fetchLecturaEquipo(fkEtapaId, fkESeccionEquipoSensor) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/lectura/?fkEtapa=${fkEtapaId}&fkESeccionEquipoSensor=${fkESeccionEquipoSensor}`, {
                method: 'GET',
                headers: {
                    Authorization: `Token ${token}`,
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
