import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import { ChevronLeft } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCurrentCourseProgressService } from "@/services"; // ✅ Make sure this service is properly imported


function StudentViewCourseProgressPage() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { studentCurrentCourseProgress, setStudentCurrentCourseProgress } =
    useContext(StudentContext);
    const [lockCourse, setLockCourse] = useState(false);
  const [currentLecture, setCurrentLecture] = useState(null);

  const { id } = useParams();

  async function fetchCurrentCourseProgress() {
    const response = await getCurrentCourseProgressService(auth?.user?._id, id);
    if (response?.success) {
        if (!response?.data?.isPurchased) {
          setLockCourse(true);
        } else {
          setStudentCurrentCourseProgress({
            courseDetails: response?.data?.courseDetails,
            progress: response?.data?.progress,
          });


        if (response?.data?.completed) {
            setCurrentLecture(response?.data?.courseDetails?.curriculum[0]);
            setShowCourseCompleteDialog(true);
            setShowConfetti(true);
  
            return;
          }
        }
    }
  }

  useEffect(() => {
    if (id) {
      fetchCurrentCourseProgress();
    }
  }, [id]);

  return (
    <div className="flex flex-col h-screen bg-[#1c1d1f] text-white">
      <div className="flex items-center justify-between p-4 bg-[#1c1d1f] border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => navigate("/student-courses")}
            className="text-black"
            variant="ghost"
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to My Courses Page
          </Button>
        </div>
      </div>

      {/* Add your course progress display here */}
      <div className="p-6">
        <h1 className="text-2xl font-bold">Course Progress Page</h1>
        {/* Display progress from `studentCurrentCourseProgress` here */}
      </div>
    </div>
  );
}

export default StudentViewCourseProgressPage;
