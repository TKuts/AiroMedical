const sendRequest = async (url) => {
  const respons = await fetch(url, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const result = await respons.json();

  return result;
};

export default sendRequest;
