import { createResourceService } from "@/services/create-service";
import { productsRepository } from "@/repositories";

export const productsService = createResourceService(productsRepository);
