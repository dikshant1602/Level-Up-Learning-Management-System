import { Outlet, useLocation } from "react-router-dom";
import StudentViewCommonHeader from "./header";
import Footer from "./footer";

function StudentViewCommonLayout() {
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      {!location.pathname.includes("course-progress") && (
        <StudentViewCommonHeader />
      )}

      {/* Main content grows to fill remaining space */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer stays at bottom */}
      <Footer />
    </div>
  );
}

export default StudentViewCommonLayout;
