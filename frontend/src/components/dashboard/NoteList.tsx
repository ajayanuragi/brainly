import { MainProps } from "../../types/types";
import { Card } from "./card/Card";

export function NoteList({notes, onDelete}: MainProps) {


    return (
        <div className="columns-1 sm:columns-1 md:columns-2 lg:columns-3 gap-2 space-y-4
        ">
            {notes.length === 0 ? (
                <p>No content found.</p>
            ) : (
                notes.map((note) => (
                    <div className="break-inside-avoid" key={note.id}>
                        <Card note={note} onDelete={onDelete} />
                    </div>
                ))
            )}
        </div>
    )
}