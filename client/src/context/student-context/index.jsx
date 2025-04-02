import { createContext, useState } from "react";

// ✅ Ensure StudentContext is correctly exported
export const StudentContext = createContext(null);

export default function StudentProvider({ children }) {
  const [studentViewCourseList, setStudentViewCoursesList] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  const [studentViewCourseDetails, setStudentViewCourseDetails] = useState(null);
  const [currentCourseDetailsId, setCurentCourseDetailsId] = useState(null);
  return (
    <StudentContext.Provider value={{ 
    studentViewCourseList, 
    setStudentViewCoursesList, 
    loadingState, 
    setLoadingState,
    studentViewCourseDetails,
    setStudentViewCourseDetails,
    currentCourseDetailsId, 
    setCurentCourseDetailsId,
    }}>
      {children}
    </StudentContext.Provider>
  );
}
