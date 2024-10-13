import {
    Card,
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    TableColumn,
    CardBody, CardHeader
} from "@nextui-org/react";

export default function SensorTable({ columns, paginatedEquipoData, currentPageEquipo, totalPagesEquipo, handlePageChangeEquipo, renderCell, etapaNombre }) {
    return (
        <Card>
            <CardHeader>
                <div className="card-header-container">
                    <div className="left-section">
                        <h2 className="panel">Proceso Actual: {etapaNombre}</h2>
                    </div>
                </div>
            </CardHeader>
            <CardBody>
                <Table aria-label="Tabla de Procesos">
                    <TableHeader columns={columns}>
                        {(column) => (
                            <TableColumn key={column.uid}>
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={Array.isArray(paginatedEquipoData) ? paginatedEquipoData : []}>
                        {(item) => (
                            <TableRow key={item.id}>
                                {(columnKey) =>
                                    <TableCell>{renderCell(item, columnKey)}</TableCell>}
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
                        page={currentPageEquipo}
                        total={totalPagesEquipo}
                        onChange={handlePageChangeEquipo}
                    />
                </div>
            </CardBody>
        </Card>
    );
}
