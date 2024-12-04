import './App.css';
import Sidebar, {SidebarItem} from "./components/global/Sidebar.jsx";
import {BarChart, Cpu, LayoutDashboard, LucideRoute, SquareChartGantt, SquareDashedKanban} from "lucide-react";
import Topbar from "./components/global/Topbar.jsx";
import Proceso from "./components/proceso/Proceso.jsx";
import {BrowserRouter as Router, Routes, Route, useLocation, Navigate} from 'react-router-dom';
import PanelProcess from "./components/proceso/PanelProcess.jsx";
import PanelEtapa from "./components/proceso/PanelEtapa.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Equipo from "./components/equipo/Equipo.jsx";
import Planta from "./components/planta/Planta.jsx";
import Producto from "./components/producto/Producto.jsx";
import Sensores from "./components/sensores/Sensores.jsx";
import PanelEquipo from "./components/equipo/PanelEquipo.jsx";
import SeccionSensor from "./components/equipo/SeccionSensor.jsx";
import Login from "./components/login/Login.jsx";
import ProtectedRoute from "./pages/ProRoutes.jsx";

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

function AppContent() {
    const location = useLocation(); // Obtén la ubicación actual

    // Si la ubicación actual es "/Login", renderiza solo el componente Login
    if (location.pathname === "/Login") {
        return (
            <div className="App flex items-center justify-center h-screen">
                <Login />
            </div>
        );
    }
    return (
        <div className="App flex">
            <div className="content flex flex-col w-full">
                {/* Topbar fijo arriba */}
                <Topbar/>
                {/* Main content justo debajo del Topbar */}
                <section className="p-10 mt-10">
                    <Routes>
                        {/* Vista por defecto */}
                        <Route path="*" element={<Navigate to="/Login" />} />
                        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                        {/* Procesos */}
                        <Route path="/Proceso" element={<ProtectedRoute><Proceso /></ProtectedRoute>} />
                        <Route path="/PanelProcess/:fkProcesoId" element={<ProtectedRoute><PanelProcess /></ProtectedRoute>} />
                        <Route path="/PanelEtapa/:fkEtapaId" element={<ProtectedRoute><PanelEtapa /></ProtectedRoute>} />
                        {/* Equipo */}
                        <Route path="/Equipo" element={<ProtectedRoute><Equipo /></ProtectedRoute>} />
                        <Route path="/PanelEquipo/:fkEquipoId" element={<ProtectedRoute><PanelEquipo/></ProtectedRoute>} />
                        <Route path="/SeccionSensor/:fkSensorId" element={<ProtectedRoute><SeccionSensor/></ProtectedRoute>} />
                        {/* Planta */}
                        <Route path="/Planta" element={<ProtectedRoute><Planta /></ProtectedRoute>} />
                        {/* Producto */}
                        <Route path="/Producto" element={<ProtectedRoute><Producto /></ProtectedRoute>} />
                        {/* Sensores */}
                        <Route path="/Sensores" element={<ProtectedRoute><Sensores /></ProtectedRoute>} />
                    </Routes>
                </section>
            </div>
        </div>
    );
}

export default App;
