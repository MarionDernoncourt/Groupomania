<template>
    <div v-for="(article, index) in articles" :key="article.id" class="main_container">
        <div class="article_content">
            <div class="content">
                <div class="text_content">
                    <h2 class="title">{{ article.title }}</h2>
                    <div class="text">
                        <p>{{ article.content }}</p>
                    </div>
                </div>

            </div>


            <div class="image">
                <img v-bind:src="article.image" />
            </div>
            <h3> {{ article.User.pseudo }} le {{ dateFormat[index] }} à {{ timeFormat[index] }}</h3>
        </div>

        <div class="buttons">
            <div id="comment_button">
                <buttonComment :articleId="article.id" />
            </div>
            <div v-if="sameUserId(article.user_id) || sameUserId(7)" class="edit_button">
                <div>
                    <button type="button" id="update_button" class="button"
                        @click="goUpdate(article.id)">Modifier</button>
                </div>
                <div>
                    <button type="button" id="delete_button" class="button"
                        @click="delArticle(index)">Supprimer</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import buttonComment from "./buttonComment"
import { articleService } from "../../_services";
export default {
    name: "articleContainer",
    props: ["articles"],
    components: { buttonComment },
    data() {
        return {
            sameUserId: function (userIdAuthor) { // renvoie id du user pour verifier si posibilité de modifier
                const id = parseInt(localStorage.getItem("userId"));
                return userIdAuthor === id;
            }
        }
    },
    methods: {


        goUpdate(articleId) { // renvoie vers la page de modification
            this.$router.push({ name: "editArticle", params: { id: articleId } })
        },
        delArticle(index) { // supprime l'article
            articleService.deleteArticle(this.articles[index].id)
                .then(res => {
                    this.articles.splice(index, 1)
                    this.$router.push({ name: "myArticles" })
                })

                .catch(err => console.log(err))
        },

    },
    computed: {
        dateFormat() {
            return this.articles.map(a => a.createdAt.split("T")[0].split("-").reverse().join("/"))
            // Renvoie un tableau composé des dates de création

        },
        timeFormat() {
            return this.articles.map(a => a.createdAt.split("T")[1].slice(0, 8))
            // Renvoie un tableau composé des heures de création 

        }
    }
}
</script>



<style>
.main_container {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border: 1px solid #003368;
    border-radius: 25px;
    margin: 10px;
    width: 60%;
    padding: 10px;
    color: #003368;
    background: white;
    font-family: "Nunito";
}

.article_content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

}

.content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.image {
    width: 100%;
    max-height: 200px;
}

img {
    object-fit: contain;
    height: 100%;
    width: 100%;
}

.buttons {
    display: flex;
    flex-direction: row;
}

.edit_button {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 40%;
}

#comment_button {
    width: 60%;
}

.button {
    background-color: #ffdbdb;
    padding: 10px 20px;
    border: none;
    border-radius: 25px;
    color: #003368;
    margin-top: 10px;
    font-family: "Nunito"
}

.button:hover {
    filter: brightness(1.1);
    transition: filter 300ms;
}

#update_button {
    margin-right: 10px;
}

h3 {
    font-weight: 300;
    font-size: 1em;
    margin: 0px;
    margin: 10px 0px;

}

p {
    font-size: 1em;
}

@media screen and (min-width: 720px) and (max-width: 980px) {
    .buttons {
        display: flex;
        flex-direction: column;
    }

    .edit_button {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
    }

    .image {
        height: 150px;
    }

    img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }

}

@media screen and (max-width: 720px) {
    .main_container {
        width: 90%;
    }

    .image {
        height: 150px;
    }

    img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }

    .buttons {
        display: flex;
        flex-direction: column;
    }

    .edit_button {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
    }
}
</style>