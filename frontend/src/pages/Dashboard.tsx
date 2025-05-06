import { Main } from "../components/dashboard/Main";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Topbar } from "../components/dashboard/Topbar";

export function Dashboard() {
    return (
        <div>
            <div className="flex w-full">
                <div className="w-1/6">
                    <Sidebar />
                </div>
                <div className="w-5/6 bg-slate-50 px-8 py-10">
                    <Topbar />
                    <Main />
                </div>
            </div>
        </div>
    )
}