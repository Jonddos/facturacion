import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateInvoice from "./pages/CreateInvoice";
import ListInvoices from "./pages/ListInvoices";
import InvoiceDetail from "./pages/InvoiceDetail";
import Navbar from "./components/Navbar";

export default function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<CreateInvoice />} />
                <Route path="/invoices" element={<ListInvoices />} />
                <Route path="/invoice/:id" element={<InvoiceDetail />} />
            </Routes>
        </BrowserRouter>
    );
}
