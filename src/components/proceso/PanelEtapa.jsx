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
    TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination
} from "@nextui-org/react";
import React, {useEffect, useMemo} from "react";
import {Blocks, Plus} from "lucide-react";
import {useNavigate, useParams} from "react-router-dom";
import GaugeRadial from "../charts/GaugeRadial.jsx";
import AreaGraphic from "../charts/AreaGraphic.jsx";


export default function PanelEtapa() {
    const navigate = useNavigate();  // Inicializa el hook para redirección
    const { id, fkequipo } = useParams();

    useEffect(() => {
        console.log(`ID: ${id}`);
        console.log(`fkequipo: ${fkequipo}`);
    }, [id, fkequipo]);


    const columns = [
        {name: "ID", uid: "id"},
        {name: "Nombre", uid: "name"},
        {name: "Equipo", uid: "equip"},
        {name: "Acciones", uid: "actions"},

    ];

    const columnsLecturas = [
        {name: "ID", uid: "id"},
        {name: "Valor", uid: "value"},
        {name: "Sensor", uid: "sensor"},
    ];
    const processes = [         // datos de ejemplo
        {id: 1, name: "Proceso 1", equip: "Sonda Multiparamétrica"},
        {id: 2, name: "Proceso 2", equip: "Sonda Multiparamétrica"},
        {id: 3, name: "Proceso 3", equip: "Sonda Multiparamétrica"},
        {id: 4, name: "Proceso 4", equip: "Sonda Multiparamétrica"},
    ];

    const processesLecturas = [         // datos de ejemplo
        {id: 1, value: 5.9, sensor: "oxigeno"},
        {id: 2, value: 6.0, sensor: "ph"},
        {id: 3, value: 6.0, sensor: "temperatura"},
        {id: 4, value: 6.0, sensor: "oxigeno"},
        {id: 5, value: 6.2, sensor: "ph"},
        {id: 6, value: 6.0, sensor: "oxigeno"},
        {id: 7, value: 5.9, sensor: "ph"},

    ];

    const renderCell = (item, columnKey) => {
        switch (columnKey) {
            case "id":
                return item.id;
            case "name":
                return item.name;
            case "equip":
                return item.equip;
            case "actions":
                return <Button color="secondary">Sensores</Button>;
            default:
                return null;
        }
    };

    const renderCellLecturas = (item, columnKey2) => {
        switch (columnKey2) {
            case "id":
                return item.id;
            case "value":
                return item.value;
            case "sensor":
                return item.sensor;
            default:
                return null;
        }
    };

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between gap-3 items-end">
                    <h1 className="pro-text">Panel Etapa</h1>

                    <Button color="secondary" endContent={<Blocks/>} onPress={() => setModalOpen(true)}>
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
                                <Table aria-label="Tabla de Procesos"
                                       className="w-full mx-auto"> {/* Ajusta el ancho aquí */}
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
                                    <Pagination isCompact showControls showShadow color="secondary" page={1}
                                                total={10}/>
                                </div>
                            </CardBody>

                        </Card>
                    </Tab>

                    <Tab key="graphics" title="Gráficas">
                        <Card>
                        <CardBody>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                                <div>
                                    <GaugeRadial labels="pH" series={47.5} labelColor='#7827c8' />
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
                                <AreaGraphic></AreaGraphic>
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
                                    <TableBody items={processesLecturas}>
                                        {(item) => (
                                            <TableRow key={item.id}>
                                                {(columnKey) =>
                                                    <TableCell>{renderCellLecturas(item, columnKey)}</TableCell>}
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                                <div className="flex w-full justify-center mt-4">
                                    <Pagination isCompact showControls showShadow color="secondary" page={1}
                                                total={10}/>
                                </div>
                            </CardBody>

                        </Card>
                    </Tab>
                </Tabs>
            </div>
        </div>

    );
}