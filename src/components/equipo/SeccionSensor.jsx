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
import AddProceso from "../proceso/AddProceso.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useSeccionSensor} from "../composables/useSeccionSensor.jsx";
import "./seccionsensor.css"
export default function SeccionSensor() {

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalBackdrop, setModalBackdrop] = useState('blur');
    const navigate = useNavigate();
    const { fkSensorId } = useParams();
    const {data, loading, error} = useSeccionSensor(fkSensorId); // Obtiene equipos y error

    const columns = [
        {name: "ID", uid: "id"},
        {name: "Equipo de Medicion", uid: "name"},
        {name: "Sensor", uid: "sensor"},
    ];

    const renderCell = (item, columnKey) => {
        switch (columnKey) {
            case "id":
                return item.id;
            case "name":
                return item.fkseccionEquipo_nombre;
            case "sensor":
                return item.fksensor_nombre;
            default:
                return null;
        }
    };

    // Paginación para process
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Elementos por página
    const totalPages = Math.ceil((data || []).length / itemsPerPage);

    const paginatedData = Array.isArray(data) ? data.slice(
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
                    <h1 className="pro-text">Seccion Sensor</h1>
                </div>
            </div>
        );
    }, []);


    return (
        <div className="seccionSensor">
            <Breadcrumbs variant="solid">
                <BreadcrumbItem onPress={() => navigate(`/Equipo`)}>Equipo</BreadcrumbItem>
                <BreadcrumbItem onPress={() => navigate(-1)}>Panel Equipo</BreadcrumbItem>
                <BreadcrumbItem>Seccion Sensor</BreadcrumbItem>
            </Breadcrumbs>
            {topContent}
            <Card>
                <CardBody>
                    <Table aria-label="Tabla de sensores">
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={Array.isArray(paginatedData) ? paginatedData : []}>
                            {(item) => (
                                <TableRow key={`${item.id}-${Math.random()}`}>
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

            />
        </div>

    );
}