import {Card, CardHeader, CardBody, Button, Spinner} from "@nextui-org/react";
import GaugeRadial from "../charts/GaugeRadial.jsx";
import AreaGraphic from "../charts/AreaGraphic.jsx";


export default function GraphicsTab({ phData, oxigenoData, tempData, recargarDatosSensores, etapaNombre, lecturaDatas, isLoading }) {
    return (
        <Card>
            <CardHeader>
                <h2 className="panel">Proceso Actual: {etapaNombre}</h2>
            </CardHeader>
            <CardBody>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                    <div>
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
                        <Button color="secondary" onPress={recargarDatosSensores}>
                            Recargar Datos
                        </Button>
                    </div>
                    <div>
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
                        />)}

                        <Button color="secondary" onPress={recargarDatosSensores}>
                            Recargar Datos
                        </Button>
                    </div>
                    <div>
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
                        />)}
                        <Button color="secondary" onPress={recargarDatosSensores}>
                            Recargar Datos
                        </Button>
                    </div>
                </div>
                <div className="mt-16">
                    {Object.entries(lecturaDatas).map(([sensorId, data]) => (
                        <AreaGraphic
                            key={sensorId}
                            lecturaDatas={data}
                            sensorName={data[0]?.fkESeccionEquipoSensor?.fkseccionEquipo_nombre || "Sensor Desconocido"}
                        />
                    ))}
                </div>
            </CardBody>
        </Card>
    );
}
