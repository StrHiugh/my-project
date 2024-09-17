import './App.css'
import Sidebar, { SidebarItem } from "./components/global/Sidebar.jsx";
import { BarChart, Cpu, LayoutDashboard, Route, SquareChartGantt, SquareDashedKanban } from "lucide-react";

function App() {
    return (
        <main className="App flex">
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

            {/* Main content */}
            <section className="ml-32 p-6 transition-margin duration-300">
                {/* Aquí irá el contenido principal de tu aplicación */}
                <h1>Bienvenido al Dashboard</h1>
            </section>
        </main>
    );
}

export default App;
