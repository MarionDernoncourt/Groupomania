import Axios from "./caller.service";



let getAllArticle = (article) => {
  return Axios.get("/auth/article", article);
};

let getArticle = (id) => {
  return Axios.get("auth/article/" + id);
};

let createArticle = (article) => {
  const formData = new FormData();
  formData.append("article", JSON.stringify(article));
  formData.append("image", article.image);
  return Axios.put("/auth/article", formData);
};

let updateArticleImg = (article) => {
  const formData = new FormData();
  formData.append("article", JSON.stringify(article));
  formData.append("image", article.image);
  return Axios.patch("auth/article/" + article.id, formData);
};

let deleteArticle = (id) => {
  return Axios.delete("auth/article/" + id);
};

export const articleService = {
  createArticle,
  getAllArticle,
  getArticle,
  updateArticleImg,
  deleteArticle,
};
