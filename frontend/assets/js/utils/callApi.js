const callAPIFunction = async (API) => {
  const response = await fetch(API);
  const data = await response.json();
  return await data;
};
const callApiMethodGet = async (API, token) => {
  const response = await fetch(API, {
    method: "GET", // chỉ cần method là "GET"
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`, // Thêm token vào header nếu cần
    },
  });
  const data = await response.json();
  return data; // Không cần await ở đây
};

const fetchMethodPost = async (API, info) => {
  const response = await fetch(API, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });
  const data = await response.json();
  return await data;
};
const fetchMethodPostAddCart = async (API, cart) => {
  const response = await fetch(API, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });
  const data = await response.json();
  return await data;
};

const fetchGetAllCard = async (API, token) => {
  const response = await fetch(API, {
    method: "GET", // chỉ cần method là "GET"
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`, // Thêm token vào header nếu cần
    },
  });
  const data = await response.json();
  return data; // Không cần await ở đây
};

const changeQuantityProductInCard = async (API, token, requestData) => {
  const response = await fetch(API, {
    method: "PATCH", // chỉ cần method là "GET"
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`, // Thêm token vào header nếu cần
    },
    body: JSON.stringify(requestData),
  });
  const responseData = await response.json();
  return await responseData;
};

const callAPIMethodPost = async (API, token, requestData) => {
  const response = await fetch(API, {
    method: "POST", // chỉ cần method là "GET"
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`, // Thêm token vào header nếu cần
    },
    body: JSON.stringify(requestData),
  });
  const responseData = await response.json();
  return await responseData;
};

const callAPIMethodDelete = async (API, token, requestData) => {
  const response = await fetch(API, {
    method: "Delete", // chỉ cần method là "GET"
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`, // Thêm token vào header nếu cần
    },
    body: JSON.stringify(requestData),
  });
  const responseData = await response.json();
  return await responseData;
};

const callAPIPost = async (API, token, requestData) => {
  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token, // Không cần template literals ở đây
    },
    body: JSON.stringify(requestData),
  });
  const responseData = await response.json();
  return responseData; // Không cần await ở đây
};

const callAPIPostCreateProduct = async (API, token, requestData) => {
  try {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: requestData,
    });
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(`Error calling API: ${error.message}`);
  }
};

export {
  callAPIFunction,
  callApiMethodGet,
  fetchMethodPost,
  fetchMethodPostAddCart,
  fetchGetAllCard,
  changeQuantityProductInCard,
  callAPIMethodPost,
  callAPIMethodDelete,
  callAPIPost,
  callAPIPostCreateProduct,
};
