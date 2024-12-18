import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import {useNavigate} from "react-router-dom";

function BreadcrumbSection() {
    const navigate = useNavigate();

    return (
        <Breadcrumbs variant="solid" className="p-3">
            <BreadcrumbItem onPress={() => navigate(`/Proceso`)}>Tarea</BreadcrumbItem>
            <BreadcrumbItem onPress={() => navigate(-1)}>Panel Tareas</BreadcrumbItem>
            <BreadcrumbItem>Panel Etapa</BreadcrumbItem>
        </Breadcrumbs>
    );
}

export default BreadcrumbSection;
