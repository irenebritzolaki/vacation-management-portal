import { formatDate, countDays } from "../../helpers";

function RequestRow({ request, users, onDeleteRequest, mode }) {
  const getUserDetails = (userID) => {
    return users.find((u) => u.id === userID);
  };

  return (
    <tr>
      <td>{formatDate(request.dateSubmitted)}</td>
      <td>{mode === "all" && getUserDetails(request.userID).username}</td>
      <td>
        {formatDate(request.startDate)} &rArr; {formatDate(request.endDate)}
      </td>
      <td>{countDays(request.startDate, request.endDate)}</td>
      <td>{request.reason}</td>
      <td>{request.status}</td>
      <td>
        {mode === "personal" && request.status === "pending" && (
          <button onClick={onDeleteRequest}>Delete</button>
        )}
      </td>
    </tr>
  );
}

export default function RequestsTable({
  requests,
  users,
  onDeleteRequest,
  mode,
}) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date submitted</th>
          <th>{mode === "all" && "Employee"}</th>
          <th>Dates requested</th>
          <th>Total days</th>
          <th>Reason</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {requests.map((req) => (
          <RequestRow
            key={req.id}
            users={users}
            request={req}
            mode={mode}
            onDeleteRequest={() => onDeleteRequest(req.id)}
          />
        ))}
      </tbody>
    </table>
  );
}
