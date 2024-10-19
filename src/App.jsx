import './App.css';
import Sidebar, {SidebarItem} from "./components/global/Sidebar.jsx";
import {BarChart, Cpu, LayoutDashboard, LucideRoute, SquareChartGantt, SquareDashedKanban} from "lucide-react";
import Topbar from "./components/global/Topbar.jsx";
import Proceso from "./components/proceso/Proceso.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PanelProcess from "./components/proceso/PanelProcess.jsx";
import PanelEtapa from "./components/proceso/PanelEtapa.jsx";

function App() {
    return (
        <Router>
            <div className="App flex">
                {/* Sidebar */}
                <Sidebar>
                    <SidebarItem icon={<LayoutDashboard size={20}/>} text="Dashboard" alert/>
                    <hr className="my-3"/>
                    <SidebarItem icon={<BarChart size={20}/>} text="Proceso" active/>
                    <SidebarItem icon={<Cpu size={20}/>} text="Equipo"/>
                    <SidebarItem icon={<LucideRoute size={20}/>} text="Etapa"/>
                    <SidebarItem icon={<SquareChartGantt size={20}/>} text="Producto"/>
                    <SidebarItem icon={<SquareDashedKanban size={20}/>} text="Sensores"/>
                </Sidebar>

                <div className="content flex flex-col w-full">
                    {/* Topbar fijo arriba */}
                    <Topbar/>

                    {/* Main content justo debajo del Topbar */}
                    <section className="p-10 mt-10">
                        <Routes>
                            <Route path="/" element={<Proceso />} /> {/* Vista por defecto */}
                            <Route path="/PanelProcess/:fkProcesoId" element={<PanelProcess />} />
                            <Route path="/PanelEtapa/:fkEtapaId" element={<PanelEtapa />} />
                        </Routes>
                    </section>
                </div>
            </div>
        </Router>
    );
}

export default App;
