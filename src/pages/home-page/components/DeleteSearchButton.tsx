
interface DeleteSearchButtonProps {
    onDelete: () => void;
}

const DeleteSearchButton = ( { onDelete }: DeleteSearchButtonProps ) => {

    return (
        <button
            className="delete-search-button"
            onClick={() => onDelete()}
        >
            Delete Search
        </button>
    );

}

export default DeleteSearchButton;