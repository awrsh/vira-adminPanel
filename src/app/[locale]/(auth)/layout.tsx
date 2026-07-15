/** Auth forms render their own premium shell — keep the route group empty. */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
