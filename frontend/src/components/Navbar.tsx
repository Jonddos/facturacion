import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <AppBar position="static" color="primary" elevation={3}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Sistema de Facturación
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        component={Link}
                        to="/"
                        variant="text"
                        sx={{ color: "white", fontWeight: 500 }}
                    >
                        Crear Factura
                    </Button>

                    <Button
                        component={Link}
                        to="/invoices"
                        variant="text"
                        sx={{ color: "white", fontWeight: 500 }}
                    >
                        Facturas
                    </Button>
                </Box>

            </Toolbar>
        </AppBar>
    );
}
