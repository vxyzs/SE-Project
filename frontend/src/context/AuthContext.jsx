'use client'
import React, { createContext, useState, useEffect } from 'react';
import Instance from '@/utils/axios'; // Import the instance
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = async ({name, email, password}) => {
        try {
            const response = await Instance.post('/auth/register/', { name, email, password });
            const token = response.data.jwt;
            sessionStorage.setItem('jwt', token);
            setUser(response.data);
        } catch (error) {
            console.error(error.response.data);
            throw error;
        }
    };

    const login = async ({email, password}) => {
        try {
            const response = await Instance.post('/auth/login/', { email, password });
            const token = response.data.jwt;
            sessionStorage.setItem('jwt', token);
            setUser(response.data);
        } catch (error) {
            console.error(error.response.data);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await Instance.post('/auth/logout/');
            sessionStorage.removeItem('jwt');
            setUser(null);
        } catch (error) {
            console.error(error.response.data);
        }
    };

    const fetchUserData = async () => {
        try {
            const token = sessionStorage.getItem('jwt');
            if (!token) {
                throw new Error('No token found, please login first');
            }
    
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;  
    
            if (decodedToken.exp < currentTime) {
                sessionStorage.removeItem('jwt');
                throw new Error('Session expired, please log in again');
            }
    
            const response = await Instance.get('/auth/user/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
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
