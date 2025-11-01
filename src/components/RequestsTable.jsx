function RequestRow({ request, onDeleteRequest }) {
  const countDays = (startDate, endDate) => {
    const timeDifference = new Date(endDate) - new Date(startDate);
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference + 1; // count both start and end dates
  };

  return (
    <tr>
      <td>{request.dateSubmitted}</td>
      <td>
        {request.startDate} -&gt; {request.endDate}
      </td>
      <td>{countDays(request.startDate, request.endDate)}</td>
      <td>{request.reason}</td>
      <td>{request.status}</td>
      <td>
        {request.status === "pending" && (
          <button onClick={onDeleteRequest}>Delete</button>
        )}
      </td>
    </tr>
  );
}

export default function RequestsTable({ requests, onDeleteRequest }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Date submitted</th>
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
            onDeleteRequest={() => onDeleteRequest(req.id)}
          />
        ))}
      </tbody>
    </table>
  );
}
