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
import {useNavigate} from "react-router-dom";
import {useSensores} from "../composables/useSensores.jsx";
import "./sensores.css"
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
const SECRET_KEY = "abcdefghi123456789";
export default function Sensores() {
    const {sensores, error, fetchSensor} = useSensores();
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalBackdrop, setModalBackdrop] = useState('blur');
    const navigate = useNavigate();

    const columns = [
        {name: "ID", uid: "id"},
        {name: "Nombre", uid: "name"},
        {name: "Identificador", uid: "matricula"},
    ];

    const renderCell = (item, columnKey) => {
        switch (columnKey) {
            case "id":
                return item.id;
            case "name":
                return item.nombre;
            case "matricula":
                return item.matricula;
            default:
                return null;
        }
    };

    // Paginación para process
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Elementos por página
    const totalPages = Math.ceil((sensores || []).length / itemsPerPage);

    const paginatedData = Array.isArray(sensores) ? sensores.slice(
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
                    <h1 className="pro-text">Sensores</h1>
                </div>
            </div>
        );
    }, []);

    return (
        <div className="sensores">
            {topContent}
            <Card>
                <CardBody>
                    <Table aria-label="Tabla de Sensores">
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

        </div>

    );
}