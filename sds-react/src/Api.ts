const server = "http://localhost:8080/";

function PostData(method: String, data: FormData) {
  const endpoint = server + method;
  fetch(endpoint, {
    method: "Post",
    body: data
  }).then(res => {
    return res.json();
  });
}

export const methods = {
  PostData
};

export default methods;
