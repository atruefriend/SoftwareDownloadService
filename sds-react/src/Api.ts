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

export const methods = {
  PostData
};

export default methods;
