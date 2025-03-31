import { courseCategories } from "@/config";
import banner from "../../../../public/banner.jpg";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";
import { fetchStudentViewCourseListService } from "@/services";

function StudentHomePage() {
  const { studentViewCourseList, setStudentViewCoursesList } =
    useContext(StudentContext);

    async function fetchAllStudentViewCourses() {
      const response = await fetchStudentViewCourseListService();
      if (response?.success) setStudentViewCoursesList(response?.data);
    }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);
  

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Hero Section */}
      <section className="w-full flex flex-col lg:flex-row items-center justify-between container mx-auto py-16 px-6 lg:px-12">
        {/* Text Section */}
        <div className="lg:w-1/2 lg:pr-12 text-center lg:text-left">
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Learning that gets you
          </h1>
          <p className="text-xl text-gray-700">
            Skills for your present and your future. Get started with us today!
          </p>
        </div>

        {/* Image Section (Increased Size) */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src={banner}
            className="w-full max-w-3xl h-auto rounded-lg shadow-lg"
            alt="Learning Banner"
          />
        </div>
      </section>

      {/* Course Categories Section */}
      <section className="w-full py-12 px-4 lg:px-8 bg-gray-100 flex justify-center">
        <div className="container mx-auto w-full max-w-5xl">
          <h2 className="text-3xl font-bold mb-8 text-center lg:text-left">
            Course Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {courseCategories.map((categoryItem) => (
              <Button
                className="justify-start text-lg py-3 w-full"
                variant="outline"
                key={categoryItem.id}
                onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
              >
                {categoryItem.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 px-4 lg:px-8">
  <h2 className="text-3xl font-bold mb-8 text-center lg:text-left">
    Featured Courses
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentViewCourseList && studentViewCourseList.length > 0 ? (
            studentViewCourseList.map((courseItem) => (
              <div
               // onClick={() => handleCourseNavigate(courseItem?._id)}
                className="border rounded-lg overflow-hidden shadow cursor-pointer"
              >
                <img
                  src={courseItem?.image}
                  width={300}
                  height={150}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{courseItem?.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    {courseItem?.instructorName}
                  </p>
                  <p className="font-bold text-[16px]">
                    ${courseItem?.pricing}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1>No Courses Found</h1>
    )}
  </div>
</section>


    </div>
  );
}

export default StudentHomePage;
