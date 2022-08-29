const saveFile = async (formData) => {
  let response = await fetch("/send", {
    method: "POST",
    body: formData,
  });
  response = await response.json();
  return response;
};

const getData = async () => {
  let response = await fetch("/view");
  response = await response.json();
  return response;
};

export { saveFile, getData };
