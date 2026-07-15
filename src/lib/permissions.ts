import type { Permission, SessionUser } from "@/types";

export function hasPermission(
  user: SessionUser | null | undefined,
  permission: Permission,
): boolean {
  if (!user) return false;
  return user.permissions.includes(permission);
}

export function hasAnyPermission(
  user: SessionUser | null | undefined,
  permissions: readonly Permission[],
): boolean {
  if (!user || permissions.length === 0) return false;
  return permissions.some((permission) => user.permissions.includes(permission));
}

export function hasAllPermissions(
  user: SessionUser | null | undefined,
  permissions: readonly Permission[],
): boolean {
  if (!user) return false;
  if (permissions.length === 0) return true;
  return permissions.every((permission) =>
    user.permissions.includes(permission),
  );
}

export function filterByPermission<T extends { permissions?: Permission[] }>(
  user: SessionUser | null | undefined,
  items: readonly T[],
): T[] {
  return items.filter((item) => {
    if (!item.permissions || item.permissions.length === 0) return true;
    return hasAnyPermission(user, item.permissions);
  });
}
