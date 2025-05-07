import { JSX } from "react";
import { LuLink, LuTwitter, LuYoutube, LuTrash2, LuNotepadText } from "react-icons/lu";

const typeMeta: Record<string, { icon: JSX.Element; label: string }> = {
    document: { icon: <LuNotepadText />, label: "Document" },
    tweet: { icon: <LuTwitter />, label: "Tweet" },
    youtube: { icon: <LuYoutube />, label: "YouTube" },
    link: { icon: <LuLink />, label: "Link" },
};
export function CardTopbar({ type, onDelete }: { type: string, onDelete: () => void }) {
    const meta = typeMeta[type] || { icon: <LuLink />, label: 'Unknown' }
    const handleClick = () => {
        const confirmed = window.confirm("Are you sure you want to delete this note?")
        if(confirmed){
            onDelete()
        }
    }
    return (
        <div className="flex items-center justify-between text-gray-400 text-lg mb-2">
            <div className="flex items-center gap-2">
                {meta.icon}
                <div className="text-black">
                    {meta.label}
                </div>
            </div>
            <div className="flex">
                <div className="cursor-pointer" onClick={handleClick}>
                    <LuTrash2 />
                </div>
            </div>
        </div>
    )
}