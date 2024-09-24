import React, {useEffect, useMemo, useState} from 'react';
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

export default function PanelProcess() {
    const navigate = useNavigate();  // Inicializa el hook para redirección
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalBackdrop, setModalBackdrop] = useState('blur');
    const { fkProcesoId } = useParams();  // Obtén el id del proceso de la URL
    const [etapas, setEtapas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEtapa = async (fkProcesoId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/etapa/?fkProceso=${fkProcesoId}`, {
                headers: {
                    Authorization: `Token cfc8340bc8d44383934ef380d4a9f71c26305ad6`,
                },
            });

            if (!response.ok) {
                throw new Error("Error al consumir la API");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw new Error("Error al obtener las etapas");
        }
    };

    useEffect(() => {
        if (fkProcesoId) {  // Solo hacer fetch si fkProcesoId está definido
            setLoading(true);
            fetchEtapa(fkProcesoId)
                .then(data => {
                    setEtapas(data.results);  // Asegúrate de que data.results contenga lo que esperas
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        } else {
            setError("No se proporcionó un ID de proceso válido");
        }
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
                return <Button color="secondary" onPress={() => navigate(`/PanelEtapa/${item.id}/${item.fkProceso.fkequipo}`)}>Entrar</Button>;
            default:
                return null;
        }
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
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