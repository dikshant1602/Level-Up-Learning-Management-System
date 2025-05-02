import { GraduationCap, TvMinimalPlay } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

function StudentViewCommonHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetCredentials } = useContext(AuthContext);

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  return (
<header className="flex flex-col md:flex-row items-center justify-between p-4 border-b relative gap-y-4 md:gap-y-0">
  {/* Left section */}
  <div className="flex flex-col md:flex-row items-center w-full md:w-auto justify-between md:justify-start gap-y-4 md:gap-y-0">
    <Link to="/home" className="flex items-center hover:text-black">
      <GraduationCap className="h-8 w-8 mr-2" />
      <span className="font-extrabold text-[16px] md:text-xl">LEVEL-UP</span>
    </Link>

    {/* Navigation buttons */}
    <div className="flex space-x-2 mt-2 md:mt-0">
      <Button
        variant="ghost"
        onClick={() => {
          if (!location.pathname.includes("/courses")) {
            navigate("/courses");
          }
        }}
        className="text-[14px] md:text-[16px] font-medium"
      >
        Explore Courses
      </Button>

      <Button
        variant="ghost"
        onClick={() => {
          if (!location.pathname.includes("/superadmin")) {
            navigate("/superadmin");
          }
        }}
        className="text-[14px] md:text-[16px] font-medium"
      >
        Become an Instructor
      </Button>
    </div>
  </div>

  {/* Right section */}
  <div className="flex flex-col md:flex-row items-center w-full md:w-auto justify-between md:justify-end gap-y-4 md:gap-y-0">
    <div
      onClick={() => navigate("/student-courses")}
      className="flex items-center gap-3 cursor-pointer"
    >
      <span className="font-extrabold text-[14px] md:text-xl">My Courses</span>
      <TvMinimalPlay className="w-8 h-8" />
    </div>
    <Button onClick={handleLogout} className="w-full md:w-auto">
      Sign Out
    </Button>
  </div>
</header>

  );
}

export default StudentViewCommonHeader;
