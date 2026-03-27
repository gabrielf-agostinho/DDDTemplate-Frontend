import { MessageService } from "primeng/api";

export const provideMessageService = (): typeof MessageService => MessageService;