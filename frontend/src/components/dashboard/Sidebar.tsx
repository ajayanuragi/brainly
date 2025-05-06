import {
    LuBrain,
    LuTwitter,
    LuNotepadText,
    LuVideo,
    LuLink2,
    LuTag,
} from "react-icons/lu";
import { SidebarItems } from "./SidebarItems";
export function Sidebar() {

    return (
        <div>
            <div className="flex flex-col h-full">
                <div className="flex items-center text-blue-900 text-4xl p-4 gap-2 mb-2">
                    <LuBrain />
                    <div className="text-black text-3xl font-bold">Brainly</div>
                </div>
                <div className="flex flex-col px-8 space-y-4">
                    <SidebarItems icon={<LuTwitter />} name={"tweet"} />
                    <SidebarItems icon={<LuNotepadText />} name={"document"} />
                    <SidebarItems icon={<LuVideo />} name={"videos"} />
                    <SidebarItems icon={<LuLink2 />} name={"link"} />
                    <SidebarItems icon={<LuTag />} name={"tags"} />
                </div>
            </div>
        </div>
    );
}
