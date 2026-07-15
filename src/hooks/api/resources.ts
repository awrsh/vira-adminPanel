"use client";

import { createResourceHooks } from "@/hooks/api/create-resource-hooks";
import { queryKeys } from "@/lib/query-keys";
import {
  activitiesService,
  blogPostsService,
  categoriesService,
  companiesService,
  commentsService,
  invoicesService,
  messagesService,
  notificationsService,
  ordersService,
  paymentsService,
  productsService,
  scrumCardsService,
  tasksService,
  usersService,
} from "@/services";

const usersHooks = createResourceHooks({
  keys: queryKeys.users,
  service: usersService,
  resourceLabel: "User",
});

const productsHooks = createResourceHooks({
  keys: queryKeys.products,
  service: productsService,
  resourceLabel: "Product",
});

const ordersHooks = createResourceHooks({
  keys: queryKeys.orders,
  service: ordersService,
  resourceLabel: "Order",
});

const companiesHooks = createResourceHooks({
  keys: queryKeys.companies,
  service: companiesService,
  resourceLabel: "Company",
});

const categoriesHooks = createResourceHooks({
  keys: queryKeys.categories,
  service: categoriesService,
  resourceLabel: "Category",
});

const invoicesHooks = createResourceHooks({
  keys: queryKeys.invoices,
  service: invoicesService,
  resourceLabel: "Invoice",
});

const tasksHooks = createResourceHooks({
  keys: queryKeys.tasks,
  service: tasksService,
  resourceLabel: "Task",
});

const messagesHooks = createResourceHooks({
  keys: queryKeys.messages,
  service: messagesService,
  resourceLabel: "Message",
});

const notificationsHooks = createResourceHooks({
  keys: queryKeys.notifications,
  service: notificationsService,
  resourceLabel: "Notification",
});

const paymentsHooks = createResourceHooks({
  keys: queryKeys.payments,
  service: paymentsService,
  resourceLabel: "Payment",
});

const activitiesHooks = createResourceHooks({
  keys: queryKeys.activities,
  service: activitiesService,
  resourceLabel: "Activity",
});

const blogPostsHooks = createResourceHooks({
  keys: queryKeys.blogPosts,
  service: blogPostsService,
  resourceLabel: "BlogPost",
});

const commentsHooks = createResourceHooks({
  keys: queryKeys.comments,
  service: commentsService,
  resourceLabel: "Comment",
});

const scrumCardsHooks = createResourceHooks({
  keys: queryKeys.scrumCards,
  service: scrumCardsService,
  resourceLabel: "ScrumCard",
});

export const useUsers = usersHooks.useList;
export const useUser = usersHooks.useItem;
export const useCreateUser = usersHooks.useCreate;
export const useUpdateUser = usersHooks.useUpdate;
export const useDeleteUser = usersHooks.useRemove;
export const useDeleteUsers = usersHooks.useRemoveMany;

export const useProducts = productsHooks.useList;
export const useProduct = productsHooks.useItem;
export const useCreateProduct = productsHooks.useCreate;
export const useUpdateProduct = productsHooks.useUpdate;
export const useDeleteProduct = productsHooks.useRemove;
export const useDeleteProducts = productsHooks.useRemoveMany;

export const useOrders = ordersHooks.useList;
export const useOrder = ordersHooks.useItem;
export const useCreateOrder = ordersHooks.useCreate;
export const useUpdateOrder = ordersHooks.useUpdate;
export const useDeleteOrder = ordersHooks.useRemove;
export const useDeleteOrders = ordersHooks.useRemoveMany;

export const useCompanies = companiesHooks.useList;
export const useCompany = companiesHooks.useItem;
export const useCreateCompany = companiesHooks.useCreate;
export const useUpdateCompany = companiesHooks.useUpdate;
export const useDeleteCompany = companiesHooks.useRemove;
export const useDeleteCompanies = companiesHooks.useRemoveMany;

export const useCategories = categoriesHooks.useList;
export const useCategory = categoriesHooks.useItem;
export const useCreateCategory = categoriesHooks.useCreate;
export const useUpdateCategory = categoriesHooks.useUpdate;
export const useDeleteCategory = categoriesHooks.useRemove;
export const useDeleteCategories = categoriesHooks.useRemoveMany;

export const useInvoices = invoicesHooks.useList;
export const useInvoice = invoicesHooks.useItem;
export const useCreateInvoice = invoicesHooks.useCreate;
export const useUpdateInvoice = invoicesHooks.useUpdate;
export const useDeleteInvoice = invoicesHooks.useRemove;
export const useDeleteInvoices = invoicesHooks.useRemoveMany;

export const useTasks = tasksHooks.useList;
export const useTask = tasksHooks.useItem;
export const useCreateTask = tasksHooks.useCreate;
export const useUpdateTask = tasksHooks.useUpdate;
export const useDeleteTask = tasksHooks.useRemove;
export const useDeleteTasks = tasksHooks.useRemoveMany;

export const useMessages = messagesHooks.useList;
export const useMessage = messagesHooks.useItem;
export const useCreateMessage = messagesHooks.useCreate;
export const useUpdateMessage = messagesHooks.useUpdate;
export const useDeleteMessage = messagesHooks.useRemove;
export const useDeleteMessages = messagesHooks.useRemoveMany;

export const useNotifications = notificationsHooks.useList;
export const useNotification = notificationsHooks.useItem;
export const useCreateNotification = notificationsHooks.useCreate;
export const useUpdateNotification = notificationsHooks.useUpdate;
export const useDeleteNotification = notificationsHooks.useRemove;
export const useDeleteNotifications = notificationsHooks.useRemoveMany;

export const usePayments = paymentsHooks.useList;
export const usePayment = paymentsHooks.useItem;
export const useCreatePayment = paymentsHooks.useCreate;
export const useUpdatePayment = paymentsHooks.useUpdate;
export const useDeletePayment = paymentsHooks.useRemove;
export const useDeletePayments = paymentsHooks.useRemoveMany;

export const useActivities = activitiesHooks.useList;
export const useActivity = activitiesHooks.useItem;
export const useCreateActivity = activitiesHooks.useCreate;
export const useUpdateActivity = activitiesHooks.useUpdate;
export const useDeleteActivity = activitiesHooks.useRemove;
export const useDeleteActivities = activitiesHooks.useRemoveMany;

export const useBlogPosts = blogPostsHooks.useList;
export const useBlogPost = blogPostsHooks.useItem;
export const useCreateBlogPost = blogPostsHooks.useCreate;
export const useUpdateBlogPost = blogPostsHooks.useUpdate;
export const useDeleteBlogPost = blogPostsHooks.useRemove;
export const useDeleteBlogPosts = blogPostsHooks.useRemoveMany;

export const useComments = commentsHooks.useList;
export const useComment = commentsHooks.useItem;
export const useCreateComment = commentsHooks.useCreate;
export const useUpdateComment = commentsHooks.useUpdate;
export const useDeleteComment = commentsHooks.useRemove;
export const useDeleteComments = commentsHooks.useRemoveMany;

export const useScrumCards = scrumCardsHooks.useList;
export const useScrumCard = scrumCardsHooks.useItem;
export const useCreateScrumCard = scrumCardsHooks.useCreate;
export const useUpdateScrumCard = scrumCardsHooks.useUpdate;
export const useDeleteScrumCard = scrumCardsHooks.useRemove;
export const useDeleteScrumCards = scrumCardsHooks.useRemoveMany;
