import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Note } from "../../types/types";
import api from "../../api/axios";
import { ShareBrainCard } from "./card/ShareBrainCard";
import { ShareBrainTopBar } from "./ShareBrainTopbar";
export function ShareBrain() {
    const [notes, setNotes] = useState<Note[]>([])
    const [username, setUsername] = useState<string | undefined>(undefined)
    const [error, setError] = useState<string | null>(null)
    const { hash } = useParams()
    useEffect(() => {
        const fetchBrain = async () => {
            try {
                const response = await api.get(`/brain/${hash}`)
                setNotes(response.data.result.content)
                setUsername(response.data.result.username)
            } catch (err: any) {
                setError(err.error)
            }

        }

        fetchBrain()

    }, [hash])

    if (error) {
        return (
            <div className="flex min-h-screen ">
                {error}
            </div>
        )
    }
    return (
        <div className="min-h-screen">
            <ShareBrainTopBar username={username} />

            <div className="columns-1 sm:columns-1 md:columns-2 lg:columns-4 gap-2 space-y-4 p-8">
                {notes.length === 0 ? (
                    <p>No content found.</p>
                ) : (
                    notes.map((note) => (
                        <div className="break-inside-avoid" key={note.id}>
                            <ShareBrainCard note={note} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}