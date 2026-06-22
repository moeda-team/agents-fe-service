export interface Skill {
  name: string;
  description: string;
  category: string;
}

export interface PaginatedSkills {
  items: Skill[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
