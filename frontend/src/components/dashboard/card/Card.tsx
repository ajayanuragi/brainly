import { Tweet } from "react-tweet";
import { Note } from "../../../types/types";
import { CardTopbar } from "./CardTopBar";

export function Card({ note, onDelete }: { note: Note, onDelete: (id: string) => void }) {

    const renderContent = () => {
        if (note.type === "tweet") {
            const tweetId = extractTweetId(note.link);
            return tweetId ? (
                <Tweet id={tweetId} />
            ) : (
                <p className="text-red-600">Invalid Tweet URL</p>
            );
        }

        if (note.type === "youtube") {
            const videoId = extractYouTubeVideoId(note.link);
            if (!videoId) {
                return <p className="text-red-600">Invalid YouTube URL</p>;
            }

            return (
                <div className="w-full aspect-video mb-2">
                    <h1 className="pb-2 text-2xl"> {note.title}</h1>
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={note.title}
                        className="w-full h-full rounded"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            );

        }

        return (
            <>
                <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
                <a href={note.link} className="text-blue-900 break-words" target="_blank" rel="noreferrer">
                    {note.link}
                </a>
            </>
        );
    };

    const extractTweetId = (url: string): string | null => {
        const match = url.match(/x\.com\/[^/]+\/status\/(\d+)/);
        return match ? match[1] : null;
    };
    const extractYouTubeVideoId = (url: string): string | null => {
        const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm">
            <CardTopbar type={note.type} onDelete={() => onDelete(note.id)} />
            {renderContent()}
            {note.tags?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                    {note.tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}