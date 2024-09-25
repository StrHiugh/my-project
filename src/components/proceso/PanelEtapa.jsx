import React, {useCallback, useEffect, useMemo, useState} from "react";
import { Tabs, Tab, Card, CardBody, Button, BreadcrumbItem, Breadcrumbs, CardHeader, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import {Blocks,} from "lucide-react";

import { useEtapa } from "../composables/useEtapa.jsx";
import { useSeccionEquipo } from "../composables/useEquipoSeccion.jsx";
import GaugeRadial from "../charts/GaugeRadial.jsx";
import AreaGraphic from "../charts/AreaGraphic.jsx";
import {useLecturaEtapa} from "../composables/useLecturaEtapa.jsx";

export default function PanelEtapa() {
    const navigate = useNavigate();
    const { fkEtapaId } = useParams();
    const [lecturaDatas, setLecturaData] = useState([]);
    const [fkequipo, setFkequipo] = useState(null);
    const { fetchEtapaId } = useEtapa();
    const { equipoData} = useSeccionEquipo(fkequipo);
    const {fetchLectura } = useLecturaEtapa();

    // Función para obtener los datos de la etapa
    const obtenerDatosEtapa = async () => {
        if (!fkEtapaId) return; // Evita la llamada si fkEtapaId es null o undefined
        try {
            const {fkequipo } = await fetchEtapaId(fkEtapaId);
            console.log("ID de equipo:", fkequipo);

            if (fkequipo) {
                setFkequipo(fkequipo); // Establece el fkequipo
            }
        } catch (error) {
            console.error("Error al obtener los datos de etapa:", error);
        }
    };

    // Función para obtener las lecturas de la API
    const obtenerLecturas = async () => {
        if (!fkEtapaId) return; // Evita la llamada si fkEtapaId es null o undefined
        try {
            const data = await fetchLectura(fkEtapaId);
            console.log("Datos de la API:", data);

            if (data) {
                setLecturaData(data);
                console.log(lecturaDatas)
            }

        } catch (error) {
            console.error("Error al consumir la API:", error);
        }
    };

    useEffect(() => {
        obtenerDatosEtapa();
    }, [fkEtapaId]);
    useEffect(() => {
        obtenerLecturas();
    }, [fkEtapaId]);




        const columns = [
            {name: "ID", uid: "id"},
            {name: "Nombre", uid: "name"},
            {name: "Equipo", uid: "equip"},
            {name: "Acciones", uid: "actions"},

        ];

    const renderCell = (item, columnKey) => {
        switch (columnKey) {
            case "id":
                return item.id;
            case "name":
                return item.nombre;
            case "equip":
                return item.fkequipo_nombre;
            case "actions":
                return <Button color="secondary" >Sensores</Button>;
            default:
                return null;
        }
    };

    //paginacion
    const columnsLecturas = [
        { name: "ID", uid: "id" },
        { name: "Valor", uid: "value" },
        { name: "Sensor", uid: "sensor" },
    ];

    const renderCellLecturas = (item, columnKey) => {
        switch (columnKey) {
            case "id":
                return item.id;
            case "value":
                return item.valor;
            case "sensor":
                return item.fkESeccionEquipoSensor.fkseccionEquipo_nombre;
            default:
                return null;
        }
    };

    // Paginación para lecturas
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Elementos por página

    const totalPages = Math.ceil((lecturaDatas?.length || 0) / itemsPerPage);

    const paginatedData = lecturaDatas.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Paginación para equipo
    const [currentPageEquipo, setCurrentPageEquipo] = useState(1);
    const itemsPerPageEquipo = 10;

    const totalPagesEquipo = Math.ceil((equipoData?.length || 0) / itemsPerPageEquipo);

    const paginatedEquipoData = (equipoData || []).slice(
        (currentPageEquipo - 1) * itemsPerPageEquipo,
        currentPageEquipo * itemsPerPageEquipo
    );

    const handlePageChangeEquipo = (page) => {
        setCurrentPageEquipo(page);
    };

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between gap-3 items-end">
                    <h1 className="pro-text">Panel Etapa</h1>

                    <Button color="secondary" endContent={<Blocks/>}>
                        Desactivar
                    </Button>
                </div>
            </div>
        );
    }, []);

    return (
        <div>
            <Breadcrumbs variant="solid">
                <BreadcrumbItem onPress={() => navigate(`/`)}>Proceso</BreadcrumbItem>
                <BreadcrumbItem onPress={() => navigate(`/PanelProcess`)}>Panel Proceso</BreadcrumbItem>
                <BreadcrumbItem>Panel Etapa</BreadcrumbItem>
            </Breadcrumbs>
            {topContent}
            <div>
                <Tabs aria-label="Options" color="secondary">
                    <Tab key="equipos" title="Sección Equipo">
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
                                    <TableBody items={Array.isArray(paginatedEquipoData) ? paginatedEquipoData : []}>
                                        {(item) => (
                                            <TableRow key={item.id}>
                                                {(columnKey) =>
                                                    <TableCell>{renderCell(item, columnKey)}</TableCell>}
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
                                        page={currentPageEquipo}
                                        total={totalPagesEquipo}
                                        onChange={handlePageChangeEquipo}
                                    />
                                </div>
                            </CardBody>

                        </Card>
                    </Tab>


                    <Tab key="graphics" title="Gráficas">
                        <Card>
                            <CardBody>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '20px'
                                }}>
                                    <div>
                                        <GaugeRadial labels="pH" series={47.5} labelColor='#7827c8'/>
                                        <Button color="secondary">
                                            Recargar Datos
                                    </Button>
                                </div>
                                <div>
                                    <GaugeRadial labels="Oxigeno Disuelto" series={52.5} labelColor='#7827c8' />
                                    <Button color="secondary">
                                        Recargar Datos
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-16">
                                <AreaGraphic lecturaDatas={lecturaDatas} />
                            </div>
                            </CardBody>
                        </Card>
                    </Tab>


                    <Tab key="data" title="Lecturas">
                        <Card>
                            <CardHeader>
                                <h2 className="panel">Proceso Actual: Etapa 1</h2>
                            </CardHeader>
                            <CardBody>
                                <Table aria-label="Tabla de Procesos">
                                    <TableHeader columns={columnsLecturas}>
                                        {(column) => (
                                            <TableColumn key={column.uid}>
                                                {column.name}
                                            </TableColumn>
                                        )}
                                    </TableHeader>
                                    <TableBody items={Array.isArray(paginatedData) ? paginatedData: []}>
                                        {(item) => (
                                            <TableRow key={item.id}>
                                                {(columnKey) =>
                                                    <TableCell>{renderCellLecturas(item, columnKey)}</TableCell>}
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
                                        onChange={handlePageChange}/>
                                </div>
                            </CardBody>

                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </div>

    );
}