function UserRow({ user, onEditUser, onDeleteUser }) {
  return (
    <tr>
      <td>{user.employeeID}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.password}</td>
      <td>
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
          <th>Employee ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Password</th>
          <th></th>
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
