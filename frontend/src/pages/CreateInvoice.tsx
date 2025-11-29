import InvoiceForm from "../components/InvoiceForm";
import {Box, Typography} from "@mui/material";

export default function CreateInvoice() {
    return (
        <div style={{ padding: 20 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" fontWeight={700}>
                    Crear Nueva Factura
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Registra una nueva factura en el sistema
                </Typography>
            </Box>
            <InvoiceForm />
        </div>
    );
}
