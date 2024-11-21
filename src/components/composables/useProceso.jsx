// hooks/useProceso.js

export function useProceso() {

    // Método para obtener procesos (GET)
    const fetchProceso = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/proceso/`, {
                headers: {
                    Authorization: `Token cfc8340bc8d44383934ef380d4a9f71c26305ad6`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al consumir la API');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error; // Lanza el error para manejarlo más tarde
        }
    };

    // Método para crear un nuevo proceso (POST)
    const postProceso = async (proceso) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/proceso/registro/`, {
                method: 'POST',
                headers: {
                    Authorization: `Token cfc8340bc8d44383934ef380d4a9f71c26305ad6`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(proceso),
            });

            if (!response.ok) {
                throw new Error('Error al crear el proceso');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error; // Lanza el error para manejarlo más tarde
        }
    };

    return {
        fetchProceso,
        postProceso,
    };
}
