import React, {useMemo, useState} from 'react';
import {
    BreadcrumbItem,
    Breadcrumbs,
    Button,
    Card,
    CardBody, CardHeader, Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {useNavigate} from 'react-router-dom';
import {Plus} from "lucide-react";
import AddProceso from "./AddProceso.jsx";
import "./PanelProcess.css"

export default function PanelProcess() {
    const navigate = useNavigate();  // Inicializa el hook para redirección
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalBackdrop, setModalBackdrop] = useState('blur');


    const columns = [
        {name: "ID", uid: "id"},
        {name: "Nombre", uid: "name"},
        {name: "Estado", uid: "activo"},
        {name: "Duracion", uid: "duration"},
        {name: "Acciones", uid: "actions"},

    ];
    const processes = [         // datos de ejemplo
        {id: 1, name: "Proceso 1", activo: 2, duration: "3 días"},
        {id: 2, name: "Proceso 2", activo: 3, duration: "1 semana"},

    ];
    const renderCell = (item, columnKey) => {
        switch (columnKey) {
            case "id":
                return item.id;
            case "name":
                return item.name;
            case "activo":
                return item.activo;
            case "duration":
                return item.duration;
            case "actions":
                return <Button color="secondary" onPress={() => navigate(`/PanelEtapa`)}>Entrar</Button>;
            default:
                return null;
        }
    };

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between gap-3 items-end">
                    <h1 className="pro-text">Panel Procesos</h1>

                    <Button color="secondary" endContent={<Plus/>} onPress={() => setModalOpen(true)}>
                        Nueva Etapa
                    </Button>
                </div>
            </div>
        );
    }, []);

    return (

        <div>
            <Breadcrumbs variant="solid">
                <BreadcrumbItem onPress={() => navigate(`/`)}>Proceso</BreadcrumbItem>
                <BreadcrumbItem>Panel Proceso</BreadcrumbItem>
            </Breadcrumbs>
            {topContent}
            <Card>
                <CardHeader>
                    <h2 className="panel">Proceso Actual: Etapa 1</h2>
                </CardHeader>
                <CardBody>
                    <Table aria-label="Tabla de Procesos">
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.uid}>
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={processes}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div className="flex w-full justify-center mt-4">
                        <Pagination isCompact showControls showShadow color="secondary" page={1} total={10}/>
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
    )
        ;
}