import type { Payment } from "@/types";
import { createResourceApi } from "@/mocks/api/create-resource-api";
import { getState, setPayments } from "@/mocks/db/store";

export const paymentsApi = createResourceApi<Payment>({
  getAll: () => getState().payments,
  setAll: setPayments,
  searchKeys: [
    "paymentNumber",
    "userName",
    "userNameEn",
    "gateway",
    "gatewayEn",
    "referenceCode",
  ],
  defaultSort: "createdAt",
});
