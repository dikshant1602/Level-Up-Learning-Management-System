import { Outlet }  from "react-router-dom" ;
import StudentViewCommonHeader from "./header";


function StudentViewCommonLayout(){
    return (
        <div>
            <StudentViewCommonHeader />
            common content
            <Outlet />
        </div>
    );
}


export default StudentViewCommonLayout;