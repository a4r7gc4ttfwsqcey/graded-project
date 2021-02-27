import axios from "axios";
import store from "./reducers/main";
const authenticate = (user) => {
  store.dispatch({
    type: "auth",
    data: user,
  });
  axios.defaults.headers["Authorization"] = `Bearer ${user.auth}`;
};

export { authenticate };
