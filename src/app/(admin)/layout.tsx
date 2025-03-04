import { LayoutProps } from "@/shared/models/common";
import { AdminLayout } from "@/shared/layouts/admin";

export default function Layout({children}: LayoutProps) {
  return (
    <AdminLayout>{children}</AdminLayout>
  )
}
