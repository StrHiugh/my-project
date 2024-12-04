import { useState, useEffect } from 'react';
import {useSeccionEquipo} from "./useEquipoSeccion.jsx";
import {useAuth} from "./useAuth.jsx";
export const useEtapa = () => {
    const [etapaData, setEtapaData] = useState(null);
    const [etapaFkProceso, setFkProceso] = useState(null);
    const [etapaDetail, setEtapaDetail] = useState(null);  // Para almacenar los datos de fetchEtapaid
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { getToken } = useAuth();
    const token = getToken();

    // Función para obtener etapas por fkProcesoId
    async function fetchEtapa(fkProcesoId) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/etapa/?fkProceso=${fkProcesoId}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Error al consumir la API");
            }

            const data = await response.json();
            setEtapaData(data.results);
            return data.results; // Devuelve solo las etapas si no hay fkequipo
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }


    // Función para obtener planta específica por id
    async function fetchEtapaId(fkEtapaId) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/etapa/?id=${fkEtapaId}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al consumir la API');
            }

            const data = await response.json();

            if (!data || data.results.length === 0) {
                throw new Error('No se encontraron datos en la respuesta');
            }

            const etapa = data.results[0];

            const etapaPrincipal = {
                id: etapa.id,
                nombre: etapa.nombre,
                activo: etapa.activo,
                duracion: etapa.duracion,
                created_at: etapa.created_at,
                createdTime_at: etapa.createdTime_at,
                updated_at: etapa.updated_at,
            };

            const fkProceso = etapa.fkProceso;
            const etapaNombre = etapa?.nombre;  // Obtenemos el nombre del proceso
            const fkequipo = fkProceso?.fkequipo; // Obtén fkequipo del fkProceso
            const duracion = etapa?.duracion; // Obtén fkequipo del fkProceso
            const created = etapa?.created_at; // Obtén fkequipo del fkProceso
            const hora = etapa?.createdTime_at; // Obtén fkequipo del fkProceso
            const estatus = etapa?.activo; // Obtén fkequipo del fkProceso
            if (fkequipo) {
                // Aquí se debería ejecutar fetchSeccionEquipo directamente
                return { etapaData: etapaPrincipal, fkequipo, etapaNombre, duracion, created, hora, estatus}; // Retorna la planta y el fkequipo
            }
            return { etapaData: etapaPrincipal, fkequipo: null };         } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // Función para crear una nueva planta
    async function postEtapa(fkprocesoId, nuevaEtapa) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/etapa/registro/`, {
                method: 'POST',
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fkProceso: fkprocesoId, //  ID del proceso
                    ...nuevaEtapa //   datos de nuevaEtapa
                })
            });

            if (!response.ok) {
                const errorResponse = await response.json(); // Obtener respuesta de error
                throw new Error(`Error al crear el proceso: ${errorResponse.message}`);
            }

            const data = await response.json();
            return data; // Retorna la nueva planta creada
        } catch (err) {
            setError(err.message);
        }
    }

    // Función para actualizar una planta existente
    async function putEtapa(fkEtapaId, estado) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/etapa/${fkEtapaId}/`, {
                method: 'PUT',
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({activo: estado }) // Envía el nuevo estado
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el proceso');
            }

            const data = await response.json();
            return data; // Retorna la planta actualizada
        } catch (err) {
            setError(err.message);
        }
    }




    // Retornar ambas funciones y los estados relevantes
    return {
        fetchEtapa,
        fetchEtapaId,
        postEtapa,
        putEtapa,
        setEtapaDetail,
        etapaData,
        loading,
        error
    };
};