import { useState } from "react";
import { Main } from "../components/dashboard/Main";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Topbar } from "../components/dashboard/Topbar";
import { AddContentForm } from "../components/dashboard/addContentForm/AddContentForm";



export function Dashboard() {
    const [showModal, setShowModal] = useState<boolean>(false);

    return (
        <div className="flex min-h-screen">
            <div className="w-48">
                <Sidebar />
            </div>
            <div className="w-full p-8 bg-slate-50">
                <Topbar onAddNote={() => setShowModal(true)} />
                <Main />
                {showModal && (
                    <AddContentForm setShowModal={setShowModal}
                    />
                )}
            </div>
        </div>
    );
}