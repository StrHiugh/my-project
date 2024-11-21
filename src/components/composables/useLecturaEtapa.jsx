import {useEffect, useState} from 'react';

// Hook personalizado para obtener lecturas de planta
export function useLecturaEtapa() {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const [dataGeneral, setDataGeneral] = useState(null);
    const token = 'cfc8340bc8d44383934ef380d4a9f71c26305ad6';
    const [groupedDataG, setGroupedDataG] = useState(null);
    // Función para obtener las lecturas por planta
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

    // Función para obtener todas las lecturas
    async function fetchLecturaGeneral() {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/lectura/`, {
                method: 'GET',
                headers: {
                    Authorization: `Token ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error('Error al consumir la API');
            }

            const data = await response.json();
            setDataGeneral(data.results);

            // Agrupar datos por sensorId

            const groupedData = data.results.reduce((acc, item) => {
                const sensorId = item.fkESeccionEquipoSensor.id; // Acceder al ID del sensor
                if (!acc[sensorId]) {
                    acc[sensorId] = [];
                }
                acc[sensorId].push(item); // Añadir el dato a la agrupación correspondiente
                return acc;
            }, {});
            setGroupedDataG(groupedData);


            // Ahora, usar groupedData en lugar de groupedDataG en el ciclo for
            for (const sensorId in groupedData) {
                if (Object.prototype.hasOwnProperty.call(groupedData, sensorId)) {
                    console.log(`Realizando petición para sensorId: ${sensorId} y etapaId: ${groupedData[sensorId][0].fkEtapa}`);

                    // Hacer la petición específica para este sensorId y etapaId
                    const sensorData = await fetchLecturaEquipo(groupedData[sensorId][0].fkEtapa, sensorId); // Enviar el etapaId y el sensorId
                    console.log(`Datos obtenidos para sensor ${sensorId}:`, sensorData);
                }
            }

            return groupedData;
        } catch (err) {
            setError(err.message);
            console.error("Error en fetchLecturaGeneral:", err); // Registro adicional
        }
    }

    useEffect(() => {
        fetchLecturaGeneral().catch(err => console.error("Error en fetchLecturaGeneral:", err));
    }, []);


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
        dataGeneral,
        error,
        fetchLectura,
        fetchLecturaGeneral,
        fetchLecturaEquipo,
        groupedDataG
    };
}
