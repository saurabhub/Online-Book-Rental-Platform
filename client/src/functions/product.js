import axios from "axios";

export const createProduct = async (product, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });
};

export const getAllProductsByCount = async (count) => {
  return await axios.get(`${process.env.REACT_APP_API}/products/${count}`);
};

export const removeProduct = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/product/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const getProduct = async (slug) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/product/${slug}`,
  );
};

export const updateProduct = async (product,slug, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/product/${slug}`,
    product,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getProductsByCondition = async (sort, order, page) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/products`,
    {
      sort,
      order,
      page,
    },
  );
};

export const getProductsCount = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/products/total`);
};

export const setProductRating = async (productId, star, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/product/rating/${productId}`,
    {star},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getRelatedProduct = async (productId) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/product/related/${productId}`,
  );
};

export const fetchProductsByFilter = async (arg) => {
  return await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
};