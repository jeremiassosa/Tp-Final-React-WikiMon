import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import UserData from '../data/UserData.json';


interface LoginProps {
    email: string;
    password: string;
    setPasswordInput: (password: string) => void;
    setEmailInput: (email: string) => void;
    logout: () => void;
}

export const useLoginForm = create<LoginProps>()(

    persist(

        (set) => ({
            email: UserData.credentials[0].email || '',
            password: UserData.credentials[0].password || '',

            setPasswordInput: (password) => set({ password }),
            setEmailInput: (email) => set({ email }),
            logout: () => set({ password: '', email: '' }),
        }), 
        { name: 'User-Storage' }
    )
)