import { useEffect, useState } from "react";
import { getUsers, addUser, editUser, deleteUser } from "../api/ApiRequest";
import { UserCard } from "./UserCard";
import { UserForm } from "./UserForm";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch users initially
  const getData = async () => {
    try {
      const response = await getUsers();
      if (response.status === 200) {
        setUsers(response.data);
      }
      setLoading(false);
    } catch (error) {
      setError(error.message);
      // console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Handle adding a new user
  const handleAddUser = async (user) => {
    try {
      const response = await addUser(user);
      if (response.status === 201) {
        // console.log(user);
        const newUser = { ...response.data, id: users.length + 1 };
        setUsers((prevUsers) => [...prevUsers, newUser]);
        setIsAdding(false); // Close the add form
        // console.log(users);
      }
    } catch (error) {
      setError(error.message);
      // console.log(error);
    }
  };

  // Handle editing of an existing user
  const handleEditUser = async (id, updatedUser) => {
    try {
      const response = await editUser(id, updatedUser);
      if (response.status === 200) {
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, ...updatedUser } : user
          )
        );
        setIsEditing(false);
      }
    } catch (error) {
      // if custom created user not found by id in api then adding edited user directly to user state
      setUsers(
        users.map((user) =>
          user.id === id ? { ...user, ...updatedUser } : user
        )
      );
      // console.log(error);
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (id) => {
    try {
      const response = await deleteUser(id);
      if (response.status === 200) {
        setUsers(users.filter((user) => user.id !== id));
      }
    } catch (error) {
      // if custom created user not found by id in api then deleting user directly from user state
      setUsers(users.filter((user) => user.id !== id));
      // console.log(error);
    }
  };

  // Filter users based on search query
  const filteredUser = users.filter((user) =>
    user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );


  if (error) return <h1>{error}</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <section className="container">
      <h1 className="main-heading">Users</h1>
      <div className="user-search">
        <input
          type="text"
          name="search"
          placeholder="Search user by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="btn-adduser" onClick={() => setIsAdding(true)}>Add User</button>
      </div>

      {/* Add/Edit User Form */}
      {(isAdding || isEditing) && (
        <UserForm
          users={users}
          user={currentUser}
          onSubmit={isEditing ? handleEditUser : handleAddUser}
          onCancel={() => {
            setIsAdding(false);
            setIsEditing(false);
            setCurrentUser(null);
          }}
        />
      )}

      {/* Display Users */}
      <ul className="cards">
        {filteredUser.map((eachUser) => (
          <UserCard
            key={eachUser.id}
            userData={eachUser}
            onAdd={() => setIsAdding(true)}
            onEdit={() => {
              setIsEditing(true);
              setCurrentUser(eachUser);
            }}
            onDelete={handleDeleteUser}
          />
        ))}
      </ul>
    </section>
  );
};
