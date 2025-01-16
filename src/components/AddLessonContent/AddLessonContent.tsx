import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Chip } from "@mui/material";
import { useDropzone, FileWithPath } from "react-dropzone";
import styles from "./style.module.css";
import { useParams } from "react-router-dom";
import { addFiles, addVideo, deleteVideo, getLesson } from "../../api/courseServices";
import { Lesson } from "../../interfaces/interfaces";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

export const AddLessonContent = () => {
  const [lesson, setLesson] = useState<Lesson | null>(null); // State for lesson details
  const [videoFile, setVideoFile] = useState<File | null>(null); // Video file for upload
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // Video preview URL
  const [files, setFiles] = useState<FileWithPath[]>([]); // Local file state for manipulation
  const param = useParams();

  const [isDialogOpen , setIsDialogOpen] = useState(false);
  // Fetch lesson details on component mount
  useEffect(() => {
    const fetchLesson = async () => {
      if (param.lessonId) {
        try {
          const lessonData: Lesson = await getLesson(Number(param.lessonId));
          setLesson(lessonData);

          // Set video details
          if (lessonData.video?.url) {
            setVideoUrl(lessonData.video.url);
          }

          // Set file resources
          if (lessonData.fileResource) {
            const formattedFiles = lessonData.fileResource.map((file) => ({
              ...file,
              url: file.url.replace(/\\/g, "/"),
            }));
            setFiles(formattedFiles);
          }
        } catch (error) {
          console.error("Error fetching lesson:", error);
        }
      }
    };
    fetchLesson();
  }, [param.lessonId]);

  const handleVideoDelete = async () =>{
    setIsDialogOpen(true);
  }
    
  const deleteLessonVideo = async () => {
    // Clear video URL from state to remove it locally
    setVideoUrl(null);
  
    try {
      await deleteVideo(Number(param.lessonId));
      alert("Video deleted successfully!");
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video. Please try again.");
    }
  };
  

  const handleVideoUpload = async () => {
    if (!videoFile) {
      alert("No video selected to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", videoFile);

    try {
      await addVideo(Number(param.lessonId), formData);
      alert("Video uploaded successfully!");
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video.");
    }
  };

  // File handling functions
  const handleFilesUpload = async () => {
    const validFiles = files.filter((file) => file instanceof File);

    if (validFiles.length === 0) {
      alert("No files selected to upload.");
      return;
    }

    const uploadPromises = validFiles.map((file) => {
      const formData = new FormData();
      formData.append("files", file);
      return addFiles(Number(param.lessonId), formData);
    });

    try {
      await Promise.all(uploadPromises);
      alert("Files uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files.");
    }
  };

  const handleFileDelete = (fileToDelete: FileWithPath) => {
    setFiles(files.filter((file) => file !== fileToDelete));
  };

  // Dropzone configurations
  const { getRootProps: getVideoProps, getInputProps: getVideoInputProps } =
    useDropzone({
      accept: "video/*",
      onDrop: ([uploadedVideo]) => {
        setVideoUrl(URL.createObjectURL(uploadedVideo));
        setVideoFile(uploadedVideo);
      },
    });

  const { getRootProps: getFilesProps, getInputProps: getFilesInputProps } =
    useDropzone({
      onDrop: (uploadedFiles) =>
        setFiles((prev) => [...prev, ...uploadedFiles]),
    });

  return (
    <Box className={styles.container}>
      <Typography className={styles.heading} variant="h3" gutterBottom>
        {lesson?.title}
      </Typography>
      <Box className={styles.contentContainer}>
        {/* Video Section */}
        <Box className={styles.videoContent}>
          <Typography variant="h5" sx={{ margin: "15px 0 5px 20px" }}>
            Video
          </Typography>
          {videoUrl ? (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <video width="100%" controls className={styles.videoFrame}>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {(
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleVideoDelete}
                    style={{ margin: "10px auto", width: "30%" }}
                  >
                    Delete Video
                  </Button>
                )}
                { (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleVideoUpload}
                    style={{ margin: "10px auto", width: "30%" }}
                  >
                    Upload Video
                  </Button>
                )}
              </Box>
            </Box>
          ) : (
            <Box
              {...getVideoProps()}
              sx={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                width: "500px",
                height: "200px",
                margin: "15px auto",
              }}
            >
              <input {...getVideoInputProps()} />
              <p>Drag & drop a video, or click to select</p>
            </Box>
          )}
        </Box>

        {/* File Section */}
        <Box className={styles.fileContent}>
          <Typography variant="h5" sx={{ margin: "15px 0 5px 20px" }}>
            Files
          </Typography>
          {files.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {files.map((file, index) => (
                <Chip
                  key={index}
                  label={file.name}
                  onDelete={() => handleFileDelete(file)}
                  deleteIcon={<DeleteIcon />}
                  sx={{
                    width: "calc(50% - 10px)",
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                />
              ))}
            </Box>
          )}
          <Box
            {...getFilesProps()}
            sx={{
              border: "2px dashed #ccc",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              width: "500px",
              height: "200px",
              margin: "15px auto",
            }}
          >
            <input {...getFilesInputProps()} />
            <p>Drag & drop files, or click to select</p>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilesUpload}
            style={{ marginTop: "10px" }}
          >
            Save
          </Button>
        </Box>
      </Box>
      <ConfirmDialog isOpen={isDialogOpen} setIsOpen = {setIsDialogOpen} deleteLessonVideo = {deleteLessonVideo}/>
    </Box>
  );
};
