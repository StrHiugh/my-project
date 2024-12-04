import React, {useEffect, useMemo, useState} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button, Pagination, Card, CardBody,
} from "@nextui-org/react";
import {Plus,} from "lucide-react";
import "./Proceso.css"
import {useNavigate} from 'react-router-dom';
import AddProceso from "./AddProceso.jsx";
import {useProceso} from "../composables/useProceso.jsx";

function Proceso() {
    const [processes, setProcesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalBackdrop, setModalBackdrop] = useState('blur');
    const navigate = useNavigate();
    const { fetchProceso, postProceso } = useProceso();
    const [rowsPerPage] = useState(10);

    // Función para obtener los procesos usando el hook
    const getProcesses = async () => {
        try {
            const data = await fetchProceso(); // Usa el hook para obtener los procesos
            setProcesses(data.results);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProcesses(); // Llama a la función al cargar el componente
    }, []);

    const handleAddProceso = async (nuevoProceso) => {
        try {
            const data = await postProceso(nuevoProceso);
            await getProcesses();  // Reutiliza la función que obtienes los datos

        } catch (error) {
            console.error("Error al agregar el proceso", error);
        }
    };


    const columns = [
        {name: "ID", uid: "id"},
        {name: "Nombre", uid: "name"},
        {name: "Descripción", uid: "description"},
        {name: "Acciones", uid: "actions"},
    ];

    const renderCell = (item, columnKey) => {
        switch (columnKey) {
            case "id":
                return item.id;
            case "name":
                return item.nombre;
            case "description":
                return item.descripcion;
            case "actions":
                return <Button color="secondary" onPress={() => navigate(`/PanelProcess/${item.id}`, { state: { nombre: item.nombre } })}>Ver</Button>;
            default:
                return null;
        }
    };

    // Paginación para process
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Elementos por página
    const totalPages = Math.ceil(processes.length / itemsPerPage);

    const paginatedData = Array.isArray(processes) ? processes.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ): [];

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between gap-3 items-end">
                    <h1 className="pro-text">Tarea</h1>
                    <Button color="secondary" endContent={<Plus/>} onPress={() => setModalOpen(true)}>
                        Nueva Tarea
                    </Button>
                </div>
            </div>
        );
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div className="proceso">
            {topContent}
            <Card>
                <CardBody>
                    <Table aria-label="Tabla de Procesos">
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={Array.isArray(paginatedData) ? paginatedData : []}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div className="flex w-full justify-center mt-4">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={currentPage}
                            total={totalPages}
                            onChange={handlePageChange}
                        />
                    </div>
                </CardBody>
            </Card>
            <AddProceso
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                backdrop={modalBackdrop}
                setBackdrop={setModalBackdrop}
                onAddProceso={handleAddProceso} // Pasa la función al modal

            />
        </div>
    );
}

export default Proceso;
