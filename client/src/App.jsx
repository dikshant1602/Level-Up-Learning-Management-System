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
import AddNewCoursePage from "./pages/instructor/add-new-course";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <Routes>
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
      <Route
        path="/instructor/create-new-course"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor/edit-course/:courseId"
        element={
          <RouteGuard
            element={<AddNewCoursePage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
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
        <Route path="" element={<StudentHomePage />} />
        <Route path="home" element={<StudentHomePage />} />
        {/* <Route path="courses" element={<StudentViewCoursesPage />} /> */}
        {/* <Route
          path="course/details/:id"
          element={<StudentViewCourseDetailsPage />}
        />
        <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
        <Route path="student-courses" element={<StudentCoursesPage />} />
        <Route
          path="course-progress/:id"
          element={<StudentViewCourseProgressPage />}
        /> */}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
