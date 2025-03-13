import { LayoutProps } from "@/shared/models"
import { AuthLayout } from "@/shared/layouts"

export default function Layout({children}: LayoutProps) {
  return (
    <AuthLayout>{children}</AuthLayout>
  )
}