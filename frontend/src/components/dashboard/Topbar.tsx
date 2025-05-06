import { LuShare2 } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
export function Topbar() {
    return (
        <div className="flex justify-between">
            <div className="text-3xl font-bold">
                All Notes
            </div>
            <div className="flex gap-2 items-center">
                <div className="flex text-blue-900 bg-blue-100 py-2 px-4 items-center gap-2 rounded-xl cursor-pointer">
                    <LuShare2 />
                    Share Brain
                </div>
                <div className="flex text-white bg-blue-900 py-2 px-4 items-center gap-2 rounded-xl cursor-pointer">
                    <LuPlus />
                    Add Content
                </div>
            </div>
        </div>
    )
}