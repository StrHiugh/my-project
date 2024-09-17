import React, {useEffect, useMemo, useState} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
} from "@nextui-org/react";
import {Plus, } from "lucide-react";
import "./Proceso.css"
import AddProceso from "./AddProceso";
function Proceso() {
    const [processes, setProcesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalBackdrop, setModalBackdrop] = useState('blur');


    useEffect(() => {
            fetch('http://localhost:8000/api/v1/proceso/', {
                method: 'GET',
                headers: {
                    'Authorization': 'Token cfc8340bc8d44383934ef380d4a9f71c26305ad6',
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la respuesta del servidor');
                    }
                    return response.json();
                })
                .then(data => {
                    setProcesses(data.results);
                    setLoading(false);
                    console.log(processes)
                })
                .catch(error => {
                    setError(error.message);
                    setLoading(false);
                });
        }, []);

    const columns = [
        {name: "ID", uid: "id"},
        {name: "Nombre", uid: "name"},
        {name: "Descripción", uid: "description"},
        {name: "Acciones", uid: "actions"},
    ];

    const renderCell = (item, columnKey) => {
        switch (columnKey) {
            case "id":
                return item.id;
            case "name":
                return item.nombre;
            case "description":
                return item.descripcion;
            case "actions":
                return <Button color="secondary">Ver</Button>;
            default:
                return null;
        }
    };


    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between gap-3 items-end">
                    <h1 className="pro-text">Procesos</h1>
                    <Button color="secondary" endContent={<Plus />} onPress={() => setModalOpen(true)}>
                        Nuevo
                    </Button>
                </div>
            </div>
        );
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    console.log(processes);
    return (
        <div>
            {topContent}
                <Table aria-label="Tabla de Procesos">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
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
            <AddProceso
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                backdrop={modalBackdrop}
                setBackdrop={setModalBackdrop}
            />
        </div>
    );
}
export default Proceso;
