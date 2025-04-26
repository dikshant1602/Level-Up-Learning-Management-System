import { courseCategories } from "@/config";
import banner from "../../../../public/banner.jpg";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";
import { checkCoursePurchaseInfoService, fetchstudentViewCoursesListService } from "@/services";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';

function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
    const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleNavigateToCoursesPage(getCurrentId) {
    console.log(getCurrentId);
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [getCurrentId],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    navigate("/courses");
  }
  

    async function fetchAllStudentViewCourses() {
      const response = await fetchstudentViewCoursesListService();
      if (response?.success) setStudentViewCoursesList(response?.data);
    }

      async function handleCourseNavigate(getCurrentCourseId) {
        const response = await checkCoursePurchaseInfoService(
          getCurrentCourseId,
          auth?.user?._id
        );
    
        if (response?.success) {
          if (response?.data) {
            navigate(`/course-progress/${getCurrentCourseId}`);
          } else {
            navigate(`/course/details/${getCurrentCourseId}`);
          }
        }
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
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem) => (
              <div
                onClick={() => handleCourseNavigate(courseItem?._id)}
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
<section className="w-full bg-gray-100 py-12 px-4 lg:px-8">
  <h2 className="text-3xl font-bold mb-8 text-center lg:text-left">Our Studets at the Top Firms</h2>
  <Swiper
    spaceBetween={20}
    slidesPerView={1}
    breakpoints={{
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    }}
    autoplay={{ delay: 4000 }}
    className="max-w-6xl mx-auto"
  >
    {[
      {
        name: "Aarav Mehta",
        feedback: "The courses were detailed and helped me land my first internship at Google. Interating with teachers was a big win.",
        image: "https://randomuser.me/api/portraits/men/43.jpg",
      },
      {
        name: "Selina Johns",
        feedback: "The instructors are amazing and explain everything clearly. Level Up helped me to get the job offer from Meta.",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
      },
      {
        name: "Rohit Jain",
        feedback: "This platform gave me the confidence to build full-stack projects to launch my own website.",
        image: "https://randomuser.me/api/portraits/men/33.jpg",
      },
    ].map((testimonial, index) => (
      <SwiperSlide key={index}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white shadow-lg rounded-lg p-6 text-center mx-2"
        >
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
          />
          <p className="italic text-gray-700 mb-2">"{testimonial.feedback}"</p>
          <h4 className="font-bold">{testimonial.name}</h4>
        </motion.div>
      </SwiperSlide>
    ))}
  </Swiper>
</section>


{/* Our Creators Section */}
<section className="w-full bg-white py-12 px-4 lg:px-8">
  <h2 className="text-3xl font-bold mb-8 text-center lg:text-left">
    Meet the Course Creators
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
    {[
      {
        name: "Riya James",
        role: "Frontend Developer",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        education: "B.Tech, IIT Delhi",
        experience: "3+ yrs in React.js & Tailwind CSS",
      },
      {
        name: "Adam Sandler",
        role: "Backend Developer",
        image: "https://randomuser.me/api/portraits/men/52.jpg",
        education: "MCA, NIT Trichy",
        experience: "4+ yrs in Node.js & MongoDB",
      },
      {
        name: "Neha Singh",
        role: "UI/UX Designer",
        image: "https://randomuser.me/api/portraits/women/49.jpg",
        education: "B.Des, NID Ahmedabad",
        experience: "5+ yrs in UX Design",
      },
      {
        name: "Bruce Wayne",
        role: "Project Manager",
        image: "https://randomuser.me/api/portraits/men/47.jpg",
        education: "MBA, IIM Bangalore",
        experience: "7+ yrs in IT Project Management",
      },
    ].map((creator, index) => (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-gray-50 p-6 rounded-lg shadow text-center hover:shadow-lg transition-shadow"
        key={index}
      >
        <img
          src={creator.image}
          alt={creator.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
        />
        <h3 className="font-bold text-lg">{creator.name}</h3>
        <p className="text-gray-600">{creator.role}</p>
        <p className="text-sm text-gray-500 mt-2">{creator.education}</p>
        <p className="text-sm text-gray-500 mb-2">{creator.experience}</p>
      </motion.div>
    ))}
  </div>
</section>

    </div>
  );
}

export default StudentHomePage;
