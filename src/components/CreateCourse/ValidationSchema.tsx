import * as Yup from "yup";

export const createCourseValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Course Name is required")
    .min(5, "Course Name must be at least 5 characters")
    .max(50, "Course Name can't exceed 50 characters"),

  description: Yup.string()
    .required("description is required")
    .min(60, "description must be at least 60 characters")
    .max(600, "description can't exceed 600 characters"),

  language: Yup.string()
    .required("language is required")
    .min(1, "language must be at least 1 characters")
    .max(10, "language can't exceed 10 characters"),

  prerequisites: Yup.array()
    .of(
      Yup.string()
        .required("Each prerequisite is required") // Ensures each item is a string and required
        .min(1, "Each prerequisite must be at least 1 character long") // Minimum length for each string
        .max(5, "Each prerequisite can't exceed 5 characters") // Maximum length for each string
    )
    .min(1, "At least one prerequisite is required") // Array must have at least one element
    .max(20, "Prerequisites can't exceed 20 items") // Array must not exceed 5 items
    .required("Prerequisites are required"), // Ensure the array itself is not empty

  category: Yup.object({
    id: Yup.number()
      .required("Category ID is required")
      .min(1, "category id must be At least 1"),
    name: Yup.string().required("Category is required"),
  }).required("Category is required"),
});