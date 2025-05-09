import { JSX } from "react";
import { LuLink, LuNotepadText, LuTwitter, LuYoutube } from "react-icons/lu";

const typeMeta: Record<string, { icon: JSX.Element; label: string }> = {
    document: { icon: <LuNotepadText />, label: "Document" },
    tweet: { icon: <LuTwitter />, label: "Tweet" },
    youtube: { icon: <LuYoutube />, label: "YouTube" },
    link: { icon: <LuLink />, label: "Link" },
};
export function ShareBrainCardTopBar({ title, type }:{title:string, type:string}) {
    const meta = typeMeta[type] || { icon: <LuLink />, label: 'Unknown' }

    return (
        <div className="flex items-center text-gray-400 text-lg mb-2">
            {meta.icon}
            <div className="text-black max-w-64 truncate text-xl font-semibold mx-2">
                {title}
            </div>
        </div>
    )

}