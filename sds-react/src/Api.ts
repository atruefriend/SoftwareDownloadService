const server = "http://localhost:8080/";

async function PostData(method: String, data: any) {
  const endpoint = server + method;
  const apiResponse = await fetch(endpoint, {
    method: "Post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: data
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      return error;
    });
  return apiResponse;
}

async function GetData(
  method: string,
  data: { name: string; value: string }[]
) {
  let params = "";
  if (data != null) {
    data.map(param => {
      if (param["value"] !== "") {
        params += param["name"] + "=" + param["value"] + "&";
      }
    });
  }
  params = params.substring(0, params.length - 1);
  const endpoint = server + method + (data != null ? "?" + params : "");
  const apiResponse = await fetch(endpoint, {
    method: "Get"
  })
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      return error;
    });
  return apiResponse;
}

export const methods = {
  PostData,
  GetData
};

export default methods;
