export type Role =
  | "admin"
  | "vendor"
  | "driver"
  | "sender"
  | "receiver";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "active" | "inactive";
  isFirstLogin: boolean;
  walletAddress?: string;
  createdAt: string;
}