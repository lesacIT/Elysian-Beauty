import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getBlogs = async () => {
  const response = await axios.get(`${base_url}blog/`);

  return response.data;
};
const createBlog = async (blog) => {
  try {
    console.log("Start creating blog:", blog);
    
    const response = await axios.post(`${base_url}blog/`, blog, config);

    console.log("Blog created successfully:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error creating blog:", error);
    throw error; // Đảm bảo rằng lỗi được chuyển tiếp
  }
};

const updateBlog = async (blog) => {
  try {
    console.log("Updating blog with data:", blog);

    const formData = new FormData();
    formData.append("title", blog?.blogData?.title);
    formData.append("description", blog?.blogData?.description);
    formData.append("category", blog?.blogData?.category);
    
    // Append each image to FormData
    blog?.blogData?.images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    const response = await axios.put(
      `${base_url}blog/${blog.id}`,
      formData,
      config
    );

    console.log("Update successful. Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error; // Rethrow the error to handle it in the calling code if needed
  }
};

const getBlog = async (id) => {
  const response = await axios.get(`${base_url}blog/${id}`, config);

  return response.data;
};

const deleteBlog = async (id) => {
  const response = await axios.delete(`${base_url}blog/${id}`, config);

  return response.data;
};
const blogService = {
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
};

export default blogService;
