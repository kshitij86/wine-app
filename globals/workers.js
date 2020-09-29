import { APPNAME } from "./styles";

const genID = () => {
  let date = new Date();
  return date.getDate() + "_" + APPNAME;
};

module.exports = { genID };
