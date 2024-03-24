import axios from "axios";

export const apiBaseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

export const getBrands = async () => {
  const data = await fetch(`${apiBaseUrl}/api/v1/products`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    })
    .then((data) => data.json())
    .catch((error) => console.log(error));
  return data;
};

export const getBrandedProducts = async (brand) => {
  const data = await fetch(`${apiBaseUrl}/api/v1/products/${brand}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    })
    .then((data) => data.json())
    .catch((error) => console.log(error));
  return data;
};

export const getAModelData = async (model) => {
  const data = await fetch(`${apiBaseUrl}/api/v1/products/brand/${model}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    })
    .then((data) => data.json())
    .catch((error) => console.log(error));
  return data;
};

export const getReview = async (model, token) => {
  const data = await fetch(`${apiBaseUrl}/api/v1/review/${model}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    })
    .then((data) => data.json())
    .catch((error) => console.log(error));
  return data;
};

export const getDiscounts = async () => {
  const data = await fetch(`${apiBaseUrl}/api/v1/discount`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    })
    .then((data) => data.json())
    .catch((error) => console.log(error));
  return data;
};

export const postOrderedDetails = async (detail, token) => {
  const data = await fetch(`${apiBaseUrl}/api/v1/orders/store`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(detail),
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    })
    .then((data) => data.json())
    .catch((error) => console.log(error));
  return data;
};

export const getOrderDetails = async (token) => {
  const data = await fetch(`${apiBaseUrl}/api/v1/orders/user`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw res;
      }
      return res;
    })
    .then((data) => data.json())
    .catch((error) => console.log(error));
  return data;
};

export const uploadImage = async (data, token) => {
  try {
    const resData = await axios.post(
      `${apiBaseUrl}/api/v1/profile-picture`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return resData;
  } catch (error) {
    return error;
  }
};
export const getImage = async (token) => {
  try {
    const res = await axios.get(
      `${apiBaseUrl}/api/v1/profile-picture-get`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return res.data; 
  } catch (error) {
    throw error; 
  }
};
//  /profile-picture-del/:image

export const deleteImage = async (token, image) => {
  try {
    const resData = await axios.delete(
      `${apiBaseUrl}/api/v1/profile-picture-del/${image}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
    return resData;
  } catch (error) {
    return error;
  }
};

export const searching = async (data) => {
  try {
    const dataRes = await axios.get(
      `${apiBaseUrl}/api/v1/get-all-products?brand=${data}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return dataRes;
  } catch (error) {
    return error;
  }
};

export const searchingModel = async (data) => {
  try {
    const dataRes = await axios.get(
      `${apiBaseUrl}/api/v1/get-all-products?model=${data}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return dataRes;
  } catch (error) {
    return error;
  }
};

export const getCsrfToken = async() =>{
  try {
    const dataRes = await axios.get(`${apiBaseUrl}/api/v1/csrf`);
    return dataRes
  } catch (error) {
    throw error
  }
}