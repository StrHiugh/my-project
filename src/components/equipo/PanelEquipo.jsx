import React, {useEffect, useMemo, useState} from "react";
import {
    BreadcrumbItem, Breadcrumbs,
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
import AddEquipo from "./AddEquipo.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useSeccionEquipo} from "../composables/useEquipoSeccion.jsx";

export default function PanelEquipo() {

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalBackdrop, setModalBackdrop] = useState('blur');
    const navigate = useNavigate();
    const { fkEquipoId } = useParams();
    const {equipoData, loading, error} = useSeccionEquipo(fkEquipoId); // Obtiene equipos y error
    console.log(equipoData);

    const columns = [
        {name: "ID", uid: "id"},
        {name: "Nombre", uid: "name"},
        {name: "Descripcion", uid: "descripcion"},
        {name: "Equipo", uid: "equip"},
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
            case "equip":
                return item.fkequipo_nombre;
            case "actions":
                return <Button color="secondary" onPress={() => navigate(`/SeccionSensor/${item.id}`)}>Ver</Button>;
            default:
                return null;
        }
    };

    // Paginación para process
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Elementos por página
    const totalPages = Math.ceil((equipoData || []).length / itemsPerPage);

    const paginatedData = Array.isArray(equipoData) ? equipoData.slice(
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
                    <h1 className="pro-text">Panel Equipo</h1>
                </div>
            </div>
        );
    }, []);





    return (
        <div>
            <Breadcrumbs variant="solid">
                <BreadcrumbItem onPress={() => navigate(`/Equipo`)}>Equipo</BreadcrumbItem>
                <BreadcrumbItem>Panel Equipo</BreadcrumbItem>
            </Breadcrumbs>
            {topContent}
            <Card>
                <CardBody>
                    <Table aria-label="Tabla de Equipos">
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
        </div>

    );
}