import { cache } from "react";
import { getMeAction } from "@/actions/auth";
import type { ActionResult } from "@/lib/action";
import type { UserData } from "@/types/auth";

const mockUser: ActionResult<UserData> = {
  success: true,
  id: "bypass-user",
  organizationId: "bypass-org",
  email: "rizal@example.com",
  fullName: "Rizal",
  username: "rizal",
  role: "admin",
  company: null,
  jobTitle: null,
  plan: "pro",
  timezone: "Asia/Jakarta",
  language: "id",
  avatarUrl: null,
  bio: null,
  phone: null,
  socials: {},
  createdAt: "2024-01-01T00:00:00.000Z",
};

async function _getCurrentUser(): Promise<ActionResult<UserData>> {
  if (process.env.BYPASS_AUTH === "true") return mockUser;
  return getMeAction();
}

export const getCurrentUser = cache(_getCurrentUser);
