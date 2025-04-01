import { createContext, useState } from "react";

// ✅ Ensure StudentContext is correctly exported
export const StudentContext = createContext(null);

export default function StudentProvider({ children }) {
  const [studentViewCourseList, setStudentViewCoursesList] = useState([]);
  const [loadingState, setLoadingState] = useState(true);
  return (
    <StudentContext.Provider value={{ studentViewCourseList, setStudentViewCoursesList, loadingState, setLoadingState }}>
      {children}
    </StudentContext.Provider>
  );
}
