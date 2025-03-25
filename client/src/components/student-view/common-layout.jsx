import { Outlet } from "react-router-dom";


function StudentViewCommonLayout() {
  return (
    <div>
      Common constent
       <Outlet/>
    </div>
  );
}

export default StudentViewCommonLayout;