import axios from "axios";
export const register = async (data) => {
  const res = axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/user/register`,
    data,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res;
};

export const loginUser = async (data) => {
  const res = axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/user/login`,
    data,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  return res;
};

export const getAllUsers = async (data) => {
  const res = axios.get(`${import.meta.env.VITE_BASE_URL}/api/user`, data, {});
  return res;
};

export const myDetails = async (email) => {
  const res = axios.get(
    `${import.meta.env.VITE_BASE_URL}/api/user/${email}`,
    {}
  );
  return res;
};

export const updateUser = async (data) => {
  const res = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/user/update`,
    data,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res;
};
