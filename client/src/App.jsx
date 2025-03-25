import { Routes, Route } from "react-router-dom"; // ✅ No extra Router
import AuthPage from "./pages/auth";
import "./App.css";
import RouteGuard from "./components/route-guard";
import { useContext } from "react";
import { AuthContext } from "./context/auth-context";
import InstructorDashboardPage from "./pages/instructor";
import StudentHomepage from "./pages/student/home";
import StudentViewCommonLayout from "./components/student-view/common-layout";

function App() {

  const {auth} = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/auth" element={<RouteGuard element={<AuthPage/>} 
      authenticated={auth?.authenticated}
      user={auth?.user}
      />
      } 
      />
      <Route
        path="/instructor">
          element={<RouteGuard 
          element={
          <InstructorDashboardPage/>
        }
        authenticated={auth?.authenticated}
        user={auth?.user}
        />
      }
      </Route>
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
        <Route path="" element={<StudentHomepage/>}/>
        <Route path="home" element={<StudentHomepage/>}/>
      </Route>
    </Routes>
  );
}

export default App;
