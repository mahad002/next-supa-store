// store/user.js
import { createStore as create } from 'zustand'

const useUserStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  setUser: (user) => {set({ user: user, isAuthenticated: true }), console.log('User:', user);},
  logout: () => set({ user: null, isAuthenticated: false }),
}));

export default useUserStore;
