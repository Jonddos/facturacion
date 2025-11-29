import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography,
    Divider,
    CircularProgress,
    Grow,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useForm, useFieldArray } from "react-hook-form";
import { api } from "../services/api";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { useSnackbar } from "notistack";
import {useNavigate} from "react-router-dom";


export default function InvoiceForm() {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<any>(null);


    const navigate = useNavigate();

    const { register, control, handleSubmit, getValues, watch } = useForm({
        defaultValues: {
            clientIdentification: "",
            clientName: "",
            clientEmail: "",
            type: "cash",
            userId: "admin123",
            items: [
                {
                    id: uuid(),
                    itemCode: "",
                    itemName: "",
                    unitPrice: 0,
                    quantity: 1,
                    appliesTax: false,
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
        keyName: "key",
    });

    const items = watch("items");

    const subtotal = items.reduce(
        (acc, item) => acc + item.unitPrice * item.quantity,
        0
    );
    const taxTotal = items.reduce(
        (acc, item) =>
            acc + (item.appliesTax ? item.unitPrice * item.quantity * 0.19 : 0),
        0
    );
    const total = subtotal + taxTotal;

    const validateForm = () => {
        const data = getValues();

        if (!data.clientIdentification.trim()) return "La cédula es obligatoria";
        if (!data.clientName.trim()) return "El nombre es obligatorio";
        if (!data.clientEmail.trim()) return "El email es obligatorio";

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(data.clientEmail)) return "El email no es válido";

        if (data.items.length === 0) return "Debe agregar al menos 1 ítem";

        for (const item of data.items) {
            if (!item.itemCode.trim()) return "El código del ítem es obligatorio";
            if (!item.itemName.trim()) return "El nombre del ítem es obligatorio";
            if (item.unitPrice <= 0) return "El precio debe ser mayor a 0";
            if (item.quantity <= 0) return "La cantidad debe ser mayor a 0";
        }

        return null;
    };

    const onSubmit = async (data: any) => {
        const error = validateForm();
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            return;
        }

        setLoading(true);

        try {
            const res = await api.post("/invoices", data);
            setResponse(res.data);
            const { invoice } = res.data;
            await api.post(`/invoices/send-email/${invoice._id}`);
            enqueueSnackbar("Factura creada correctamente 🎉", {
                variant: "success",
            });
            navigate(`/invoice/${invoice._id}`);
        } catch (err) {
            enqueueSnackbar("Error al crear la factura", { variant: "error" });
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <Paper
            sx={{
                p: 4,
                maxWidth: 900,
                margin: "auto",
                mt: 3,
                borderRadius: 3,
                background: "linear-gradient(135deg, #fdfbff 0%, #ffffff 60%)",
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: 8,
                    bgcolor: "primary.main",
                }}
            />
            {/* Título */}
            <Typography
                variant="h4"
                fontWeight={800}
                sx={{
                    textAlign: "center",
                    color: "primary.main",
                    mb: 1,
                    letterSpacing: "-0.5px",
                }}
            >
                Información de la Factura
            </Typography>
            <Typography
                variant="subtitle1"
                textAlign="center"
                color="text.secondary"
                sx={{ mb: 4 }}
            >
                Completa los datos necesarios para registrar una nueva factura.
            </Typography>

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit(onSubmit)}>

                {/* DATOS DEL CLIENTE */}
                <Stack spacing={2}>
                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                        <TextField
                            label="Cédula"
                            fullWidth
                            size="small"
                            {...register("clientIdentification")}
                        />
                        <TextField
                            label="Nombre"
                            fullWidth
                            size="small"
                            {...register("clientName")}
                        />
                        <TextField
                            label="Email"
                            fullWidth
                            size="small"
                            {...register("clientEmail")}
                        />
                    </Stack>
                </Stack>

                <Divider sx={{ my: 3 }} />

                {/* ÍTEMS */}
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    sx={{ mt: 1, mb: 1 }}
                >
                    Ítems
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {fields.map((field, index) => (
                    <Grow key={field.key} in timeout={250}>
                        <Paper
                            sx={{
                                p: 2,
                                mb: 2,
                                borderRadius: 2,
                                backgroundColor: "#faf7ff",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.04)",
                            }}
                            elevation={0}
                        >
                            <Stack spacing={2}>
                                <Stack
                                    direction={{ xs: "column", sm: "row" }}
                                    spacing={2}
                                    alignItems="center"
                                >
                                    <TextField
                                        label="Código"
                                        fullWidth
                                        size="small"
                                        {...register(`items.${index}.itemCode`)}
                                    />
                                    <TextField
                                        label="Nombre"
                                        fullWidth
                                        size="small"
                                        {...register(`items.${index}.itemName`)}
                                    />

                                    <TextField
                                        type="number"
                                        label="Precio"
                                        fullWidth
                                        size="small"
                                        {...register(`items.${index}.unitPrice`, {
                                            valueAsNumber: true,
                                        })}
                                    />

                                    <TextField
                                        type="number"
                                        label="Cantidad"
                                        fullWidth
                                        size="small"
                                        {...register(`items.${index}.quantity`, {
                                            valueAsNumber: true,
                                        })}
                                    />

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                {...register(`items.${index}.appliesTax`)}
                                                size="small"
                                            />
                                        }
                                        label="IVA"
                                    />

                                    <IconButton color="error" onClick={() => remove(index)}>
                                        <Delete fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </Paper>
                    </Grow>
                ))}

                <Button
                    variant="outlined"
                    onClick={() =>
                        append({
                            id: uuid(),
                            itemCode: "",
                            itemName: "",
                            unitPrice: 0,
                            quantity: 1,
                            appliesTax: false,
                        })
                    }
                >
                    Agregar Ítem
                </Button>

                <Divider sx={{ my: 3 }} />

                {/* TOTALES */}
                <Typography variant="subtitle1" fontWeight={700}>
                    Totales
                </Typography>
                <Divider sx={{ mb: 2 }} />

                <Typography variant="body2">
                    Subtotal: <strong>${subtotal.toFixed(2)}</strong>
                </Typography>
                <Typography variant="body2">
                    IVA Total: <strong>${taxTotal.toFixed(2)}</strong>
                </Typography>
                <Typography variant="body1" fontWeight={700} sx={{ mt: 1 }}>
                    Total: ${total.toFixed(2)}
                </Typography>

                {/* BUTTON SUBMIT */}
                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    type="submit"
                    sx={{ mt: 3, borderRadius: 3 }}
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={22} />}
                >
                    {loading ? "Creando..." : "Crear Factura"}
                </Button>

                {response && (
                    <Paper sx={{ p: 2, mt: 3, backgroundColor: "#f5f5f5" }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                            Respuesta:
                        </Typography>
                        <pre style={{ fontSize: 12 }}>
              {JSON.stringify(response, null, 2)}
            </pre>
                    </Paper>
                )}
            </Box>
        </Paper>
    );
}
