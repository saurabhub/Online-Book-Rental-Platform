import axios from "axios"

export const createCategory = async (category, authtoken) => {
    return await axios.post(
      `${process.env.REACT_APP_API}/category`,
      category,
      {
        headers: {
          authtoken,
        },
      }
    );
  };

export const getAllCategory = async () => {
    return await axios.get(
      `${process.env.REACT_APP_API}/categories`,
    );
  };

export const getCategory = async (slug) => {
    return await axios.get(
      `${process.env.REACT_APP_API}/category/${slug}`,
    );
  };

export const updateCategory = async (category,slug, authtoken) => {
    return await axios.put(
      `${process.env.REACT_APP_API}/category/${slug}`,
      category,
      {
        headers: {
          authtoken,
        },
      }
    );
  };

export const removeCategory = async (slug, authtoken) => {
    return await axios.delete(
      `${process.env.REACT_APP_API}/category/${slug}`,
      {
        headers: {
          authtoken,
        },
      }
    );
  };

  export const getCategorySubs = async (_id) => {
    return await axios.get(
      `${process.env.REACT_APP_API}/category/subs/${_id}`,
    );
  };