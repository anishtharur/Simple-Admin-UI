import { useState } from "react";

/**
 * Component for rendering a row with editable user data.
 * @component
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.user - The user object.
 * @param {Function} props.handleCancel - The function to cancel user editing.
 * @param {Function} props.handleSave - The function to save edited user data.
 * @param {Function} props.handleChecked - The function to handle checkbox selection.
 */
function EditRow({ user, handleCancel, handleSave, handleChecked }) {
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedRole, setEditedRole] = useState(user.role);
  const [isSelected, setSelected] = useState(false);

  /**
   * Handles user input changes during editing.
   * @param {string} e - The input value.
   * @param {string} id - The identifier for the input field ("name", "email", or "role").
   */
  const handleUserEdit = (e, id) => {
    if (id == "name") {
      setEditedName(e);
    } else if (id == "email") {
      setEditedEmail(e);
    } else {
      setEditedRole(e);
    }
  };

  return (
    <tr key={user.id} className={`${isSelected ? "table-active" : ""}`}>
      <td>
        <input
          type="checkbox"
          onChange={() => {
            handleChecked(user.id);
            setSelected(true);
          }}
          checked={user.isSelected}
        />
      </td>
      <td>
        <input
          type="text"
          value={editedName}
          onChange={(e) => handleUserEdit(e.target.value, "name")}
        />
      </td>
      <td>
        <input
          type="text"
          value={editedEmail}
          onChange={(e) => handleUserEdit(e.target.value, "email")}
        />
      </td>
      <td>
        <input
          type="text"
          value={editedRole}
          onChange={(e) => handleUserEdit(e.target.value, "role")}
        />
      </td>
      <td>
        <div className="actionBtn">
          <button
            className="btn btn-outline-success"
            onClick={() =>
              handleSave(user.id, editedName, editedEmail, editedRole)
            }
          >
            Save
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={() => handleCancel(user.id)}
          >
            Cancel
          </button>
        </div>
      </td>
    </tr>
  );
}

export default EditRow;
