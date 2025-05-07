import { AddContentFormUI } from "./AddContentFormUI";
import { useAddContentForm } from "./useAddContentForm";

type Props = {
    setShowModal: (show: boolean) => void;
};

export function AddContentForm({ setShowModal }: Props) {
    const {
        formData,
        error,
        loading,
        handleChange,
        handleTagsChange,
        handleSave,
    } = useAddContentForm(setShowModal);

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
