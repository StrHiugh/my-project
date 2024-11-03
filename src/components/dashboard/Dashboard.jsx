import {
    Card, Spacer, Tab, Tabs, Table, TableHeader, TableColumn, TableRow, TableCell, TableBody
} from "@nextui-org/react";
import GaugeRadial from "../charts/GaugeRadial.jsx";
import AreaGraphic from "../charts/AreaGraphic.jsx";

export default function Dashboard() {

    return (<div>
            <Tabs aria-label="Options" color="secondary">
                <Tab key="planta1" title="Planta1">

                </Tab>
                <Tab key="planta2" title="Planta2 ">
                </Tab>
            </Tabs>
            <Spacer y={5}/>

        <div className="grid grid-cols-3 grid-rows-4 gap-6">
            <div><Card>
                <GaugeRadial
                labels="pH"
                series={5}
                labelColor='#7827c8'
                sensorType="ph"
            />
            </Card></div>
            <div><Card>
                <GaugeRadial
                labels="Oxigeno Disuelto"
                series={12}
                labelColor='#7827c8'
                sensorType="oxygen"
            />
            </Card></div>
            <div><Card>
                <GaugeRadial
                labels="Temperatura"
                series={22}
                labelColor='#7827c8'
                sensorType="temperature"
            />
            </Card></div>

            <div className="col-start-3 row-start-2"><Card>
                <h2>ds</h2>
            </Card></div>
            <div className="col-start-3 row-start-3"><Card>
                <h2>ds</h2>
            </Card></div>
            <div className="col-start-3 row-start-4"><Card>
                <h2>ds</h2>
            </Card></div>

            <div className="col-span-2 row-start-2"><Card>
                <h2>ds</h2>

            </Card></div>

            <div className="col-span-2 col-start-1 row-start-3"><Card>
                <h2>ds</h2>

            </Card></div>
            <div className="col-span-2 col-start-1 row-start-4"><Card>
                <h2>ds</h2>

            </Card></div>
        </div>
    </div>);
}