import Axios from "./caller.service";

let getComment = (articleId) => {
   return Axios.get("/auth/article/"+articleId+"/comment")
}

let addComment = (articleId, comment) => {
  return  Axios.put("/auth/article/"+articleId+"/comment", comment)
}


export const commentService = {
getComment,
addComment
} 