export { productsModule } from "@/features/products/module";
export {
  useProducts,
  useProduct,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
  useDeleteProducts,
} from "@/features/products/hooks";
export { ProductsPageView } from "@/features/products/products-page";
export { ProductFormDrawer } from "@/features/products/product-form-drawer";
export { ProductDetailsDrawer } from "@/features/products/product-details-drawer";
export {
  createProductSchema,
  PRODUCT_STATUSES,
  type ProductFormValues,
} from "@/features/products/schemas";
