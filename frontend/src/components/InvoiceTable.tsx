import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableContainer,
    TablePagination,
    TextField,
    Grid,
    MenuItem,
    Button,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInvoices } from "../services/invoices";
import SearchIcon from "@mui/icons-material/Search";

export default function InvoiceTable() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [filtered, setFiltered] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(8);

    useEffect(() => {
        getInvoices().then((data) => {
            setInvoices(data);
            setFiltered(data);
        });
    }, []);

    useEffect(() => {
        let data = [...invoices];

        if (search.trim() !== "") {
            data = data.filter((f) =>
                f.clientName.toLowerCase().includes(search.toLowerCase()) ||
                f.clientIdentification.includes(search)
            );
        }

        if (typeFilter !== "all") {
            data = data.filter((f) => f.type === typeFilter);
        }

        if (dateFrom) {
            data = data.filter((f) => new Date(f.issueDate) >= new Date(dateFrom));
        }

        if (dateTo) {
            data = data.filter((f) => new Date(f.issueDate) <= new Date(dateTo));
        }

        setFiltered(data);
    }, [search, typeFilter, dateFrom, dateTo, invoices]);

    const handleChangePage = (_e: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRows = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
    };

    return (
        <Paper sx={{ p: 3, maxWidth: 1100, margin: "auto" }}>
            <Typography variant="h4" fontWeight="bold" mb={3}>
                Facturas Registradas
            </Typography>

            {/* Filtros */}
            <Grid container spacing={2} mb={3}>
                <Grid>
                    <TextField
                        label="Buscar por nombre o cédula"
                        fullWidth
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: <SearchIcon />,
                        }}
                    />
                </Grid>

                <Grid>
                    <TextField
                        label="Tipo factura"
                        select
                        fullWidth
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                    >
                        <MenuItem value="all">Todos</MenuItem>
                        <MenuItem value="cash">Contado</MenuItem>
                        <MenuItem value="credit">Crédito</MenuItem>
                    </TextField>
                </Grid>

                <Grid>
                    <TextField
                        type="date"
                        label="Desde"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={dateFrom}
                        onChange={(e) => setDateFrom(e.target.value)}
                    />
                </Grid>

                <Grid>
                    <TextField
                        type="date"
                        label="Hasta"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        value={dateTo}
                        onChange={(e) => setDateTo(e.target.value)}
                    />
                </Grid>

                <Grid>
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => {
                            setSearch("");
                            setTypeFilter("all");
                            setDateFrom("");
                            setDateTo("");
                        }}
                    >
                        Limpiar
                    </Button>
                </Grid>
            </Grid>

            {/* TABLA */}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Factura</TableCell>
                            <TableCell>Cliente</TableCell>
                            <TableCell>Cédula</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filtered
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((inv) => (
                                <TableRow key={inv._id}>
                                    <TableCell>{inv.invoiceNumber}</TableCell>
                                    <TableCell>{inv.clientName}</TableCell>
                                    <TableCell>{inv.clientIdentification}</TableCell>
                                    <TableCell>
                                        {inv.type === "cash" ? "Contado" : "Crédito"}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(inv.issueDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>${inv.total.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            color="primary"
                                            onClick={() => navigate(`/invoice/${inv._id}`)}
                                        >
                                            Ver
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* PAGINACIÓN */}
            <TablePagination
                component="div"
                count={filtered.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRows}
            />
        </Paper>
    );
}
