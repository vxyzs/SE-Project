'use client'
import React, { createContext, useState, useEffect } from 'react';
import Instance from '@/utils/axios'; // Import the instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = async ({name, email, password}) => {
        try {
            const response = await Instance.post('/auth/register/', { name, email, password });
            setUser(response.data);
        } catch (error) {
            console.error(error.response.data);
            throw error;
        }
    };

    const login = async ({email, password}) => {
        try {
            const response = await Instance.post('/auth/login/', { email, password });
            setUser(response.data);
        } catch (error) {
            console.error(error.response.data);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await Instance.post('/auth/logout/');
            setUser(null);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const fetchUserData = async () => {
        try {
            const response = await Instance.get('/auth/user/');
            setUser(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
