function RequestRow({ request, onDeleteRequest, mode }) {
  const countDays = (startDate, endDate) => {
    const timeDifference = new Date(endDate) - new Date(startDate);
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference + 1; // count both start and end dates
  };

  return (
    <tr>
      <td>{request.dateSubmitted}</td>
      <td>{mode === "manager" && request.employee}</td>
      <td>
        {request.startDate} -&gt; {request.endDate}
      </td>
      <td>{countDays(request.startDate, request.endDate)}</td>
      <td>{request.reason}</td>
      <td>{request.status}</td>
      <td>
        {mode === "employee" && request.status === "pending" && (
          <button onClick={onDeleteRequest}>Delete</button>
        )}
      </td>
    </tr>
  );
}

export default function RequestsTable({ requests, onDeleteRequest, mode }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date submitted</th>
          <th>{mode === "manager" && "Employee"}</th>
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
            request={req}
            mode={mode}
            onDeleteRequest={() => onDeleteRequest(req.id)}
          />
        ))}
      </tbody>
    </table>
  );
}
