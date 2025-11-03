function UserRow({ user, onEditUser, onDeleteUser }) {
  const capitalizeFirstLetter = function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  return (
    <tr>
      <td>{capitalizeFirstLetter(user.role)}</td>
      <td>{user.employeeID}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td className="actions-column">
        <button onClick={() => onEditUser(user)}>Edit</button>
        <button onClick={() => onDeleteUser(user.id)}>Delete</button>
      </td>
    </tr>
  );
}

export default function UsersTable({ users, onEditUser, onDeleteUser }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Role</th>
          <th>Employee ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Password</th>
          <th className="actions-column"></th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <UserRow
            key={u.id}
            user={u}
            onEditUser={onEditUser}
            onDeleteUser={onDeleteUser}
          />
        ))}
      </tbody>
    </table>
  );
}
