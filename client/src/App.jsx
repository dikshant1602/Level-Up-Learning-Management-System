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

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
      {/* Auth Route */}
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<AuthPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

      {/* Instructor Dashboard */}
      <Route
        path="/instructor"
        element={
          <RouteGuard
            element={<InstructorDashboardPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />

      {/* Student Routes */}
      <Route
        path="/"
        element={
          <RouteGuard
            element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      >
        <Route path="" element={< StudentHomePage />} />
        <Route path="home" element={< StudentHomePage />} />
      </Route>
      <Route path="*" element={< NotFoundPage/>}/>
    </Routes>
  );
}

export default App;
