import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const { token, user, login, logout } = useAuthStore();

  return {
    token,
    user,
    isAuthenticated: !!token,
    login,
    logout,
  };
};
