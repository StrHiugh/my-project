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
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {Plus} from "lucide-react";
import AddEtapa from "./AddEtapa.jsx";
import "./PanelProcess.css"
import {useEtapa} from "../composables/useEtapa.jsx";

export default function PanelProcess() {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalBackdrop, setModalBackdrop] = useState('blur');
    const {fkProcesoId} = useParams();
    const [etapas, setEtapas] = useState([]);
    const {fetchEtapa} = useEtapa();
    const {postEtapa} = useEtapa();
    const location = useLocation(); // Para obtener el nombre del proceso


    // Obtener el nombre del proceso del estado (si está disponible)
    const nombreProceso = location.state?.nombre || 'Desconocido';


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

    function convertirADuracionEnMilisegundos(duracion) {
        const partes = duracion.split(':');
        const horas = parseInt(partes[0], 10) || 0;
        const minutos = parseInt(partes[1], 10) || 0;
        const segundos = parseInt(partes[2], 10) || 0;

        return (horas * 3600 + minutos * 60 + segundos) * 1000; // Convertir a milisegundos
    }

    const handleAddEtapa = async (nuevaEtapa) => {
        console.log("fkProcesoId:", fkProcesoId);
        console.log("nuevaEtapa:", nuevaEtapa); // Verifica el contenido de nuevaEtapa
        try {
            const data = await postEtapa(fkProcesoId, nuevaEtapa);
            console.log("Nueva etapa creada:", data);
            await obtenerDatosProcess();  // Reutiliza la función que obtienes los datos

        } catch (error) {
            console.error("Error al agregar la etapa:", error);
        }
    };

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

    // Paginación para etapas
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Elementos por página
    const totalPages = Math.ceil((etapas?.length || 0) / itemsPerPage);

    // Asegúrate de que etapas es un array
    const paginatedData = Array.isArray(etapas) ? etapas.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) : [];

    const handlePageChange = (page) => {
        setCurrentPage(page);
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
                    <h2 className="panel">Proceso Actual: {nombreProceso}</h2>
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
            <AddEtapa
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                backdrop={modalBackdrop}
                setBackdrop={setModalBackdrop}
                onAddEtapa={handleAddEtapa} // Pasa la función al modal
            />
        </div>
    )
        ;
}