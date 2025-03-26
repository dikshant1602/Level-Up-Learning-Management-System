import { createContext, useState } from "react";

// Ensure this object is defined (replace with actual initial form data)
const courseLandingInitialFormData = {
    title: "",
    description: "",
    category: "",
};

export const InstructorContext = createContext(null);

export default function InstructorProvider({ children }) {
    const [courseLandingFormData, setCourseLandingFormData] = useState(courseLandingInitialFormData);

    return (
        <InstructorContext.Provider value={{ courseLandingFormData, setCourseLandingFormData }}>
            {children}
        </InstructorContext.Provider>
    );
}
