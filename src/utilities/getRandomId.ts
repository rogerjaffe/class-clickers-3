const getRandomId = (length: number) => {
  let charset = "0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += charset.charAt(Math.trunc(Math.random() * charset.length));
  }
  return code;
};

export default getRandomId;
