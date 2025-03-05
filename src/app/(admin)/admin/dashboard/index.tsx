import { Breadcrumbs } from "@/components/admin/bread-crumb";

export function DashBoardPage() {
    return (
        <main>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                    <Breadcrumbs items={[{ label: "Admin", href: "#" }, { label: "Dashboard" }]} />
                </div>
            </header>
        </main>
    );
}
