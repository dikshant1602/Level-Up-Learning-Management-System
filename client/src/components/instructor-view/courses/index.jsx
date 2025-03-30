import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Delete, Edit } from "lucide-react";
import { useContext } from "react";
import { InstructorContext } from "@/context/auth-context/instructor-context";
import { courseCurriculumInitialFormData, courseLandingInitialFormData } from "@/config";


function InstructorCourses({ listOfCourses }) {
  const navigate = useNavigate(); // ✅ Use navigate function
  const  { 
    setCurrentEditedCourseId,   
    setCourseLandingFormData, 
    setCourseCurriculumFormData
  } = useContext(InstructorContext);

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
        <Button onClick={() => {
          setCurrentEditedCourseId(null);
          navigate('/instructor/create-new-course');
          setCourseLandingFormData(courseLandingInitialFormData);
          setCourseCurriculumFormData(courseCurriculumInitialFormData);
          }} 
          className="p-6">
          Create New Course
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableCaption>List of all courses you offer.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listOfCourses && listOfCourses.length > 0 ? (
                listOfCourses.map((course, index) => (
                  <TableRow key={index}> {/* ✅ Added unique key */}
                    <TableCell className="font-medium">{course?.title}</TableCell>
                    <TableCell>{course?.students?.length}</TableCell>
                    <TableCell>${course?.pricing}</TableCell>
                    <TableCell className="text-right">

                      {/* Edit and Delete buttons */}
                      <Button onClick={()=>{
                        navigate(`/instructor/edit-course/${course?._id}`);
                      } 
                      } variant="ghost" size="sm">
                        <Edit className="h-6 w-6" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Delete className="h-6 w-6" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan="4" className="text-center">No courses available</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default InstructorCourses;
