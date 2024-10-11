import { useState, useEffect } from 'react';
import {useSeccionEquipo} from "./useEquipoSeccion.jsx";
export const useEtapa = () => {
    const [etapaData, setEtapaData] = useState(null);
    const [etapaFkProceso, setFkProceso] = useState(null);
    const [etapaDetail, setEtapaDetail] = useState(null);  // Para almacenar los datos de fetchEtapaid
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Función para obtener etapas por fkProcesoId
    async function fetchEtapa(fkProcesoId) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/etapa/?fkProceso=${fkProcesoId}`, {
                headers: {
                    Authorization: `Token cfc8340bc8d44383934ef380d4a9f71c26305ad6`,
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


    // Función para obtener etapa específica por id
    async function fetchEtapaId(fkEtapaId) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/etapa/?id=${fkEtapaId}`, {
                headers: {
                    Authorization: `Token cfc8340bc8d44383934ef380d4a9f71c26305ad6`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al consumir la API');
            }

            const data = await response.json();
            console.log("Respuesta de la API:", data); // Verifica la respuesta aquí

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

            console.log('Objeto Principal:', etapaPrincipal);
            console.log('Objeto fkProceso:', fkProceso.fkequipo);

            const etapaNombre = etapa?.nombre;  // Obtenemos el nombre del proceso
            const fkequipo = fkProceso?.fkequipo; // Obtén fkequipo del fkProceso
            if (fkequipo) {
                // Aquí se debería ejecutar fetchSeccionEquipo directamente
                return { etapaData: etapaPrincipal, fkequipo, etapaNombre}; // Retorna la etapa y el fkequipo
            }
            return { etapaData: etapaPrincipal, fkequipo: null };         } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    // Retornar ambas funciones y los estados relevantes
    return {
        fetchEtapa,
        fetchEtapaId,
        setEtapaDetail,
        etapaData,
        loading,
        error
    };
};