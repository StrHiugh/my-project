import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    Tabs,
    Tab,
    Card,
    CardBody,
    Button,
    BreadcrumbItem,
    Breadcrumbs,
    CardHeader,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Chip
} from "@nextui-org/react";
import {useNavigate, useParams} from "react-router-dom";
import {Blocks, CheckIcon,} from "lucide-react";
import {useEtapa} from "../composables/useEtapa.jsx";
import {useSeccionEquipo} from "../composables/useEquipoSeccion.jsx";
import {useLecturaEtapa} from "../composables/useLecturaEtapa.jsx";
import "./PanelEtapa.css"
import ChipStatus from "./ChipStatus.jsx";
import BreadcrumbSection from "./BreadcrumSection.jsx";
import SensorTable from "./SensorTable.jsx";
import LecturaTable from "./LecturaTable.jsx";
import GraphicsTab from "./GraphicsTab.jsx";
import { useLocation } from 'react-router-dom';

export default function PanelEtapa() {
    const navigate = useNavigate();
    const {fkEtapaId} = useParams();
    const [lecturaDatas, setLecturaData] = useState([]);
    const [fkequipo, setFkequipo] = useState(null);
    const [etapaNombre, setEtapaNombre] = useState(null);
    const [etapaDuracion, setEtapaDuracion] = useState(null);
    const [etapaFecha, setEtapaFecha] = useState(null);
    const [etapaHora, setEtapaHora] = useState(null);
    const [estatus, setEtapaEstatus] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const fkProcesoId = location.state?.fkProcesoId;
    const {fetchEtapaId} = useEtapa();
    const {putEtapa} = useEtapa();
    const {equipoData} = useSeccionEquipo(fkequipo);
    const {fetchLectura} = useLecturaEtapa();

    console.log("fk del proceso en planta: ", fkProcesoId);

    // Función para obtener los datos de la planta
    const obtenerDatosEtapa = async () => {
        if (!fkEtapaId) return; // evita la llamada si fkEtapaId es null o undefined
        try {
            const {fkequipo, etapaNombre, duracion, created, hora, estatus} = await fetchEtapaId(fkEtapaId);
            console.log("ID de equipo:", fkequipo);
            console.log("Nombre de la planta", etapaNombre);
            console.log("Nombre de la planta", duracion);
            console.log("Nombre de la planta", created);
            console.log("Nombre de la planta", hora);

            if (fkequipo) {
                setFkequipo(fkequipo); // fk equipo
            }
            if (etapaNombre) {
                setEtapaNombre(etapaNombre); // nombre del proceso
            }
            if (duracion) {
                setEtapaDuracion(duracion); // duracion del proceso
            }
            if (created) {
                setEtapaFecha(created); // fecha de creacion
            }
            if (hora) {
                setEtapaHora(hora); // hora de creacion
            }
            if (estatus) {
                setEtapaEstatus(estatus); // estatus del proceso
            }
        } catch (error) {
            console.error("Error al obtener los datos de planta:", error);
        }
    };

    const recargarDatosSensores = async () => {
        setIsLoading(true);

        const groupedData = await fetchLectura(fkEtapaId);
        if (groupedData) {
            setLecturaData(groupedData);
        }
        setIsLoading(false);

    };

    useEffect(() => {
        obtenerDatosEtapa();
    }, [fkEtapaId]);

    useEffect(() => {
        recargarDatosSensores();
    }, []);

    console.log("lectura data:", lecturaDatas)



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
        return {sensorId, lastValue: null};
    });
    console.log(lastData);

    //datos de los sensores
    const phData = lastData.find(sensor => sensor.sensorId === '22');
    const oxigenoData = lastData.find(sensor => sensor.sensorId === '20');
    const tempData = lastData.find(sensor => sensor.sensorId === '21');

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
                return <Button color="secondary">Sensores</Button>;
            default:
                return null;
        }
    };

    //paginacion
    const columnsLecturas = [
        {name: "ID", uid: "id"},
        {name: "Valor", uid: "value"},
        {name: "Sensor", uid: "sensor"},
    ];

    const renderCellLecturas = (item, columnKey) => {
        switch (columnKey) {
            case "id":
                return item.id;
            case "value":
                return item.valor;
            case "sensor":
                return item.fkESeccionEquipoSensor.fksensor_nombre;
            default:
                return null;
        }
    };

    // Paginación para lecturas
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Elementos por página

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
    const itemsPerPageEquipo = 8;

    const totalPagesEquipo = Math.ceil((equipoData?.length || 0) / itemsPerPageEquipo);

    const paginatedEquipoData = Array.isArray(equipoData) ? equipoData.slice(
        (currentPageEquipo - 1) * itemsPerPageEquipo,
        currentPageEquipo * itemsPerPageEquipo
    ): [];

    const handlePageChangeEquipo = (page) => {
        setCurrentPageEquipo(page);
    };




    return (
        <div>
            <BreadcrumbSection />

            <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between gap-3 items-end">
                    <h1 className="pro-text">Panel Etapa</h1>
                    <Card>
                        <div className="card-padding"><h2>Fecha: {etapaFecha} </h2></div>
                    </Card>
                    <Card>
                        <div className="card-padding"><h2>Hora: {etapaHora}</h2></div>
                    </Card>
                    <Card>
                        <div className="card-padding"><h2>Duración: {etapaDuracion} </h2></div>
                    </Card>

                    <div>
                        <ChipStatus estatus={estatus} />
                    </div>


                    <Button
                        color="secondary"
                        endContent={<Blocks />}
                        onPress={async () => {
                            const nuevoEstado = estatus === 1 ? 2 : 1;
                            await putEtapa(fkEtapaId, nuevoEstado);
                            setEtapaEstatus(nuevoEstado);
                        }}
                    >
                        {estatus === 1 ? "Pausar" : "Activar"}
                    </Button>
                </div>
            </div>
            <div>
                <Tabs aria-label="Options" color="secondary">
                    <Tab key="equipos" title="Sensores">
                        <SensorTable
                            columns={columns}
                            paginatedEquipoData={paginatedEquipoData}
                            currentPageEquipo={currentPageEquipo}
                            totalPagesEquipo={totalPagesEquipo}
                            handlePageChangeEquipo={handlePageChangeEquipo}
                            renderCell={renderCell}
                            etapaNombre={etapaNombre}
                        />
                    </Tab>


                    <Tab key="graphics" title="Gráficas">
                        <GraphicsTab
                            phData={phData}
                            oxigenoData={oxigenoData}
                            tempData={tempData}
                            recargarDatosSensores={recargarDatosSensores}
                            etapaNombre={etapaNombre}
                            lecturaDatas={lecturaDatas}
                            isLoading={isLoading}
                        />
                    </Tab>


                    <Tab key="data" title="Lecturas">
                        <LecturaTable
                            columnsLecturas={columnsLecturas}
                            paginatedData={paginatedData}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handlePageChange={handlePageChange}
                            renderCellLecturas={renderCellLecturas}
                            etapaNombre={etapaNombre}
                        />
                    </Tab>
                </Tabs>
            </div>
        </div>

    );
}