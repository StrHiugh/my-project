import './App.css';
import Sidebar, {SidebarItem} from "./components/global/Sidebar.jsx";
import {BarChart, Cpu, LayoutDashboard, LucideRoute, SquareChartGantt, SquareDashedKanban} from "lucide-react";
import Topbar from "./components/global/Topbar.jsx";
import Proceso from "./components/proceso/Proceso.jsx";
import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import PanelProcess from "./components/proceso/PanelProcess.jsx";
import PanelEtapa from "./components/proceso/PanelEtapa.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Equipo from "./components/equipo/Equipo.jsx";
import Planta from "./components/planta/Planta.jsx";
import Producto from "./components/producto/Producto.jsx";
import Sensores from "./components/sensores/Sensores.jsx";

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

function AppContent() {
    const location = useLocation(); // Obtén la ubicación actual

    return (
        <div className="App flex">
            {/* Sidebar */}
            <Sidebar>
                <SidebarItem icon={<LayoutDashboard size={20}/>} text="Dashboard" path="/" active={location.pathname === '/'}/>
                <hr className="my-3"/>
                <SidebarItem icon={<BarChart size={20} />} text="Proceso" path="/Proceso" active={location.pathname === '/Proceso'}/>
                <SidebarItem icon={<Cpu size={20}/>} text="Equipo" path="/Equipo" active={location.pathname === '/Equipo'}/>
                <SidebarItem icon={<LucideRoute size={20}/>} text="Planta" path="/Planta" active={location.pathname === '/Planta'}/>
                <SidebarItem icon={<SquareChartGantt size={20}/>} text="Producto" path="/Producto" active={location.pathname === '/Producto'}/>
                <SidebarItem icon={<SquareDashedKanban size={20}/>} text="Sensores" path="/Sensores" active={location.pathname === '/Sensores'}/>
            </Sidebar>

            <div className="content flex flex-col w-full">
                {/* Topbar fijo arriba */}
                <Topbar/>

                {/* Main content justo debajo del Topbar */}
                <section className="p-10 mt-10">
                    <Routes>
                        {/* Vista por defecto */}
                        <Route path="/" element={<Dashboard />} />
                        {/* Procesos */}
                        <Route path="/Proceso" element={<Proceso />} />
                        <Route path="/PanelProcess/:fkProcesoId" element={<PanelProcess />} />
                        <Route path="/PanelEtapa/:fkEtapaId" element={<PanelEtapa />} />
                        {/* Equipo */}
                        <Route path="/Equipo" element={<Equipo />} />
                        {/* Planta */}
                        <Route path="/Planta" element={<Planta />} />
                        {/* Producto */}
                        <Route path="/Producto" element={<Producto />} />
                        {/* Sensores */}
                        <Route path="/Sensores" element={<Sensores />} />
                    </Routes>
                </section>
            </div>
        </div>
    );
}

export default App;
