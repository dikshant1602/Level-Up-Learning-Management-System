import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { registerService } from "@/services";
import { useState, createContext, useContext } from "react";

export const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);

  async function handleRegisterUser(event) {
    event.preventDefault();
    const data = await registerService(signUpFormData);
    console.log(data);
  }

  return (
    <AuthContext.Provider value={{ signInFormData, 
    setSignInFormData, 
    signUpFormData, 
    setSignUpFormData, 
    handleRegisterUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
}
