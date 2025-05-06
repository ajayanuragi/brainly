import { useState } from "react";
import api from "../../api/axios";
import { Note } from "../../types/types";

type AddContentFormProps = {
    onClose: () => void;
    onContentAdded?: (newNote: Note) => void;
}

export function AddContentForm({ onClose, onContentAdded }: AddContentFormProps) {
    const [type, setType] = useState("tweet");
    const [link, setLink] = useState("");
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
            setError("Authentication token missing.");
            setLoading(false);
            return;
        }

        try {
            const response = await api.post(
                "/content",
                {
                    type,
                    link,
                    title,
                    tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.data.success) {
                onContentAdded?.(response.data.content);
                onClose();
            } else {
                setError("Failed to add content.");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Unexpected error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow mb-6 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Add New Content</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="tweet">Tweet</option>
                    <option value="youtube">YouTube</option>
                    <option value="link">Link</option>
                    <option value="document">Document</option>
                </select>


                <input
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded"
                    required
                />


                <input
                    placeholder="URL"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="border p-2 rounded"
                    required
                />

                <input
                    placeholder="Tags (comma-separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="border p-2 rounded"
                />

                {error && <p className="text-red-600">{error}</p>}

                <div className="flex gap-4 justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded border border-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-900 text-white rounded"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Add Content"}
                    </button>
                </div>
            </form>
        </div>
    );
}
