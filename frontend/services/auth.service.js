import { User } from "@/types/user.types";

class AuthService {
  async login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (
          email === "admin@fleetchain.com" &&
          password === "Admin@123"
        ) {
          resolve({
            id: "1",
            name: "Super Admin",
            email,
            role: "admin",
            status: "active",
            isFirstLogin: false,
            createdAt: new Date().toISOString(),
          });
        } else {
          reject("Invalid credentials");
        }
      }, 1000);
    });
  }
}

export const authService = new AuthService();