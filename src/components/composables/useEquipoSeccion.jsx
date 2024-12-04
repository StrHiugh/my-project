import {useCallback, useEffect, useState} from "react";
import {useAuth} from "./useAuth.jsx";



export function useSeccionEquipo(fkequipo) {
    const [equipoData, setEquipoData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { getToken } = useAuth();
    const token = getToken();
    const fetchSeccionEquipo = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/seccionEquipo/?fkequipo=${fkequipo}`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al consumir la API');
            }

            const data = await response.json();
            setEquipoData(data.results);  // Guarda los datos del equipo
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [fkequipo]);

    useEffect(() => {
        if (fkequipo) {
            fetchSeccionEquipo();
        }
    }, [fkequipo, fetchSeccionEquipo]);

    return { equipoData, loading, error };
    }