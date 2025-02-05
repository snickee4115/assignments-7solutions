import { NextResponse } from "next/server";
import { groupUsersByDepartment, OriginalUser } from "./lib";

interface DummyJsonResponse {
  users: OriginalUser[];
}

export async function GET() {
  try {
    const response = await fetch("https://dummyjson.com/users");
    if (!response.ok) {
      return new NextResponse("Failed to fetch users", {
        status: 500,
        statusText: "Failed to fetch users",
      });
    }
    const data: DummyJsonResponse = await response.json();

    const result = groupUsersByDepartment(data.users);

    return NextResponse.json({ data: result });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse("Internal Server Error " + error.message, {
      status: 500,
      statusText: "Internal Server Error " + error.message,
    });
  }
}
