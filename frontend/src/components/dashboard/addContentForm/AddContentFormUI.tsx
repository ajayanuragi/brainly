type Props = {
    formData: {
        type: string;
        link: string;
        title: string;
        tags?: string[];
    };
    error: string | null;
    loading: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onTagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCancel: () => void;
    onSave: () => void;
};

export function AddContentFormUI({
    formData,
    error,
    loading,
    onChange,
    onTagsChange,
    onCancel,
    onSave,
}: Props) {
    return (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
                <h2 className="text-xl font-bold mb-4">Add New Content</h2>
                {error && <div className="text-red-500 mb-2">{error}</div>}

                <select
                    name="type"
                    value={formData.type}
                    onChange={onChange}
                    className="w-full border p-2 rounded mb-2"
                >
                    <option value="document">Document</option>
                    <option value="tweet">Tweet</option>
                    <option value="youtube">YouTube</option>
                    <option value="link">Link</option>
                </select>

                <input
                    type="url"
                    name="link"
                    placeholder="Link"
                    value={formData.link}
                    onChange={onChange}
                    className="w-full border p-2 rounded mb-2"
                />

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={onChange}
                    className="w-full border p-2 rounded mb-2"
                />

                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    onChange={onTagsChange}
                    className="w-full border p-2 rounded mb-4"
                />

                <div className="flex gap-2">
                    <button
                        className="px-4 py-2 bg-gray-300 rounded w-1/2"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-950 text-white rounded w-1/2"
                        onClick={onSave}
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </div>
        </div>
    );
}
