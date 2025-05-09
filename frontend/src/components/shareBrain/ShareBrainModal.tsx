import { useState } from "react";
import { Toast } from "../ui/Toast";
import api from "../../api/axios";
import { LuCopy } from "react-icons/lu";

export function ShareBrainModal({ onClose }: { onClose: () => void }) {
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const showToast = (message: string, type: "success" | "error" = "success") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };
    const handleShare = async () => {
        try {
            const response = await api.post('/brain/share', { share: true })
            const { shareHash } = response.data
            const shareLink = `${window.location.origin}/shared-brain/${shareHash}`
            await navigator.clipboard.writeText(shareLink)
            showToast('Brain share! Link copied to clipboard'
            )
            setTimeout(() => onClose, 1000)
        } catch (err) {
            showToast('Error sharing brain, ' + err)
        }
    }
    return (
        <div className="fixed inset-0 backdrop-blur-2xl flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
                {toast && <Toast message={toast.message} type={toast.type} />}
                <button className="absolute top-2 right-3 text-4xl text-gray-500 cursor-pointer" onClick={onClose}>×</button>
                <h2 className="text-2xl font-semibold mb-2">Share Your Second Brain</h2>
                <p className="text-gray-600 mb-4">
                    Share your entire collection of notes, documents, tweets, and videos with others.
                    They'll be able to see your content.
                </p>
                <div className="flex gap-2  justify-center items-center w-full bg-indigo-600 text-white p-4 rounded-xl mb-2 cursor-pointer" onClick={handleShare}>
                 <LuCopy />
                    Share Brain
                </div>
                
            </div>
        </div>
    )
}