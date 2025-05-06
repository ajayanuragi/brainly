import { ReactNode } from "react"

type Proptype = {
    icon: ReactNode,
    name: string,
}
export function SidebarItems({ icon, name }: Proptype) {
    return (
        <div className="flex items-center gap-2 text-gray-700 text-lg my-1 cursor-pointer">
            {icon}
            {name.charAt(0).toUpperCase() + name.slice(1)}
        </div>
    )


}