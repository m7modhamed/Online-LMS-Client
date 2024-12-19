import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Chip, Avatar, IconButton } from "@mui/material";
import { useDropzone, FileWithPath } from "react-dropzone";
import styles from "./style.module.css";
import { useParams } from "react-router-dom";
import { addFiles, addVideo, getLesson } from "../../api/courseServices";
import { Lesson } from "../../interfaces/interfaces";
import DeleteIcon from "@mui/icons-material/Delete"; // For delete icon

export const AddLessonContent = () => {
  const [lesson, setLesson] = useState<Lesson | null>(null); // State to store lesson details
  const [videoFile, setVideoFile] = useState<File | null>(null); // Video file for upload
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // Video preview URL
  const [files, setFiles] = useState<FileWithPath[]>([]); // File resources for the lesson
  const param = useParams();

  useEffect(() => {
    const fetchLesson = async () => {
      if (param.lessonId) {
        try {
          const lessonData: Lesson = await getLesson(Number(param.lessonId));
          setLesson(lessonData);
          console.log(lessonData);
  
          // Set video preview if it exists
          if (lessonData.video && lessonData.video.url) {
            setVideoUrl(lessonData.video.url); // Ensure the video URL is set correctly
          }
  
          // Set file resources if they exist
          if (lessonData.fileResource) {
            console.log("fileResource exist", lessonData.fileResource);
  
            // Map the files to include full URL
            const formattedFiles = lessonData.fileResource.map((file) => ({
              ...file,
              url: `${file.url.replace(/\\/g, "/")}`, // Use the relative path directly
            }));
  
            setFiles(formattedFiles); // Update files state with formatted data
          }
        } catch (error) {
          console.error("Error fetching lesson:", error);
        }
      }
    };
  
    fetchLesson();
  }, [param.lessonId]);
  
  const handleVideoDelete = () => {
    setVideoUrl('');
  };

  // Handle video upload
  const handleVideoUpload = async () => {
    if (!videoFile) {
      alert("No video selected to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", videoFile); // Key matches backend's @RequestParam("file")

    try {
      const response = await addVideo(Number(param.lessonId), formData);
      console.log("Video uploaded successfully:", response);
      alert("Video uploaded successfully!");
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Failed to upload video. Please try again.");
    }
  };

  const handleFilesUpload = async () => {
    // Filter out files that are not actual File objects
    const validFiles = files.filter((file) => file instanceof File);
  
    if (validFiles.length === 0) {
      alert("No files selected to upload.");
      return;
    }
  
    // Create promises for file uploads
    const promises = validFiles.map((file) => {
      const formData = new FormData();
      formData.append("files", file); // Match backend's parameter name
      return addFiles(Number(param.lessonId), formData);
    });
  
    try {
      await Promise.all(promises);
      alert("Files uploaded successfully!");
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Failed to upload files. Please try again.");
    }
  };
  
  // Handle file removal
  const handleFileDelete = (fileToDelete: FileWithPath) => {
    setFiles(files.filter((file) => file !== fileToDelete));
  };

  // Dropzone configurations for video
  const { getRootProps: getVideoProps, getInputProps: getVideoInputProps } =
    useDropzone({
      accept: "video/*",
      onDrop: (acceptedFiles) => {
        const video = acceptedFiles[0];
        setVideoUrl(URL.createObjectURL(video)); // Preview new video
        setVideoFile(video); // Save video file for upload
      },
    });

  // Dropzone configurations for file resources
  const { getRootProps: getFilesProps, getInputProps: getFilesInputProps } =
    useDropzone({
      onDrop: (acceptedFiles) => {
        setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]); // Add new files to the list
      },
    });

  return (
    <Box className={styles.container}>
      <Typography className={styles.heading} variant="h3" gutterBottom>
        {lesson?.title}
      </Typography>
      <Box className={styles.contentContainer}>
        {/* Video Section */}
        <Box className={styles.videoContent}>
          <Typography variant="h5" sx={{ margin: "15px 0 5px 20px" }}>Video</Typography>

          {videoUrl ? (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <video width="100%" controls className={styles.videoFrame}>
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleVideoDelete}
                  style={{ margin: "10px auto", width: "30%" }}
                >
                  Delete Video
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleVideoUpload}
                  style={{ margin: "10px auto", width: "30%" }}
                >
                  Upload Video
                </Button>
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
                height: '200px',
                margin: '15px auto',
              }}
            >
              <input {...getVideoInputProps()} />
              <p>Drag & drop a video, or click to select</p>
            </Box>
          )}
        </Box>

        {/* File Section */}
        <Box className={styles.fileContent}>
          <Typography variant="h5" sx={{ margin: "15px 0 5px 20px" }}>Files</Typography>

          {/* File upload preview section */}
          {files.length > 0 && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {files.map((file, index) => (
                <Chip
                  key={index}
                  label={file.name}
                  onDelete={() => handleFileDelete(file)}
                  deleteIcon={<DeleteIcon />}
                  sx={{ width: "calc(50% - 10px)", marginBottom: "10px" }}
                />
              ))}
            </Box>
          )}

          {/* Dropzone to upload more files */}
          <Box
            {...getFilesProps()}
            sx={{
              border: "2px dashed #ccc",
              padding: "20px",
              textAlign: "center",
              cursor: "pointer",
              width: "500px",
              height: '200px',
              margin: '15px auto',
            }}
          >
            <input {...getFilesInputProps()} />
            <p>Drag & drop files, or click to select</p>
          </Box>

          {/* Upload files button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleFilesUpload}
            style={{ marginTop: "10px" }}
          >
            Upload Files
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
