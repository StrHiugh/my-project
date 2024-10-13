import {
    Card,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    CardBody,
    CardHeader, TableColumn
} from "@nextui-org/react";

export default function LecturaTable({ columnsLecturas, paginatedData, currentPage, totalPages, handlePageChange, renderCellLecturas, etapaNombre }) {
    return (
        <Card>
            <CardHeader>
                <h2 className="panel">Proceso Actual: {etapaNombre}</h2>
            </CardHeader>
            <CardBody>
                <Table aria-label="Tabla de Procesos">
                    <TableHeader columns={columnsLecturas}>
                        {(column) => (
                            <TableColumn key={column.uid}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={Array.isArray(paginatedData) ? paginatedData : []}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) =>
                                    <TableCell>{renderCellLecturas(item, columnKey)}</TableCell>}
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
    );
}
