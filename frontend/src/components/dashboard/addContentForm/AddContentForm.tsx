import { Note } from "../../../types/types";
import { AddContentFormUI } from "./AddContentFormUI";
import { useAddContentForm } from "./useAddContentForm";

type Props = {
    setShowModal: (show: boolean) => void;
    onNoteAdded: (note:Note) => void
};

export function AddContentForm({ setShowModal, onNoteAdded }: Props) {
    const {
        formData,
        error,
        loading,
        handleChange,
        handleTagsChange,
        handleSave,
    } = useAddContentForm(setShowModal, onNoteAdded);

    return (
        <AddContentFormUI
            formData={formData}
            error={error}
            loading={loading}
            onChange={handleChange}
            onTagsChange={handleTagsChange}
            onCancel={() => setShowModal(false)}
            onSave={handleSave}
        />
    );
}
