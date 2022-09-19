import React, { useState, createContext, ReactNode } from "react";
import { api } from '../services/api'

import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextData = {
    user: UserProps;
    isAuth: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    token: string
}

type AuthProviderProps = {
    children: ReactNode
}

type SignInProps = {
    email: string;
    password: string;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>({
        id: '',
        name: '',
        email: '',
        token: ''
    })

    const [loadingAuth, setLoadingAuth] = useState(false)

    const isAuth = !!user.name;

    async function signIn({ email, password }: SignInProps) {
        setLoadingAuth(true);

        try {
            const response = await api.post('/login', {
                email, password
            })

            //console.log(response.data)

            const { id, name, token } = response.data;

            const data = {
                ...response.data
            }

            await AsyncStorage.setItem('@comedoria', JSON.stringify(data))

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setUser({ id, name, email, token, })

            setLoadingAuth(false)


        } catch (err) {
            console.log("erro ao acessar", err)
            setLoadingAuth(false)
        }
    }


    return (
        <AuthContext.Provider value={{ user, isAuth, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}