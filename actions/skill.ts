"use server";

import serverApi from "@/lib/api/server";
import { withAction, type ActionResult } from "@/lib/action";
import type { Skill, PaginatedSkills } from "@/types/skill";

export async function getSkillsAction(
  page?: number,
): Promise<ActionResult<{ data: Skill[] }>> {
  return withAction(async () => {
    const res = await serverApi.get<PaginatedSkills>("/v1/skills", {
      params: page ? { page } : undefined,
    });
    return { data: Array.isArray(res.data.items) ? res.data.items : [] };
  });
}

export async function getSkillAction(
  name: string,
): Promise<ActionResult<Skill>> {
  return withAction(async () => {
    const res = await serverApi.get<Skill>(`/v1/skills/${name}`);
    return res.data;
  });
}
