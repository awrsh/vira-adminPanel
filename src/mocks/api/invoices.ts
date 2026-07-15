import type { Invoice } from "@/types";
import { createResourceApi } from "@/mocks/api/create-resource-api";
import { getState, setInvoices } from "@/mocks/db/store";

export const invoicesApi = createResourceApi<Invoice>({
  getAll: () => getState().invoices,
  setAll: setInvoices,
  searchKeys: [
    "invoiceNumber",
    "companyName",
    "companyNameEn",
    "customerName",
    "customerNameEn",
    "customerEmail",
  ],
  defaultSort: "createdAt",
});
