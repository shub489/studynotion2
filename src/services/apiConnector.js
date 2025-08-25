import axios from "axios";

const axiosInstance = axios.create({});

export const apiConnector = (
  method,
  url,
  bodyData = {},
  headers = {},
  params = {},
  extraConfig = {}
) => {
  return axiosInstance({
    method: method,
    url: url,
    data: bodyData,
    headers: headers,
    params: params,
    ...extraConfig,
  });
};

/* Love */
// const apiConnector = (method, url, bodyData, headers, params) => {
//   return axiosInstance({
//     method: method,
//     url: url,
//     data: bodyData ? bodyData : null,
//     headers: headers ? headers : null,
//     params: params ? params : null,
//   });
// };
