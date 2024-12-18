import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useDropzone, FileWithPath } from "react-dropzone";
import styles from "./style.module.css";
import { useParams } from "react-router-dom";
import { addMedia } from "../../api/courseServices";

export const AddLessonContent = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null); // To hold the video URL for preview


  const param = useParams();[]

  // Handle drop or selection of video files
  const onDrop = (acceptedFiles: FileWithPath[]) => {
    // Filter out non-video files
    const videoFiles = acceptedFiles.filter((file) => file.type.startsWith("video/"));
    
    if (videoFiles.length > 0) {
      const file = videoFiles[0]; // Take the first video file
      const videoPreviewUrl = URL.createObjectURL(file); // Create a URL to preview the video
      setVideoUrl(videoPreviewUrl); // Set video preview URL
      
      // try{

      //   const response = addMedia(param.lessonId ,file );
      //   response.then((res)=>{
      //     console.log(res)
      //   })
      // }catch(error){
      //     console.error(error);
      // }

    } else {
      console.error("Please upload a valid video file.");
      // Optionally, show an error message or handle non-video files
    }
  };
  
  useEffect(()=>{

    
  },[])


  // Set up the dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "video/*", // Only accept video files
    onDrop, // Callback for when files are dropped
  });

  return (
    <Box className={styles.container}>
      <Box className={styles.videoContent}>
        <h1>Video Content</h1>

        {/* Dropzone for video upload */}
        {!videoUrl &&
          <div
          {...getRootProps()}
          style={{
            border: "2px dashed #ccc",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
            width : '500px'
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the video here...</p>
          ) : (
            <p>Drag & drop a video, or click to select</p>
          )}
        </div>
        }

        {/* Video preview */}
        {videoUrl && (
          <div style={{ marginTop: "20px", maxWidth: "100%", position: "relative" }}>
          <video
            width="100%" // Makes the video responsive to container width
            controls
            style={{ borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }} // Optional: For styling
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        )}
      </Box>

      <Box className={styles.fileContent}>
        {/* Add any other file content or form fields here if needed */}
        <h2>File Content</h2>
      </Box>
    </Box>
  );
};
