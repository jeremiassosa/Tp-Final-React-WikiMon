import { create } from 'zustand'
import { persist } from 'zustand/middleware';


interface LoginProps {
    password: string;
    name: string;
    setPasswordInput: (password: string) => void;
    setNameInput: (name: string) => void;
}

export const useLoginForm = create<LoginProps>()(

    persist(
    (set) => ({
        password: '',
        name: '',
        setPasswordInput: (password) => set({ password }),
        setNameInput: (name) => set({ name }),   
        logout: () => set({ password: '', name: '' }),
    }), { name: 'clave'}
    )
  )