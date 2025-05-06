import { Main } from "../components/dashboard/Main";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Topbar } from "../components/dashboard/Topbar";

export function Dashboard() {
    
    return (
        <div className="flex min-h-screen">
            <div className="w-48">
            <Sidebar/>
            </div>
            <div className="w-full p-8 bg-slate-50">
                <Topbar />
                <Main />
            </div>
        </div>
    );
}