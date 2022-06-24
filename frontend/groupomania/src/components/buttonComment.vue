<template>
    <div>
        <div>
            <button @click="showComment = !showComment" v-on:click="getComment" type="button" class="button">
                Commentaires
            </button>
        </div>
        <div v-show="showComment" class="container_comments">
            <form @submit.prevent="addComment">
                <div class="add_comments">

                    <textarea cols="60" id="textarea" name="comments" onFocus="" placeholder="Ecrivez un commentaire..."
                        v-model="comment.content"></textarea>
                    <button type="submit" class="button" id="comment_button">Publier</button>
                </div>
            </form>
            <div v-for="(comment, index) in comments" :key="comment.id" class="list_comments">
                <div class="comment_info">
                    <h3>{{ comment.name }}</h3>
                    <p>Ajouté le {{ dateFormat[index] }} à {{ timeFormat[index] }}</p>
                </div>
                <div class="comment_content">
                    <p>{{ comment.content }}</p>
                </div>

            </div>

        </div>
    </div>

</template>


<script>
import { commentService } from "/_services"
export default {
    name: "comments",
    props: ["articleId"],

    data() {
        return {
            showComment: false,
            comment: {
                content: "",
                id_article: this.articleId,
            },
            comments: []

        }
    },

    methods: {
        getComment() {
            commentService.getComment(this.articleId)
                .then(res => this.comments = res.data.data.reverse())
                .catch(err => console.log(err))
        },
        addComment() {
            commentService.addComment(this.articleId, this.comment)
                .then(res => {

                    this.comments.unshift(res.data.comment);
                    this.comment.content = "";
                })
                .catch(err => console.log(err))
        }
    },
    computed: {
        dateFormat() {
            return this.comments.map(c => c.createdAt.split("T")[0].split("-").reverse().join("/"))
            // Renvoie un tableau composé des dates de création
        },
        timeFormat() {
            return this.comments.map(c => c.createdAt.split("T")[1].slice(0, 8))
            // Renvoie un tableau composé des heures de création 
        }
    }
}
</script>

<style>
.list_comments {
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    width: 100%;
    border-radius: 25px;
    padding: 10px;
    margin-bottom: 5px;
}

.text_comment {
    width: 90%;
}

.add_comments {
    width: 100%;
    display: flex;
    flex-direction: row;
    ;
    align-items: center;
    margin-bottom: 5px;
}

#textarea {
    width: 90%;
    border-radius: 25px;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #003368;
}

#comment_button {
    width: 10%;
    height: 100%;
}

.comment_info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    align-items: flex-start;
    margin: 5px 0px
}

.container_comments {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

form {
    width: 100%;
}

.comment_info p {
    margin: 0px;
    font-size: 0.8em;
}

.comment_info h3 {
    margin: 0px;
}

.comment_content p {
    margin: 0px;
    overflow-wrap: break-word;
}
@media screen and (max-width: 980px) {
    .comment_info {
        display : flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    .comment_info h3 {
        width: 100%;
        text-align: left;
    }
}
</style>