import axios from "axios"

export const createPublisher = async (publisher, authtoken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/publisher`,
      publisher,
      {
        headers: {
          authtoken,
        },
      }
    );
  };

export const getAllPublisher = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API}/publishers`,
    );
  };

export const getPublisher = async (slug) => {
    return await axios.get(
      `${process.env.REACT_APP_API}/publisher/${slug}`,
    );
  };

export const updatePublisher = async (publisher,slug, authtoken) => {
    return await axios.put(
      `${process.env.REACT_APP_API}/publisher/${slug}`,
      publisher,
      {
        headers: {
          authtoken,
        },
      }
    );
  };

export const removePublisher = async (slug, authtoken) => {
    return await axios.delete(
      `${process.env.REACT_APP_API}/publisher/${slug}`,
      {
        headers: {
          authtoken,
        },
      }
    );
  };
