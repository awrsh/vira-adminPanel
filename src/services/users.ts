import { createResourceService } from "@/services/create-service";
import { usersRepository } from "@/repositories";

export const usersService = createResourceService(usersRepository);
