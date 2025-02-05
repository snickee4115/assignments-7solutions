import { describe, it, expect, vi } from "vitest";
import { groupUsersByDepartment, mockUsers } from "./lib";
import { GET } from "./route";

describe("/api/users", () => {
  const mockFetch = vi.fn();
  global.fetch = mockFetch;

  it("should return status 200", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    const response = await GET();
    expect(response.status).toBe(200);
  });

  it("should return 500 if there is an internal error in the API", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const response = await GET();
    expect(response.status).toBe(500);
    expect(response.statusText).toContain("Internal Server Error");
  });

  it("should group users correctly by department", () => {
    const users = mockUsers.users;

    const result = groupUsersByDepartment(users);

    expect(result.size).toBe(11);
    const engineeringData = result.get("Engineering");
    expect(engineeringData).toBeDefined();

    expect(engineeringData?.male).toBe(2);
    expect(engineeringData?.female).toBe(2);
    expect(engineeringData?.ageRange).toBe("26-40");
    expect(engineeringData?.hair).toEqual({ Brown: 1, White: 1, Red: 1, Gray: 1 });
    expect(engineeringData?.addressUser).toEqual({
      EmilyJohnson: "29112",
      AlexanderJones: "86684",
      NoahHernandez: "73696",
      MadisonCollins: "62091",
    });
  });
});
