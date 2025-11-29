import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Paper,
    Divider,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInvoiceById } from "../services/invoices";

import { generateInvoicePDF } from "../utils/generateInvoicePDF";

export default function InvoiceDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [invoice, setInvoice] = useState<any>(null);
    const [details, setDetails] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getInvoiceById(id!).then((data) => {
            setInvoice(data.invoice);
            setDetails(data.details);
            setLoading(false);
        });
    }, [id]);

    if (loading)
        return (
            <Box textAlign="center" mt={10}>
                <CircularProgress />
            </Box>
        );

    if (!invoice)
        return (
            <Typography textAlign="center" mt={5}>
                No se encontró la factura.
            </Typography>
        );

    return (
        <Box sx={{ maxWidth: 1000, margin: "auto", padding: 3 }}>
            <Button onClick={() => navigate("/invoices")} sx={{ mb: 3 }}>
                ← Volver
            </Button>

            <Button
                variant="contained"
                color="secondary"
                sx={{ mb: 3, ml: 2 }}
                onClick={() => generateInvoicePDF(invoice, details)}
            >
                Descargar PDF
            </Button>

            <Card elevation={3}>
                <CardContent>
                    <Typography variant="h4" fontWeight={600} mb={2}>
                        Factura #{invoice.invoiceNumber}
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6">Datos del Cliente</Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography><strong>Nombre:</strong> {invoice.clientName}</Typography>
                                <Typography><strong>Cédula:</strong> {invoice.clientIdentification}</Typography>
                                <Typography><strong>Email:</strong> {invoice.clientEmail}</Typography>
                            </Paper>
                        </Grid>

                        <Grid>
                            <Paper sx={{ p: 2 }}>
                                <Typography variant="h6">Información de la Factura</Typography>
                                <Divider sx={{ my: 1 }} />
                                <Typography>
                                    <strong>Tipo:</strong>{" "}
                                    {invoice.type === "cash" ? "Contado" : "Crédito"}
                                </Typography>
                                <Typography>
                                    <strong>Fecha de emisión:</strong>{" "}
                                    {new Date(invoice.issueDate).toLocaleDateString()}
                                </Typography>
                                <Typography>
                                    <strong>Vence:</strong>{" "}
                                    {new Date(invoice.dueDate).toLocaleDateString()}
                                </Typography>
                                <Typography>
                                    <strong>Estado:</strong>{" "}
                                    {invoice.status === "active" ? "Activa" : "Cancelada"}
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Paper sx={{ p: 2, mt: 3 }}>
                        <Typography variant="h6" mb={2}>
                            Ítems de la Factura
                        </Typography>

                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Código</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Cantidad</TableCell>
                                    <TableCell>Precio</TableCell>
                                    <TableCell>IVA</TableCell>
                                    <TableCell>Total</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {details.map((d) => (
                                    <TableRow key={d._id}>
                                        <TableCell>{d.itemCode}</TableCell>
                                        <TableCell>{d.itemName}</TableCell>
                                        <TableCell>{d.quantity}</TableCell>
                                        <TableCell>${d.unitPrice.toFixed(2)}</TableCell>
                                        <TableCell>
                                            {d.appliesTax ? `$${d.taxAmount.toFixed(2)}` : "0"}
                                        </TableCell>
                                        <TableCell>${d.total.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>

                    {/* Totales */}
                    <Paper sx={{ p: 2, mt: 3 }}>
                        <Typography variant="h6">Totales</Typography>
                        <Divider sx={{ my: 1 }} />

                        <Typography>
                            <strong>Subtotal:</strong> ${invoice.subtotal.toFixed(2)}
                        </Typography>

                        <Typography>
                            <strong>IVA Total:</strong> ${invoice.taxTotal.toFixed(2)}
                        </Typography>

                        <Typography fontWeight={700} mt={1} variant="h6">
                            Total a pagar: ${invoice.total.toFixed(2)}
                        </Typography>
                    </Paper>
                </CardContent>
            </Card>
        </Box>
    );
}
