import { useEffect, useState } from "react";
import { NoteList } from "../components/dashboard/NoteList";
import { Sidebar } from "../components/dashboard/Sidebar";
import { Topbar } from "../components/dashboard/Topbar";
import { AddContentForm } from "../components/dashboard/addContentForm/AddContentForm";
import { ShareBrainModal } from "../components/shareBrain/ShareBrainModal";
import { Note } from "../types/types";
import api from "../api/axios";

export function Dashboard() {
    const [notes, setNotes] = useState<Note[]>([])
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showShareModal, setShowShareModal] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await api.get('/content')
                setNotes(response.data.content)
            } catch (err) {
                console.error("Error while fetching notes" + err)
                setError('Failed to load notes')
            } finally {
                setLoading(false)
            }
        }

        fetchNotes()
    }, [])

    const handleNoteAdded = async (newNote: Note) => {
        setNotes(prev => [newNote, ...prev])
        setShowModal(false)
    }
    const handleNoteDelete = async (id: string) => {
        try {
            await api.delete('/content', { data: { contentId: id } });
            setNotes(prev => prev.filter(note => note.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    }

    return (
        <div className="flex min-h-screen">
            <div className="w-48">
                <Sidebar />
            </div>
            <div className="p-8 bg-slate-50 w-full">
                <Topbar onAddNote={() => setShowModal(true)} onShareClick={() => setShowShareModal(true)} />
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div className="text-red-600">{error}</div>
                ) : (
                    <NoteList notes={notes} onDelete={handleNoteDelete} />
                )}
                {showModal && (
                    <AddContentForm setShowModal={setShowModal} onNoteAdded={handleNoteAdded}
                    />
                )}
                {
                    showShareModal && (
                        <ShareBrainModal onClose={() => setShowShareModal(false)} />
                    )
                }
            </div>
        </div>
    );
}