import FormControls from "@/components/common-form/form-controls";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courseLandingPageFormControls } from "@/config";
import { InstructorContext } from "@/context/auth-context/instructor-context";
import { useContext } from "react";


function CourseLanding(){
    const { courseLandingPageFormData, setCourseLandingFormData } = useContext (InstructorContext);
    return (
    <Card>
        <CardHeader>
            <CardTitle>Course Landing Page</CardTitle>
        </CardHeader>
        <CardContent>
            <FormControls 
            formControls={courseLandingPageFormControls}
            formData={courseLandingPageFormData}
            setFormData={setCourseLandingFormData}
            />
        </CardContent>
    </Card>
    );
}

export default CourseLanding;