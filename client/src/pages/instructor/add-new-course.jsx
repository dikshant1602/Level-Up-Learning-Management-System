import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import CourseLanding from "@/components/instructor-view/courses/add-new-course/course-landing";
import CourseSettings from "@/components/instructor-view/courses/add-new-course/course-settings";
import CourseCurriculum from "@/components/instructor-view/courses/add-new-course/course-curriculum";

function AddNewCourse() {
  function handleSubmit() {
    console.log("Submitting new course...");
    // Add course submission logic here
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold mb-5">Create New Course</h1>
        <Button onClick={handleSubmit} className="text-sm tracking-wider font-bold px-8">
          Submit
        </Button>
      </div>

      {/* Tabs Section */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="curriculum" className="space-y-4">
            <TabsList className="flex gap-4">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="course-landing-page">Course Landing Page</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

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
        </CardContent>
      </Card>
    </div>
  );
}

export default AddNewCourse;
