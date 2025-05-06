import { LuBrain, LuShare2, LuTrash2 } from "react-icons/lu"
export function CardTopbar() {
    return (
        <div className="flex items-center justify-between text-gray-400 text-lg">
            <div className="flex items-center gap-2">
                <LuBrain />
                <div className="text-black">
                    Project Ideas
                </div>
            </div>
            <div className="flex gap-2">
                <div className="cursor-pointer">
                    <LuShare2 />
                </div>
                <div className="cursor-pointer">
                    <LuTrash2 />
                </div>
            </div>
        </div>
    )
}