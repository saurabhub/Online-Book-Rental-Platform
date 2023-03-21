import axios from "axios"

export const createSub = async (sub, authtoken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/sub`,
      sub,
      {
        headers: {
          authtoken,
        },
      }
    );
  };

export const getAllSub = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API}/subs`,
    );
  };

export const getSub = async (slug) => {
    return await axios.get(
      `${process.env.REACT_APP_API}/sub/${slug}`,
    );
  };

export const updateSub = async (sub,slug, authtoken) => {
    return await axios.put(
      `${process.env.REACT_APP_API}/sub/${slug}`,
      sub,
      {
        headers: {
          authtoken,
        },
      }
    );
  };

export const removeSub = async (slug, authtoken) => {
    return await axios.delete(
      `${process.env.REACT_APP_API}/sub/${slug}`,
      {
        headers: {
          authtoken,
        },
      }
    );
  };