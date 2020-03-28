const server = "http://localhost:8080/";

function PostData(method: String, data: any) {
  const endpoint = server + method;
  fetch(endpoint, {
    method: "Post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: data
  }).then(res => {
    return res.json();
  });
}

function GetData(method: string, data: { name: string; value: string }[]) {
  let params = "";
  if (data != null) {
    data.map(param => {
      params += param["name"] + ":" + param["value"] + "/";
    });
  }
  const endpoint = server + method + (data != null ? "?" + params : "");
  fetch(endpoint, {
    method: "Get"
  }).then(res => {
    return res.json();
  });
}

export const methods = {
  PostData,
  GetData
};

export default methods;
