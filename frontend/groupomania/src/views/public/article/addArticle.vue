<template>
    <div>
        <form @submit.prevent="createArticle">
            <input type="text" id="user_id" v-model="article.user_id" hidden />

            <div class="article_container">
                <label for="article_title">Titre</label>
                <input type="text" id="article_title" v-model="article.title" />
            </div>
            <div class="article_container">
                <label for="article_content">Votre contenu</label>
                <textarea type="textarea" id="article_content" wrap="soft" rows="10" cols="50"
                    v-model="article.content"></textarea>
            </div>
            <div class="article_container">
                <label for="article_image">Image</label>
                <input type="file" accept="image/jpg , image/jpeg, image/png" id="article_image" ref="file_upload"
                    @change="uploadFile" />
            </div>
            <button type=" submit" class="button">Publier votre article</button>
        </form>
    </div>
</template>

<script>
import { articleService } from "/_services"
export default {
    name: "createArticle",
    data() {
        return {
            article: {}

        }
    },
    methods: {
        uploadFile(event) {
            this.article.image = event.target.files[0] // récupére l'image

        },
        createArticle() {
            articleService.createArticle(this.article)
                .then(res => { this.$router.push("/article/myArticles") }
                )
                .catch(err => console.log(err))
        },
    }
}
</script>

<style>
input, textarea {
    border-radius: 25px;
    border: 1px solid #003368;
    background: white;
    padding: 10px;
    margin-top: 10px
}
label {
    margin: 10px
}
.article_container {
    display: flex;
    flex-direction: row;
    align-items: center;
}
@media screen and (max-width: 980px) {

.article_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
}

</style>