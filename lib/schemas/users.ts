import { verification } from "./auth-schema";

//app-level schema/metadata/validation/docs shape for user data, defining the structure and required fields for user objects in the application. This schema can be used for data validation, documentation, and ensuring consistency across the application when handling user data.
export const userSchema = {
  name: "User",
  properties: {
    id: "string",
    name: "string",
    email: "string",
    password: "string",
    createdAt: "date",
    updatedAt: "date",
  },
  required: ["id", "name", "email", "password"],
};
