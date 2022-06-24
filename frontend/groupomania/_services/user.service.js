/**** Import module nécessaire */
import Axios from "./caller.service";

let getAllUser = () => {
  return Axios.get("auth/users");
};

let getUser = (id) => {
  return Axios.get("auth/user/" + id);
};

let addUser = (user) => {
  return Axios.put("auth/signup", user);
};

let editUser = (user) => {
 return Axios.patch("auth/user/"+ user.id, user);
};

let deleteUser = (id) => {
  return Axios.delete("/auth/user/"+id)
}
export const userService = {
  getAllUser,
  getUser,
  addUser,
  editUser,
  deleteUser
};
