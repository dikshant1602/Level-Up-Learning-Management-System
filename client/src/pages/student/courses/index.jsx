import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { filterOptions, sortOptions } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { ArrowUpDownIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

function StudentViewCoursesPage() {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    studentViewCourseList,
    setStudentViewCoursesList,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleFilterOnChange = (sectionId, option) => {
    let updatedFilters = { ...filters };
    const exists = updatedFilters[sectionId]?.includes(option.id);

    if (!updatedFilters[sectionId]) {
      updatedFilters[sectionId] = [option.id];
    } else if (!exists) {
      updatedFilters[sectionId].push(option.id);
    } else {
      updatedFilters[sectionId] = updatedFilters[sectionId].filter(
        (id) => id !== option.id
      );
    }

    setFilters(updatedFilters);
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters));
  };

  const fetchAllStudentViewCourses = async (filters, sortBy) => {
    const query = new URLSearchParams({
      ...filters,
      sortBy,
    });

    const response = await fetchStudentViewCourseListService(query);
    if (response?.success) {
      setStudentViewCoursesList(response.data);
      setLoadingState(false);
    }
  };

  const handleCourseNavigate = async (courseId) => {
    const response = await checkCoursePurchaseInfoService(
      courseId,
      auth?.user?._id
    );

    if (response?.success) {
      navigate(
        response.data
          ? `/course-progress/${courseId}`
          : `/course/details/${courseId}`
      );
    }
  };

  useEffect(() => {
    const storedFilters = JSON.parse(sessionStorage.getItem("filters")) || {};
    setFilters(storedFilters);
  }, []);

  useEffect(() => {
    if (filters && sort) {
      fetchAllStudentViewCourses(filters, sort);
    }
  }, [filters, sort]);

  useEffect(() => {
    const queryString = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(queryString));
  }, [filters]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("filters");
    };
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Courses</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-64 space-y-4">
          {Object.keys(filterOptions).map((sectionKey) => (
            <div className="p-4 border-b" key={sectionKey}>
              <h3 className="font-bold mb-3">{sectionKey.toUpperCase()}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[sectionKey].map((option) => (
                  <Label
                    className="flex font-medium items-center gap-3"
                    key={option.id}
                  >
                    <Checkbox
                      checked={
                        filters?.[sectionKey]?.includes(option.id) || false
                      }
                      onCheckedChange={() =>
                        handleFilterOnChange(sectionKey, option)
                      }
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
          ))}
        </aside>

        <main className="flex-1">
          <div className="flex justify-end items-center mb-4 gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 p-5"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-[16px] font-medium">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={(value) => setSort(value)}
                >
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem value={item.id} key={item.id}>
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-black font-bold">
              {studentViewCourseList.length} Results
            </span>
          </div>

          <div className="space-y-4">
            {loadingState ? (
              <Skeleton />
            ) : studentViewCourseList.length > 0 ? (
              studentViewCourseList.map((courseItem) => (
                <Card
                  key={courseItem._id}
                  onClick={() => handleCourseNavigate(courseItem._id)}
                  className="cursor-pointer"
                >
                  <CardContent className="flex gap-4 p-4">
                    <div className="w-48 h-32 flex-shrink-0">
                      <img
                        src={courseItem.image}
                        alt={courseItem.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {courseItem.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mb-1">
                        Created By{" "}
                        <span className="font-bold">
                          {courseItem.instructorName}
                        </span>
                      </p>
                      <p className="text-[16px] text-gray-600 mt-3 mb-2">
                        {`${courseItem.curriculum?.length || 0} ${
                          courseItem.curriculum?.length === 1
                            ? "Lecture"
                            : "Lectures"
                        } - ${courseItem.level.toUpperCase()} Level`}
                      </p>
                      <p className="font-bold text-lg">
                        ${courseItem.pricing}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <h1 className="font-extrabold text-4xl">No Courses Found</h1>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default StudentViewCoursesPage;
