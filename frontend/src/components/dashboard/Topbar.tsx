import { LuShare2, LuPlus } from "react-icons/lu";
type TopbarProps = {
    onAddNote: () => void;
    onShareClick: () => void;
}

export function Topbar({ onAddNote, onShareClick }: TopbarProps) {
    return (

        <div className="flex justify-between items-center mb-4">
            <div className="text-xl md:text-3xl font-bold">All Notes</div>

            <div className="flex gap-2">
                <div className="text-xs md:text-base flex text-blue-900 bg-blue-100 py-2 px-4 items-center gap-2 rounded-xl cursor-pointer"
                    onClick={onShareClick}>
                    <LuShare2 />
                    Share Brain
                </div>
                <div
                    className="text-xs md:text-base flex text-white bg-blue-900 py-2 px-4 items-center gap-2 rounded-xl cursor-pointer"
                    onClick={onAddNote}>
                    <LuPlus />
                    Add Content
                </div>
            </div>
        </div>

    );
}
