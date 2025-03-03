import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";

export interface LayoutProps {
    children: ReactNode
}

export type NextPageWithLayout = NextPage & {
    Layout?: (props: LayoutProps) => ReactElement
}
