import {
    Card, Spacer, Tab, Tabs, Table, TableHeader, TableColumn, TableRow, TableCell, TableBody, Button, Spinner
} from "@nextui-org/react";
import GaugeRadial from "../charts/GaugeRadial.jsx";
import AreaGraphic from "../charts/AreaGraphic.jsx";
import {useLecturaEtapa} from "../composables/useLecturaEtapa.jsx";
import {useEffect, useState} from "react";
import {usePlanta} from "../composables/usePlanta.jsx";

export default function Dashboard() {
    const {
        data,
        dataGeneral,
        error,
        fetchLectura,
        fetchLecturaGeneral,
        fetchLecturaEquipo,
        groupedDataG
    } = useLecturaEtapa();
    const [lecturaDatas, setLecturaData] = useState([]);
    const [lecturaPlantas, setlecturaPlantas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const {plantas, fetchPlantas} = usePlanta();

    const recargarDatosSensores = async () => {
        setIsLoading(true);

        const groupedData = await fetchLecturaGeneral();
        if (groupedData) {
            setLecturaData(groupedData);
        }

        const fetPlanta = await fetchPlantas();
        if (fetPlanta) {
            setlecturaPlantas(fetPlanta);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        recargarDatosSensores();
    }, []);

    console.log(lecturaDatas)
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
    const phData = lastData.find(sensor => sensor.sensorId === '13');
    const oxigenoData = lastData.find(sensor => sensor.sensorId === '8');
    const tempData = lastData.find(sensor => sensor.sensorId === '9');


    return (
        <div>

            <div className="flex">
                <div>
                <Tabs aria-label="Options" color="secondary" variant="solid">

                    {lecturaPlantas.map((planta) => (
                        <Tab key={planta.id} title={planta.nombre}>
                            <div className="grid grid-cols-3 grid-rows-4 gap-y-5 gap-x-10">
                                <div><Card>
                                    {isLoading ? (
                                        <div className="flex justify-center items-center">
                                            <Spinner color="secondary" />
                                        </div>
                                    ) : (
                                    <GaugeRadial
                                        labels="pH"
                                        series={phData ? parseFloat(phData.lastValue) : 0}
                                        labelColor='#7827c8'
                                        sensorType="ph"
                                    />
                                    )}
                                </Card></div>
                                <div><Card>
                                    {isLoading ? (
                                        <div className="flex justify-center items-center">
                                            <Spinner color="secondary" />
                                        </div>
                                    ) : (
                                    <GaugeRadial
                                        labels="Oxigeno Disuelto"
                                        series={oxigenoData ? parseFloat(oxigenoData.lastValue) : 0}
                                        labelColor='#7827c8'
                                        sensorType="oxygen"
                                    />
                                    )}
                                </Card></div>
                                <div><Card>
                                    {isLoading ? (
                                        <div className="flex justify-center items-center">
                                            <Spinner color="secondary" />
                                        </div>
                                    ) : (
                                    <GaugeRadial
                                        labels="Temperatura"
                                        series={tempData ? parseFloat(tempData.lastValue) : 0}
                                        labelColor='#7827c8'
                                        sensorType="temperature"
                                    />
                                    )}
                                </Card></div>


                                <div className="col-start-3 row-start-2 mt-[-100px]"><Card className="p-4">
                                    <h2>s</h2>
                                </Card></div>
                                <div className="col-start-3 row-start-3 mt-[-325px]"><Card className="p-4">
                                    <h2>s</h2>
                                </Card></div>
                                <div className="col-start-3 row-start-4 mt-[-550px]"><Card className="p-4">
                                    <h2>s</h2>
                                </Card></div>


                                <div className="col-span-2 row-start-2 mt-[-100px]"><Card>
                                    {isLoading ? (
                                        <div className="flex justify-center items-center">
                                            <Spinner color="secondary" />
                                        </div>
                                    ) : (
                                    <Tabs key="underlined" variant="underlined" aria-label="Tabs variants">
                                        <Tab key="photos" title="Oxigeno">
                                            {lecturaDatas[8] && (
                                                <AreaGraphic
                                                    key={8}
                                                    lecturaDatas={lecturaDatas[8]}
                                                    sensorName={lecturaDatas[8][0]?.fkESeccionEquipoSensor?.fkseccionEquipo_nombre || "Sensor 8"}
                                                />
                                            )}
                                        </Tab>
                                        <Tab key="music" title="Temperatura">
                                            {lecturaDatas[9] && (
                                                <AreaGraphic
                                                    key={9}
                                                    lecturaDatas={lecturaDatas[9]}
                                                    sensorName={lecturaDatas[9][0]?.fkESeccionEquipoSensor?.fkseccionEquipo_nombre || "Sensor 8"}
                                                />
                                            )}
                                        </Tab>
                                        <Tab key="videos" title="pH">
                                            {lecturaDatas[13] && (
                                                <AreaGraphic
                                                    key={13}
                                                    lecturaDatas={lecturaDatas[13]}
                                                    sensorName={lecturaDatas[13][0]?.fkESeccionEquipoSensor?.fkseccionEquipo_nombre || "Sensor 8"}
                                                />
                                            )}
                                        </Tab>
                                    </Tabs>
                                    )}
                                </Card></div>
                            </div>
                        </Tab>
                    ))}
                </Tabs>
                </div>
                <Button auto color="secondary" onClick={() => recargarDatosSensores()}>
                    Recargar Datos
                </Button>

            </div>
        </div>
    );
}