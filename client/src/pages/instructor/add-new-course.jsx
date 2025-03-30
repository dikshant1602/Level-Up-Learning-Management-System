import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import CourseCurriculum from "@/components/instructor-view/courses/add-new-course/course-curriculum";
import CourseLanding from "@/components/instructor-view/courses/add-new-course/course-landing";
import CourseSettings from "@/components/instructor-view/courses/add-new-course/course-settings";
import { useContext, useEffect } from "react";
import { InstructorContext } from "@/context/auth-context/instructor-context";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "@/context/auth-context";
import { addNewCourseService, fetchInstructorCourseDetailsService, updateCourseByIdService } from "@/services";



function AddNewCoursePage() {
  // function handleSubmit() {
  //   console.log("Submitting new course...");
  //   // Add course submission logic here
  // }
const {courseLandingFormData, 
  courseCurriculumFormData, 
  setCourseLandingFormData, 
  setCourseCurriculumFormData,
  currentEditedCourseId, 
  setCurrentEditedCourseId,
} = useContext(InstructorContext);

const {auth} = useContext(AuthContext);
const navigate = useNavigate();
const params = useParams();

console.log(params);


function isEmpty(value){
  if(Array.isArray(value)){
    return value.length === 0;
  }
  return value === "" || value === null || value === undefined;
}

function validateFormData(){
  for(const key in courseLandingFormData){
    if(isEmpty(courseLandingFormData[key])){
      return false;
    }
  }
  let hasFreePreview = false;

  for(const item of courseCurriculumFormData){
    if(isEmpty(item.title) || isEmpty(item.videoUrl) || isEmpty(item.public_id)){
      return false;
    }
    if(item.freePreview){
      hasFreePreview = true;
    }
  }
  return hasFreePreview;
}
async function handleCreateCourse() {
  const courseFinalFormData = {
    instructorId: auth?.user?._id,
    instructorName: auth?.user?.userName,
    date: new Date(),
    ...courseLandingFormData,
    students: [],
    curriculum: courseCurriculumFormData,
    isPublised: true,
  };
  const response =
  currentEditedCourseId !== null
    ? await updateCourseByIdService(
        currentEditedCourseId,
        courseFinalFormData
      )
    : await addNewCourseService(courseFinalFormData);


if (response?.success) {
  setCourseLandingFormData(courseLandingInitialFormData);
  setCourseCurriculumFormData(courseCurriculumInitialFormData);
  navigate(-1);
  setCurrentEditedCourseId(null);
}

console.log(courseFinalFormData, "courseFinalFormData");
}

async function fetchCurrentCourseDetails() {
  const response = await fetchInstructorCourseDetailsService(
    currentEditedCourseId
  );

  if (response?.success) {
    const setCourseFormData = Object.keys(
      courseLandingInitialFormData
    ).reduce((acc, key) => {
      acc[key] = response?.data[key] || courseLandingInitialFormData[key];

      return acc;
    }, {});

    console.log(setCourseFormData, response?.data, "setCourseFormData");
    setCourseLandingFormData(setCourseFormData);
    setCourseCurriculumFormData(response?.data?.curriculum);
  }

  console.log(response, "response");
}

useEffect(() => {
  if (currentEditedCourseId !== null) fetchCurrentCourseDetails();
}, [currentEditedCourseId]);

useEffect(() => {
  if (params?.courseId) setCurrentEditedCourseId(params?.courseId);
}, [params?.courseId]);

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold mb-5">Create New Course</h1>
        <Button disabled={!validateFormData()} 
        className="text-sm tracking-wider font-bold px-8"
        onClick={handleCreateCourse}
        >
          SUBMIT
        </Button>
      </div>

      {/* Tabs Section */}
      <Card>
        <CardContent>
          <div className="container mx-auto p-4">
            <Tabs defaultValue="curriculum" className="space-y-4">

              {/* Tabs List */}
              <TabsList>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="course-landing-page">
                  Course Landing Page
                </TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Tabs Content */}
              <TabsContent value="curriculum">
                <CourseCurriculum />
              </TabsContent>
              <TabsContent value="course-landing-page">
                <CourseLanding />
              </TabsContent>
              <TabsContent value="settings">
                <CourseSettings />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddNewCoursePage;
