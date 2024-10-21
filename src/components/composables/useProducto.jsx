import {useState, useCallback, useEffect} from 'react';

// Hook personalizado para manejar productos
export function useProducto() {
    const [productos, setProductos] = useState(null);
    const [error, setError] = useState(null);

    // Función para obtener productos (GET)
    const fetchProducto = useCallback(async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/producto/`, {
                headers: {
                    Authorization: `Token cfc8340bc8d44383934ef380d4a9f71c26305ad6`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al consumir la API');
            }

            const data = await response.json();
            setProductos(data.results); // Suponiendo que los datos están en data.results
        } catch (err) {
            setError(err.message);
        }
    }, []);

    useEffect(() => {
        fetchProducto();
    }, []); // Dependencias para volver a cargar cuando cambian iduser o token

    // Función para crear un nuevo producto (POST)
    const postProducto = useCallback(async (producto) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/producto/registro/`, {
                method: 'POST',
                headers: {
                    Authorization: `Token cfc8340bc8d44383934ef380d4a9f71c26305ad6`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: producto.nombre,
                    descripcion: producto.descripcion || null,
                    usuario: producto.usuario || null,
                    fotografia: producto.fotografia,
                    valores: producto.valores.map(valor => ({
                        nombre: valor.nombre,
                        valorMaximo: valor.valorMaximo || null,
                        valorMinimo: valor.valorMinimo || null,
                    })),
                }),
            });

            if (!response.ok) {
                throw new Error('Error al crear el producto');
            }

            const data = await response.json();
            return data;
        } catch (err) {
            setError(err.message);
        }
    }, []);

    // Función para obtener los valores de un producto específico (GET)
    const fetchProductoValores = useCallback(async (idProducto) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/valoresproducto/?producto=${idProducto}`, {
                headers: {
                    Authorization: `Token cfc8340bc8d44383934ef380d4a9f71c26305ad6`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al consumir la API');
            }

            const data = await response.json();
            return data;
        } catch (err) {
            setError(err.message);
        }
    }, []);

    return {
        productos,
        error,
        fetchProducto,
        postProducto,
        fetchProductoValores,
    };
}
