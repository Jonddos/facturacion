import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#4a148c",
        },
        secondary: {
            main: "#ff6f00",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: "none",
                    padding: "10px 20px",
                },
            },
        },
    },
});

export default theme;