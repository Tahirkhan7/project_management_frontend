import axios from "axios";

export const addMemberToBoard = async (data) => {
  const res = await axios.put(
    `${import.meta.env.VITE_BASE_URL}/api/board/addMember/${data.id}`,
    data,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res;
};
