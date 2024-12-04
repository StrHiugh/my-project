import {useEquipo} from "../composables/useEquipo.jsx";
import React, {useEffect, useMemo, useState} from "react";
import {
    Button,
    Card, CardBody,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {Plus} from "lucide-react";
import AddProceso from "../proceso/AddProceso.jsx";
import {useNavigate} from "react-router-dom";
import AddEquipo from "./AddEquipo.jsx";
import "./equipo.css"
export default function Equipo() {
    const {equipos, setEquipos, fetchEquipos, postEquipos} = useEquipo(); // Obtiene equipos y error
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalBackdrop, setModalBackdrop] = useState('blur');
    const navigate = useNavigate();


    // Función para obtener los equipos usando el hook
    const getEquipos = async () => {
        try {
            const data = await fetchEquipos(); // Usa el hook para obtener los equipos
        } catch (error) {
            console.log("Error:" + error.message);
        }
    };

    // Llamada a getEquipos dentro de useEffect para cargar los equipos al montar el componente
    useEffect(() => {
        getEquipos();
    }, []);

    const handleAddEquipo = async (nuevoEquipo) => {
        try {
            const data = await postEquipos(nuevoEquipo);
            await getEquipos();  // Reutiliza la función que obtienes los datos

        } catch (error) {
            console.error("Error al agregar el proceso", error);
        }
    };



    const columns = [
        {name: "ID", uid: "id"},
        {name: "Nombre", uid: "name"},
        {name: "Descripcion", uid: "descripcion"},
        {name: "Planta", uid: "planta"},
        {name: "Acciones", uid: "actions"},
    ];

    const renderCell = (item, columnKey) => {
        switch (columnKey) {
            case "id":
                return item.id;
            case "name":
                return item.nombre;
            case "descripcion":
                return item.descripcion;
            case "planta":
                return item.fkplanta_nombre;
            case "actions":
                return <Button color="secondary" onPress={() => navigate(`/PanelEquipo/${item.id}`)}>Ver</Button>;
            default:
                return null;
        }
    };

    // Paginación para process
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Elementos por página
    const totalPages = Math.ceil(equipos.length / itemsPerPage);

    const paginatedData = Array.isArray(equipos) ? equipos.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) : [];

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between gap-3 items-end">
                    <h1 className="pro-text">Totems</h1>
                    <Button color="secondary" endContent={<Plus/>} onPress={() => setModalOpen(true)}>
                        Nuevo Totem
                    </Button>
                </div>
            </div>
        );
    }, []);





    return (
        <div className="equipo">
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
            <AddEquipo
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                backdrop={modalBackdrop}
                setBackdrop={setModalBackdrop}
                onAddEquipo={handleAddEquipo} // Pasa la función al modal


            />
        </div>

);
}