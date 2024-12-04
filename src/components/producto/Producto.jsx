import React, {useEffect, useMemo, useState} from "react";
import {
    Button,
    Card, CardBody,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {Plus} from "lucide-react";
import AddProceso from "../proceso/AddProceso.jsx";
import {useNavigate} from "react-router-dom";
import {useProducto} from "../composables/useProducto.jsx";
import AddProducto from "./AddProducto.jsx";
import "./producto.css"
export default function Producto() {
    const {productos, fetchProducto, postProducto} = useProducto(); // Obtiene equipos y error
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalBackdrop, setModalBackdrop] = useState('blur');
    const navigate = useNavigate();


    const handleAddProducto = async (nuevoProducto) => {
        try {
            const data = await postProducto(nuevoProducto);
            await fetchProducto();
            setModalOpen(false);

        } catch (error) {
            console.error("Error al agregar el proceso", error);
        }
    };



    const columns = [
        {name: "ID", uid: "id"},
        {name: "Nombre", uid: "name"},
        {name: "Descripcion", uid: "descripcion"},
    ];

    const renderCell = (item, columnKey) => {
        switch (columnKey) {
            case "id":
                return item.id;
            case "name":
                return item.nombre;
            case "descripcion":
                return item.descripcion;
            default:
                return null;
        }
    };

    // Paginación para process
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Elementos por página
    const totalPages = Math.ceil((productos || []).length / itemsPerPage);

    const paginatedData = Array.isArray(productos) ? productos.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    ) : [];

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4 mb-4">
                <div className="flex justify-between gap-3 items-end">
                    <h1 className="pro-text">Productos</h1>
                    <Button color="secondary" endContent={<Plus/>} onPress={() => setModalOpen(true)}>
                        Nuevo Producto
                    </Button>
                </div>
            </div>
        );
    }, []);


    return (
        <div className="producto">
            {topContent}
            <Card>
                <CardBody>
                    <Table aria-label="Tabla de Productos">
                        <TableHeader columns={columns}>
                            {(column) => (
                                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                                    {column.name}
                                </TableColumn>
                            )}
                        </TableHeader>
                        <TableBody items={Array.isArray(paginatedData) ? paginatedData : []}>
                            {(item) => (
                                <TableRow key={item.id}>
                                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <div className="flex w-full justify-center mt-4">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="secondary"
                            page={currentPage}
                            total={totalPages}
                            onChange={handlePageChange}
                        />
                    </div>
                </CardBody>
            </Card>
            <AddProducto
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                backdrop={modalBackdrop}
                setBackdrop={setModalBackdrop}
                onAddProducto={handleAddProducto} // Pasa la función al modal


            />
        </div>

    );
}