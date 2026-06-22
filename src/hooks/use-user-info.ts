"use client";
import { useAuth } from "@/contexts/AuthContext";

const useUserInfo = () => {
    const { user, isLoading, error } = useAuth();
    
    // Return in the expected format for backward compatibility
    return { 
        userInfo: user || {}, 
        isLoading, 
        isNewUser: false, // New users are handled during registration
        error 
    };
};

export default useUserInfo;
