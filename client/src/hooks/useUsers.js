import { useState } from "react";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getRequestsByUserID,
  deleteRequest,
} from "../api";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);

  const loadUsers = async () => {
    getAllUsers().then((result) => setUsers(result));
  };

  const handleCreateUser = (e) => {
    e.stopPropagation();
    setEditingUser(null);
    setShowUserForm(true);
  };

  const handleSubmitCreateUser = async (userData) => {
    createUser(userData).then((savedUser) => {
      setUsers([...users, savedUser]);
      setShowUserForm(false);
    });
  };

  const handleEditUser = (userToEdit) => {
    setEditingUser(userToEdit);
    setShowUserForm(true);
  };

  const handleUpdateUser = async (user) => {
    await updateUser(user.id, user);
    setUsers(users.map((u) => (u.id === user.id ? user : u)));
    setEditingUser(null);
    setShowUserForm(false);
  };

  const openDeleteUserModal = (user) => {
    setDeletingUser(user);
    setShowDeleteUserModal(true);
  };

  const closeDeleteUserModal = () => {
    setDeletingUser(null);
    setShowDeleteUserModal(false);
  };

  const handleDeleteUser = async () => {
    const userID = deletingUser.id;
    const userRequests = await getRequestsByUserID(userID);
    await Promise.all(userRequests.map((req) => deleteRequest(req.id)));
    await deleteUser(userID);

    setUsers(users.filter((u) => u.id !== userID));
    setDeletingUser(null);
    setShowDeleteUserModal(false);
  };

  return {
    users,
    showUserForm,
    setShowUserForm,
    setEditingUser,
    editingUser,
    deletingUser,
    showDeleteUserModal,
    loadUsers,
    handleCreateUser,
    handleSubmitCreateUser,
    handleEditUser,
    handleUpdateUser,
    handleDeleteUser,
    openDeleteUserModal,
    closeDeleteUserModal,
  };
}
