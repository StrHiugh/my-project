import React, {useEffect, useState} from 'react';
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
import {useNavigate, useParams} from 'react-router-dom';
import {Plus} from "lucide-react";
import AddProceso from "./AddProceso.jsx";
import "./PanelProcess.css"
import {useEtapa} from "../composables/useEtapa.jsx";

export default function PanelProcess() {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalBackdrop, setModalBackdrop] = useState('blur');
    const { fkProcesoId } = useParams();
    const [etapas, setEtapas] = useState([]);
    const { fetchEtapa, loading, error } = useEtapa();

    // Encapsulamos la lógica en una función
    const obtenerDatosProcess = async () => {
        if (!fkProcesoId) return;
        try {
            const data = await fetchEtapa(fkProcesoId);
            if (data && Array.isArray(data)) {
                setEtapas(data);  // Almacena los datos obtenidos
            } else {
                console.error("Los datos obtenidos no son un array válido:", data);
            }
        } catch (error) {
            console.error("Error al obtener los datos de etapa:", error);
        }
    };

    // useEffect que solo llama a la función encapsulada cuando cambia fkProcesoId
    useEffect(() => {
        obtenerDatosProcess();
    }, [fkProcesoId]);


    console.log(etapas);
    const columns = [
        {name: "ID", uid: "id"},
        {name: "Nombre", uid: "name"},
        {name: "Estado", uid: "activo"},
        {name: "Duracion", uid: "duration"},
        {name: "Acciones", uid: "actions"},

    ];
    const renderCell = (item, columnKey) => {
        switch (columnKey) {
            case "id":
                return item.id;
            case "name":
                return item.nombre;
            case "activo":
                return item.activo;
            case "duration":
                return item.duracion;
            case "actions":
                return <Button color="secondary" onPress={() => navigate(`/PanelEtapa/${item.id}`)}>Entrar</Button>;
            default:
                return null;
        }
    };

    const topContent = (
        <div className="flex flex-col gap-4 mb-4">
            <div className="flex justify-between gap-3 items-end">
                <h1 className="pro-text">Panel Procesos</h1>

                <Button color="secondary" endContent={<Plus/>} onPress={() => setModalOpen(true)}>
                    Nueva Etapa
                </Button>
            </div>
        </div>
    );

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
                        <TableBody items={etapas}>
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