import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import AuthPage from "./pages/auth";
import InstructorDashboardPage from "./pages/instructor";
import StudentHomePage from "./pages/student/home";
import StudentViewCommonLayout from "./components/student-view/common-layout";
import RouteGuard from "./components/route-guard";
import { AuthContext } from "./context/auth-context";
import "./App.css";
import NotFoundPage from "./pages/not-found";
import AddNewCourse from "./pages/instructor/add-new-course";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      {/* Auth Route */}
      <Route
        path="/auth"
        element={
          <RouteGuard authenticated={auth?.authenticated} user={auth?.user}>
            <AuthPage />
          </RouteGuard>
        }
      />

      {/* Instructor Dashboard */}
      <Route
        path="/instructor"
        element={
          <RouteGuard authenticated={auth?.authenticated} user={auth?.user}>
            <InstructorDashboardPage />
          </RouteGuard>
        }
      />

      {/* Instructor Create Course */}
      <Route
        path="/instructor/create-new-course"
        element={
          <RouteGuard authenticated={auth?.authenticated} user={auth?.user}>
            <AddNewCourse />
          </RouteGuard>
        }
      />

      {/* Student Routes */}
      <Route
        path="/"
        element={
          <RouteGuard authenticated={auth?.authenticated} user={auth?.user}>
            <StudentViewCommonLayout />
          </RouteGuard>
        }
      >
        <Route index element={<StudentHomePage />} />
        <Route path="home" element={<StudentHomePage />} />
      </Route>

      {/* 404 Not Found Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
