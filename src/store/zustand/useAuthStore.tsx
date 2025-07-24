import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  credential: string | null;
  setCredential: (credential: string) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      credential: null,
      setCredential: (credential) => set({ credential }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
