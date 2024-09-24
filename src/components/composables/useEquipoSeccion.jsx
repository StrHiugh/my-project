import { useState, useCallback } from 'react';

export function useSeccionEquipo() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Simulación de authStore. En tu caso, puedes usar contexto o algún hook de autenticación.
    const authStore = {
        token: 'tu-token-aqui',
        user: { id: 'tu-id-de-usuario-aqui' },
    };

    // Función para realizar la petición fetch, memoizada para evitar recreaciones innecesarias
    const fetchSeccionEquipo = useCallback(async (fkequipo) => {
        setLoading(true); // Activa el loading mientras la petición está en curso
        setError(null);   // Reinicia el estado de error

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/seccionEquipo/?fkequipo=${fkequipo}`, {
                headers: {
                    Authorization: `Token ${authStore.token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al consumir la API');
            }

            const data = await response.json();
            setData(data);   // Actualiza el estado con los datos obtenidos
        } catch (err) {
            setError(err.message);  // Maneja el error
        } finally {
            setLoading(false);  // Desactiva el loading cuando finaliza la petición
        }
    }, [authStore.token]);  // Memoiza la función basada en el token

    return {
        data,
        loading,
        error,
        fetchSeccionEquipo, // Retorna la función para poder usarla en tus componentes
    };
}
