import './App.css';
import Sidebar, { SidebarItem } from "./components/global/Sidebar.jsx";
import { BarChart, Cpu, LayoutDashboard, Route, SquareChartGantt, SquareDashedKanban } from "lucide-react";
import Topbar from "./components/global/Topbar.jsx";
import Proceso from "./components/proceso/Proceso.jsx";

function App() {
    return (
        <div className="App flex">
            {/* Sidebar */}
            <Sidebar>
                <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" alert />
                <hr className="my-3" />
                <SidebarItem icon={<BarChart size={20} />} text="Proceso" active />
                <SidebarItem icon={<Cpu size={20} />} text="Equipo" />
                <SidebarItem icon={<Route size={20} />} text="Etapa" />
                <SidebarItem icon={<SquareChartGantt size={20} />} text="Producto" />
                <SidebarItem icon={<SquareDashedKanban size={20} />} text="Sensores" />
            </Sidebar>

            <div className="content flex flex-col w-full">
                {/* Topbar fijo arriba */}
                <Topbar />

                {/* Main content justo debajo del Topbar */}
                <section className="p-10 mt-10">
                    <Proceso/>
                </section>
            </div>
        </div>
    );
}

export default App;
