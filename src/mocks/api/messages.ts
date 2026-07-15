import type { Message } from "@/types";
import { createResourceApi } from "@/mocks/api/create-resource-api";
import { getState, setMessages } from "@/mocks/db/store";

export const messagesApi = createResourceApi<Message>({
  getAll: () => getState().messages,
  setAll: setMessages,
  searchKeys: [
    "subject",
    "subjectEn",
    "body",
    "bodyEn",
    "senderName",
    "senderNameEn",
    "recipientName",
    "recipientNameEn",
  ],
  defaultSort: "createdAt",
});
