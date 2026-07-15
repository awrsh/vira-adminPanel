import { createResourceService } from "@/services/create-service";
import { ordersRepository } from "@/repositories";

export const ordersService = createResourceService(ordersRepository);
