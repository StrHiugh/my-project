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
    const [etapaNombre, setEtapaNombre] = useState(null);
    const { fetchEtapaId } = useEtapa();
    const { equipoData} = useSeccionEquipo(fkequipo);
    const {fetchLectura } = useLecturaEtapa();

    // Función para obtener los datos de la etapa
    const obtenerDatosEtapa = async () => {
        if (!fkEtapaId) return; // Evita la llamada si fkEtapaId es null o undefined
        try {
            const {fkequipo, etapaNombre } = await fetchEtapaId(fkEtapaId);
            console.log("ID de equipo:", fkequipo);
            console.log("Nombre de la etapa", etapaNombre);

            if (fkequipo) {
                setFkequipo(fkequipo); // Establece el fkequipo
            }
            if (etapaNombre) {
                setEtapaNombre(etapaNombre); // Nombre del proceso
            }
        } catch (error) {
            console.error("Error al obtener los datos de etapa:", error);
        }
    };

    const recargarDatosSensores = async () => {
        const groupedData = await fetchLectura(fkEtapaId);
        if (groupedData) {
            setLecturaData(groupedData);
        }
    };

    useEffect(() => {
        obtenerDatosEtapa();
    }, [fkEtapaId]);

    useEffect(() => {
        recargarDatosSensores(); // Llama a la función cuando el componente se monte
    }, []);



    console.log("lectura data:",lecturaDatas)


    // Aplana los datos de lecturaDatas en un solo array
    const allLecturaData = Object.values(lecturaDatas).flat();

    //ultimop dato para los gauges
    const lastData = Object.entries(lecturaDatas).map(([sensorId, data]) => {
        if (data.length > 0) {
            return {
                sensorId,
                lastValue: data[data.length - 1].valor, // Cambia 'valor' por el nombre correcto de la propiedad
            };
        }
        return { sensorId, lastValue: null }; // Maneja el caso de que no haya datos
    });
    console.log(lastData);

    // Asumiendo que solo tienes dos sensores: pH y Oxígeno Disuelto
    const phData = lastData.find(sensor => sensor.sensorId === '13'); // Cambia 'pH' según el ID de tu sensor
    const oxigenoData = lastData.find(sensor => sensor.sensorId === '8'); // Cambia según el ID correcto
    const tempData = lastData.find(sensor => sensor.sensorId === '9'); // Cambia según el ID correcto






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

    const totalPages = Math.ceil((allLecturaData?.length || 0) / itemsPerPage);

    // Asegúrate de que lecturaDatas es un array
    const paginatedData = Array.isArray(allLecturaData) ? allLecturaData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) : [];

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
                <BreadcrumbItem onPress={() => navigate(-1)}>Panel Proceso</BreadcrumbItem>
                <BreadcrumbItem>Panel Etapa</BreadcrumbItem>
            </Breadcrumbs>
            {topContent}
            <div>
                <Tabs aria-label="Options" color="secondary">
                    <Tab key="equipos" title="Sensores">
                        <Card>
                            <CardHeader>
                                <div className="card-header-container">
                                    {/* Parte izquierda - Proceso Actual */}
                                    <div className="left-section">
                                        <h2 className="panel">Proceso Actual: {etapaNombre}</h2>
                                    </div>

                                    {/* Parte derecha - Fecha, Hora, Duración */}

                                </div>
                                <div className="justify-items-end">
                                    <h2>Fecha:</h2>
                                    <h2>Hora:</h2>
                                    <h2>Duración:</h2>
                                </div>
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
                            <CardHeader>
                                <h2 className="panel">Proceso Actual: {etapaNombre}</h2>
                            </CardHeader>
                            <CardBody>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: '20px'
                                }}>
                                    <div>
                                        <GaugeRadial labels="pH"
                                                     series={phData ? parseFloat(phData.lastValue) : 0}
                                                     labelColor='#7827c8'
                                                     sensorType="ph"

                                        />
                                        <Button color="secondary" onPress={recargarDatosSensores}>
                                            Recargar Datos
                                        </Button>
                                    </div>
                                    <div>
                                        <GaugeRadial labels="Oxigeno Disuelto"
                                                     series={oxigenoData ? parseFloat(oxigenoData.lastValue) : 0}
                                                     labelColor='#7827c8'
                                                     sensorType="oxygen"
                                        />

                                        <Button color="secondary" onPress={recargarDatosSensores}>
                                            Recargar Datos
                                        </Button>
                                    </div>
                                    <div>
                                        <GaugeRadial labels="Temperatura"
                                                     series={tempData ? parseFloat(tempData.lastValue) : 0}
                                                     labelColor='#7827c8'
                                                     sensorType="temperature"
                                        />
                                        <Button color="secondary" onPress={recargarDatosSensores}>
                                            Recargar Datos
                                        </Button>
                                    </div>


                                </div>
                                <div className="mt-16">
                                    {Object.entries(lecturaDatas).map(([sensorId, data]) => (
                                        <AreaGraphic key={sensorId}
                                                     lecturaDatas={data}
                                                     sensorName={data[0]?.fkESeccionEquipoSensor?.fkseccionEquipo_nombre || "Sensor Desconocido"} // Extraer el nombre del sensor
                                        />
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </Tab>


                    <Tab key="data" title="Lecturas">
                        <Card>
                            <CardHeader>
                                <h2 className="panel">Proceso Actual: {etapaNombre}</h2>
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