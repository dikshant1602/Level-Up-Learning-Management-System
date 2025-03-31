import { createContext, useState } from "react";

export const StudentContext = createContext(null)

export default function StudentProvider({children}){
const [studentViewCourseList, setStudentsViewCoursesList] = useState([]);

    return <StudentContext.Provider value={{studentViewCourseList, setStudentsViewCoursesList}}>{children}</StudentContext.Provider>
}