import UserRow from "./UserRow";
import EditRow from "./EditRow";

/**
 * Component for rendering a list of users.
 * @component
 * @param {Object} props - The props passed to the component.
 * @param {Object[]} props.users - An array of user objects.
 * @param {Function} props.handleDelete - The function to handle user deletion.
 * @param {Function} props.handleEdit - The function to enable user editing.
 * @param {Function} props.handleSave - The function to save user edits.
 * @param {Function} props.handleCancel - The function to cancel user editing.
 * @param {Function} props.handleChecked - The function to handle checkbox selection.
 */
function UserList({
  users,
  handleDelete,
  handleEdit,
  handleSave,
  handleCancel,
  handleChecked,
}) {
  return (
    <tbody className="table-group-divider">
      {users.map((user) =>
        !user.editEnabled ? (
          <UserRow
            key={user.id}
            user={user}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleChecked={handleChecked}
          />
        ) : (
          <EditRow
            key={user.id}
            user={user}
            handleCancel={handleCancel}
            handleSave={handleSave}
            handleChecked={handleChecked}
          />
        )
      )}
    </tbody>
  );
}

export default UserList;
