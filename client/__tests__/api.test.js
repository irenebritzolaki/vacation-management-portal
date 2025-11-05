import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getAllRequests,
  createRequest,
  updateRequest,
  deleteRequest,
  changeRequestsStatus,
} from "../src/api";

// Make sure db is reset and json-server is running at API_URL before tests

describe("Users API", () => {
  let testUserId;

  test("fetch all users", async () => {
    const users = await getAllUsers();
    expect(users.length).toBeGreaterThanOrEqual(6);
    expect(users[0]).toHaveProperty("id");
    expect(users[0]).toHaveProperty("username");
  });

  test("create, update, and delete a user", async () => {
    // Create
    const newUser = {
      employeeID: 1003002,
      username: "testuser",
      email: "testuser@company.com",
      password: "Test123!",
      role: "employee",
    };
    const created = await createUser(newUser);
    testUserId = created.id;
    expect(created.username).toBe("testuser");

    // Update
    const updated = await updateUser(testUserId, {
      ...created,
      username: "updatedUserName",
    });
    expect(updated.id).toBe(testUserId);
    expect(updated.username).toBe("updatedUserName");

    // Delete
    await deleteUser(testUserId);
    const users = await getAllUsers();
    expect(users.find((u) => u.id === testUserId)).toBeUndefined();
  });
});

describe("Requests API", () => {
  let updateRequestId;
  let rejectRequestId;

  test("fetch all requests", async () => {
    const requests = await getAllRequests();
    expect(requests.length).toBeGreaterThanOrEqual(10);
    expect(requests[0]).toHaveProperty("id");
    expect(requests[0]).toHaveProperty("startDate");
  });

  test("create, update, and approve a request", async () => {
    const newRequest = {
      dateSubmitted: "2025-11-05",
      startDate: "2025-12-10",
      endDate: "2025-12-12",
      reason: "Test update/approve",
      status: "pending",
      userID: "u001",
    };

    // Create
    const created = await createRequest(newRequest);
    updateRequestId = created.id;
    expect(created.status).toBe("pending");

    // Update
    const updated = await updateRequest(updateRequestId, {
      ...created,
      reason: "Updated reason",
    });
    expect(updated.id).toBe(updateRequestId);
    expect(updated.reason).toBe("Updated reason");

    // Approve
    const approved = await changeRequestsStatus(updateRequestId, {
      status: "approved",
    });
    expect(approved.id).toBe(updateRequestId);
    expect(approved.status).toBe("approved");
  });

  test("create, reject, and delete a request", async () => {
    const newRequest = {
      dateSubmitted: "2025-11-06",
      startDate: "2025-12-15",
      endDate: "2025-12-16",
      reason: "Test reject/delete",
      status: "pending",
      userID: "u002",
    };

    // Create
    const created = await createRequest(newRequest);
    rejectRequestId = created.id;
    expect(created.status).toBe("pending");

    // Reject
    const rejected = await changeRequestsStatus(rejectRequestId, {
      status: "rejected",
    });
    expect(rejected.id).toBe(rejectRequestId);
    expect(rejected.status).toBe("rejected");

    // Delete
    await deleteRequest(rejectRequestId);
    const requests = await getAllRequests();
    expect(requests.find((r) => r.id === rejectRequestId)).toBeUndefined();
  });
});
