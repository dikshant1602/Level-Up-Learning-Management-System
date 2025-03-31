import { createContext, useState } from "react";

// ✅ Ensure StudentContext is correctly exported
export const StudentContext = createContext(null);

export default function StudentProvider({ children }) {
  const [studentViewCourseList, setStudentViewCoursesList] = useState([]);

  return (
    <StudentContext.Provider value={{ studentViewCourseList, setStudentViewCoursesList }}>
      {children}
    </StudentContext.Provider>
  );
}
