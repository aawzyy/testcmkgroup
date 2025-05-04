import { create } from 'zustand';

const useAuthStore = create((set) => ({
 
  user: null, 
  token: null, 
  isLoggedIn: false,


  login: (userData) => set({
    user: userData.user,
    token: userData.token,
    isLoggedIn: true,
  }),

  logout: () => set({
    user: null,
    token: null,
    isLoggedIn: false,
  }),

}));

export default useAuthStore;