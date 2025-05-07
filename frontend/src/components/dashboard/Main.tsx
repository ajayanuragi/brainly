import { useEffect, useState } from "react";
import { Card } from "./card/Card";
import api from "../../api/axios";
import { Note } from "../../types/types";

export function Main() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null)


    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = localStorage.getItem("token")
                if (!token) {
                    setError("Authentication token not found.");
                    setLoading(false);
                    return;
                }
                const response = await api.get('/content')
                setNotes(response.data.content)
            } catch (error) {
                console.error('failed to load notes, ' + error)
            } finally {
                setLoading(false)
            }
        }

        fetchNotes()
    }, [])

    const handleDelete = async (id: string) => {
        const token = localStorage.getItem('token')
        if (!token) {
            setError("Authentication token not found.");
            setLoading(false);
            return;
        }
        try {
            await api.delete(`/content`, {
                data: { contentId: id }
            })
            setNotes((prev) => prev.filter((note) => note.id !== id))
        } catch (error) {
            console.error('Failed to delete note: ', error)
        }
    }

    if (loading) {
        return <div>Loading....</div>
    }

    if (error) {
        return <div className="text-red-600">{error}</div>;
    }

    return (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {notes.length === 0 ? (
                <p>No content found.</p>
            ) : (
                notes.map((note) => (
                    <div className="break-inside-avoid" key={note.id}>
                        <Card note={note} onDelete={handleDelete} />
                    </div>
                ))
            )}
        </div>
    )
}