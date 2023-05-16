import { User } from "./User";

export interface ApiResponse {
  links: {
    next_url: string | null;
  };
  users: User[]
}