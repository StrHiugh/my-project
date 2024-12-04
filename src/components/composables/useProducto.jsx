import {useState, useCallback, useEffect} from 'react';
import {useAuth} from "./useAuth.jsx";

// Hook personalizado para manejar productos
export function useProducto() {
    const [productos, setProductos] = useState(null);
    const [error, setError] = useState(null);
    const [valores, setValores] = useState([]);
    const { getToken } = useAuth();
    const token = getToken();

    // Función para obtener productos (GET)
    const fetchProducto = useCallback(async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/producto/`, {
                headers: {
                    Authorization: `Token ${token}`,
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
    const postProducto = useCallback(async (nuevoProduto) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/producto/registro/`, {
                method: 'POST',
                headers: {
                    Authorization: `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: nuevoProduto.nombre,
                    descripcion: nuevoProduto.descripcion || null,
                    usuario: nuevoProduto.usuario_id,
                    fotografia: nuevoProduto.fotografia || null,
                    etapa: nuevoProduto.etapa || null,
                    valores: nuevoProduto.valores.map(valor => ({
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
                    Authorization: `Token ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Error al consumir la API');
            }

            const data = await response.json();
            setValores(data);  // Guarda los datos obtenidos en el estado
        } catch (err) {
            setError(err.message);  // Manejo de errores
        }
    }, []);  // Dependencias vacías para que solo se defina una vez

    return {
        productos,
        error,
        fetchProducto,
        postProducto,
        fetchProductoValores,
    };
}
