import { useState } from "react";
import { Content } from "../../../types/types";
import api from "../../../api/axios";
import { parseTags } from "./utils";


export function useAddContentForm(setShowModal: (show: boolean) => void) {
    const [formData, setFormData] = useState<Content>({
        type: "document",
        link: "",
        title: "",
        tags: [],
    });

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            tags: parseTags(e.target.value),
        }));
    };

    const handleSave = async () => {
        if (!formData.link || !formData.title) {
            setError("Link and title are required.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("You have no rights.");
                return;
            }

            await api.post("/content", formData);
            setShowModal(false);
            setFormData({ type: "document", link: "", title: "", tags: [] });
        } catch (err) {
            console.error("Failed to save content", err);
            setError("Failed to save content. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        error,
        loading,
        handleChange,
        handleTagsChange,
        handleSave,
    };
}
