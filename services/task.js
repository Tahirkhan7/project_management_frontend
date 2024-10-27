import axios from "axios";
export const addTask = async (data) => {
  const res = axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/task/add`,
    data,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res;
};

export const getAllTask = async (email) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/task/all`,
    {
      params: { email },
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};