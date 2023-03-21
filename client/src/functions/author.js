import axios from "axios"

export const createAuthor = async (author, authtoken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/author`,
      author,
      {
        headers: {
          authtoken,
        },
      }
    );
  };

export const getAllAuthor = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API}/authors`,
    );
  };

export const getAuthor = async (slug) => {
    return await axios.get(
      `${process.env.REACT_APP_API}/author/${slug}`,
    );
  };

export const updateAuthor = async (author,slug, authtoken) => {
    return await axios.put(
      `${process.env.REACT_APP_API}/author/${slug}`,
      author,
      {
        headers: {
          authtoken,
        },
      }
    );
  };

export const removeAuthor = async (slug, authtoken) => {
    return await axios.delete(
      `${process.env.REACT_APP_API}/author/${slug}`,
      {
        headers: {
          authtoken,
        },
      }
    );
  };