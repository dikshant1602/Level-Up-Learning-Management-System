import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InstructorContext } from "@/context/auth-context/instructor-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { courseCurriculumInitialFormData } from "@/config";
import { mediaDeleteService, mediaUploadService, mediaBulkUploadService } from "@/services";
import MediaProgressbar from "@/components/common-form/media-progress-bar";
import VideoPlayer from "@/components/video-player";
import { Upload } from "lucide-react";

function CourseCurriculum() {
    // Context for course curriculum state management
    const {
        courseCurriculumFormData,
        setCourseCurriculumFormData,
        mediaUploadProgress,
        setMediaUploadProgress,
        mediaUploadProgressPercentage,
        setMediaUploadProgressPercentage,
    } = useContext(InstructorContext);

    const bulkUploadInputRef = useRef(null);

    // Function to add a new lecture
    function handleNewLecture() {
        setCourseCurriculumFormData([
            ...courseCurriculumFormData,
            { ...courseCurriculumInitialFormData[0] },
        ]);
    }

    // Function to handle lecture title change
    function handleCourseTitleChange(event, currentIndex) {
        let updatedData = [...courseCurriculumFormData];
        updatedData[currentIndex] = {
            ...updatedData[currentIndex],
            title: event.target.value,
        };
        setCourseCurriculumFormData(updatedData);
    }

    // Function to handle Free Preview switch toggle
    function handleFreePreviewChange(currentValue, currentIndex) {
        let updatedData = [...courseCurriculumFormData];
        updatedData[currentIndex] = {
            ...updatedData[currentIndex],
            freePreview: currentValue,
        };
        setCourseCurriculumFormData(updatedData);
    }

    // Function to upload a single lecture video
    async function handleSingleLectureUpload(event, currentIndex) {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const videoFormData = new FormData();
            videoFormData.append("file", selectedFile);

            try {
                setMediaUploadProgress(true);
                const response = await mediaUploadService(videoFormData, setMediaUploadProgressPercentage);
                if (response.success) {
                    let updatedData = [...courseCurriculumFormData];
                    updatedData[currentIndex] = {
                        ...updatedData[currentIndex],
                        videoUrl: response?.data?.url,
                        public_id: response?.data?.public_id,
                    };
                    setCourseCurriculumFormData(updatedData);
                    setMediaUploadProgress(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    // Function to replace an existing video
    async function handleReplaceVideo(currentIndex) {
        let updatedData = [...courseCurriculumFormData];
        const videoPublicId = updatedData[currentIndex].public_id;

        const deleteResponse = await mediaDeleteService(videoPublicId);
        if (deleteResponse?.success) {
            updatedData[currentIndex] = {
                ...updatedData[currentIndex],
                videoUrl: "",
                public_id: "",
            };
            setCourseCurriculumFormData(updatedData);
        }
    }

    // Function to validate curriculum form data
    function isCourseCurriculumFormDataValid() {
        return courseCurriculumFormData.every(item => item.title.trim() !== "" && item.videoUrl.trim() !== "");
    }

    // Function to open bulk upload dialog
    function handleOpenBulkUploadDialog() {
        bulkUploadInputRef.current?.click();
    }

    // Function to handle bulk media upload
    async function handleMediaBulkUpload(event) {
        const selectedFiles = Array.from(event.target.files);
        const bulkFormData = new FormData();
        selectedFiles.forEach(file => bulkFormData.append("files", file));

        try {
            setMediaUploadProgress(true);
            const response = await mediaBulkUploadService(bulkFormData, setMediaUploadProgressPercentage);
            if (response?.success) {
                let updatedData = [...courseCurriculumFormData, ...response?.data.map((item, index) => ({
                    videoUrl: item?.url,
                    public_id: item?.public_id,
                    title: `Lecture ${courseCurriculumFormData.length + (index + 1)}`,
                    freePreview: false,
                }))];
                setCourseCurriculumFormData(updatedData);
                setMediaUploadProgress(false);
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Card>
            {/* Header with Bulk Upload Button */}
            <CardHeader className="flex flex-row justify-between">
                <CardTitle>Create Course Curriculum</CardTitle>
                <div>
                    <Input type="file" ref={bulkUploadInputRef} accept="video/*" multiple className="hidden" id="bulk-media-upload" onChange={handleMediaBulkUpload} />
                    <Button as="label" htmlFor="bulk-media-upload" variant="outline" className="cursor-pointer" onClick={handleOpenBulkUploadDialog}>
                        <Upload className="w-4 h-5 mr-2" /> Bulk Upload
                    </Button>
                </div>
            </CardHeader>

            {/* Content Section */}
            <CardContent>
                <Button disabled={!isCourseCurriculumFormDataValid() || mediaUploadProgress} onClick={handleNewLecture}>Add Lecture</Button>
                {mediaUploadProgress && <MediaProgressbar isMediaUploading={mediaUploadProgress} progress={mediaUploadProgressPercentage} />}
                
                {/* List of lectures */}
                <div className="mt-4 space-y-4">
                    {courseCurriculumFormData.map((item, index) => (
                        <div className="border p-5 rounded-md" key={index}>
                            <div className="flex gap-5 items-center">
                                <h3 className="font-semibold">Lecture {index + 1}</h3>
                                <Input placeholder="Enter Lecture Title" className="max-w-96" onChange={(event) => handleCourseTitleChange(event, index)} value={item.title} />
                                <div className="flex items-center space-x-2">
                                    <Switch onCheckedChange={(value) => handleFreePreviewChange(value, index)} checked={item.freePreview} />
                                    <Label>Free Preview</Label>
                                </div>
                            </div>
                            <div className="mt-6">
                                {item.videoUrl ? (
                                    <div className="flex gap-3">
                                        <VideoPlayer url={item.videoUrl} width="450px" height="200px" />
                                        <Button onClick={() => handleReplaceVideo(index)}>Replace Video</Button>
                                    </div>
                                ) : (
                                    <Input type="file" accept="video" onChange={(event) => handleSingleLectureUpload(event, index)} className="mb-4" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

export default CourseCurriculum;