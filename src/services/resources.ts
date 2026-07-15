import { createResourceService } from "@/services/create-service";
import {
  activitiesRepository,
  blogPostsRepository,
  categoriesRepository,
  commentsRepository,
  companiesRepository,
  invoicesRepository,
  messagesRepository,
  notificationsRepository,
  paymentsRepository,
  scrumCardsRepository,
  tasksRepository,
} from "@/repositories";

export const companiesService = createResourceService(companiesRepository);
export const categoriesService = createResourceService(categoriesRepository);
export const invoicesService = createResourceService(invoicesRepository);
export const tasksService = createResourceService(tasksRepository);
export const messagesService = createResourceService(messagesRepository);
export const notificationsService = createResourceService(
  notificationsRepository,
);
export const paymentsService = createResourceService(paymentsRepository);
export const activitiesService = createResourceService(activitiesRepository);
export const blogPostsService = createResourceService(blogPostsRepository);
export const commentsService = createResourceService(commentsRepository);
export const scrumCardsService = createResourceService(scrumCardsRepository);
