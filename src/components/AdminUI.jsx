import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Searchbar from "./Searchbar";
import UserList from "./UserList";
import Footer from "./Footer";

/**
 * The main Admin component that manages the user data and UI.
 * @component
 */
function Admin() {
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const [isError, setError] = useState(false);
  const [soError, setSoError] = useState(false);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  // Determine the list of users to be displayed based on search or all users
  const currUsers = searchUsers.length > 0 ? searchUsers : users;

  /* Pagination Logic starts */
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const lastPageIndex = page * pageSize;
  const firstPageIndex = lastPageIndex - pageSize;
  const currUserList = currUsers.slice(firstPageIndex, lastPageIndex);
  const pageNumbers = [];
  if (currUsers.length > 0) {
    for (let i = 1; i <= Math.ceil(currUsers.length / pageSize); i++) {
      pageNumbers.push(i);
    }
  }
  const handlePageChange = (num) => {
    setPage(num);
  };
  /* Pagination Logic ends */

  useEffect(() => {
    // Fetch user data when component mounts
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) =>
        setUsers(
          data.map((user) => ({
            ...user,
            editEnabled: false,
            isSelected: false,
          }))
        )
      )
      .catch((err) => {
        setError(true);
      });
  }, []);

  /**
   * Handle user deletion by filtering out the user with the provided ID.
   * @param {number} id - The ID of the user to be deleted.
   */
  const handleDelete = (id) => {
    try {
      const updatedUsers = searchUsers.filter((user) => user.id !== id);
      setSearchUsers(updatedUsers);

      const updatedUsers1 = users.filter((user) => user.id !== id);
      setUsers(updatedUsers1);
    } catch (err) {
      setSoError(true);
    }
  };

  /**
   * Enable editing mode for a user by setting 'editEnabled' to true.
   * @param {number} id - The ID of the user to be edited.
   */
  const handleEdit = (id) => {
    try {
      if (searchUsers.length > 0) {
        const updatedUsers = searchUsers.map((user) =>
          user.id === id ? { ...user, editEnabled: true } : user
        );
        setSearchUsers(updatedUsers);
      } else {
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, editEnabled: true } : user
        );
        setUsers(updatedUsers);
      }
    } catch (err) {
      setSoError(true);
    }
  };

  /**
   * Disable editing mode for a user by setting 'editEnabled' to false.
   * @param {number} id - The ID of the user whose editing is being canceled.
   */
  const handleCancel = (id) => {
    try {
      if (searchUsers.length > 0) {
        const updatedUsers = searchUsers.map((user) =>
          user.id === id ? { ...user, editEnabled: false } : user
        );
        setSearchUsers(updatedUsers);
      } else {
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, editEnabled: false } : user
        );
        setUsers(updatedUsers);
      }
    } catch (err) {
      setSoError(true);
    }
  };

  /**
   * Save the edited user data and exit editing mode.
   * @param {number} id - The ID of the user whose data is being saved.
   * @param {string} name - The new name for the user.
   * @param {string} email - The new email for the user.
   * @param {string} role - The new role for the user.
   */
  const handleSave = (id, name, email, role) => {
    try {
      if (searchUsers.length > 0) {
        const updatedUsers = searchUsers.map((user) =>
          user.id === id
            ? {
                ...user,
                name: name,
                email: email,
                role: role,
                editEnabled: false,
              }
            : user
        );
        setSearchUsers(updatedUsers);
      }
      if (users.length > 0) {
        const updatedUsers = users.map((user) =>
          user.id === id
            ? {
                ...user,
                name: name,
                email: email,
                role: role,
                editEnabled: false,
              }
            : user
        );
        setUsers(updatedUsers);
      }
    } catch (err) {
      setSoError(true);
    }
  };

  /**
   * Handle user search based on the provided search term.
   * @param {string} searchTerm - The term to search for in user data.
   */
  const handleSearch = (searchTerm) => {
    setError(false);
    if (searchTerm === "") {
      setSearchUsers([]);
    } else {
      try {
        const searchedUsers = users.filter(
          (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.role.toLowerCase().includes(searchTerm.toLowerCase())
        );
        console.log(searchedUsers);
        if (searchedUsers.length <= 0 || !searchUsers) setError(true);

        setSearchUsers(searchedUsers);
        setPage(1);
      } catch (err) {
        setError(true);
      }
    }
  };

  /**
   * Handle toggling the selection of a user with the provided ID.
   * @param {number} id - The ID of the user whose selection is being toggled.
   */
  const handleChecked = (id) => {
    try {
      if (searchUsers.length > 0) {
        const updatedUsers = searchUsers.map((user) =>
          user.id === id ? { ...user, isSelected: !user.isSelected } : user
        );
        setSearchUsers(updatedUsers);
      } else {
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, isSelected: !user.isSelected } : user
        );
        setUsers(updatedUsers);
      }
    } catch (err) {
      setSoError(true);
    }
  };

  /**
   * Handle deletion of one / multiple users.
   */
  const handleDeleteMultiple = () => {
    try {
      if (searchUsers.length > 0) {
        const updatedUsers = searchUsers.filter((user) => !user.isSelected);
        setSearchUsers(updatedUsers);
        setSelectAllChecked(false);
      } else {
        const updatedUsers = users.filter((user) => !user.isSelected);
        setUsers(updatedUsers);
        setSelectAllChecked(false);
      }
    } catch (err) {
      setSoError(true);
    }
  };

  /**
   * Handle toggling the selection of all users on the current page.
   * @param {Object[]} currUsers - The list of users on the current page.
   */
  const handleAllChecked = (currUsers) => {
    try {
      if (searchUsers.length > 0) {
        const currListSet = new Set(currUsers.map((user) => user.id));
        const markCheckedUsers = searchUsers.map((user) =>
          currListSet.has(user.id)
            ? { ...user, isSelected: !user.isSelected }
            : user
        );
        setSearchUsers(markCheckedUsers);
        setSelectAllChecked(!selectAllChecked);
      } else {
        const currListSet = new Set(currUsers.map((user) => user.id));
        const markCheckedUsers = users.map((user) =>
          currListSet.has(user.id)
            ? { ...user, isSelected: !user.isSelected }
            : user
        );
        setUsers(markCheckedUsers);
        setSelectAllChecked(!selectAllChecked);
      }
    } catch (err) {
      setSoError(true);
    }
  };

  return (
    <div className="container mt-4 d-flex flex-column">
      {isError && (
        <div className="alert alert-danger" role="alert">
          No Records Found!
        </div>
      )}
      {soError && (
        <div className="alert alert-danger" role="alert">
          Some error occured. Please try again later!
        </div>
      )}
      <Searchbar handleSearch={handleSearch} />
      <main className="mt-3 table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectAllChecked}
                  onChange={() => handleAllChecked(currUserList)}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <UserList
            key={currUserList.length}
            users={currUserList}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleSave={handleSave}
            handleCancel={handleCancel}
            handleChecked={handleChecked}
          />
        </table>
      </main>
      <Footer
        page={page}
        pageNumbers={pageNumbers}
        handlePageChange={handlePageChange}
        handleDeleteMultiple={handleDeleteMultiple}
      />
    </div>
  );
}

export default Admin;
