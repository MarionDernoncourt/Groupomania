<template>
    <div>
        <form @submit.prevent="updateArticle">
            <div>
                <label for="article_title">Titre</label>
                <input type="text" id="article_title" v-model="article.title" />
            </div>
            <div>
                <label for="article_content">Votre contenu</label>
                <textarea type="textarea" id="article_content" wrap="soft" rows="10" cols="50"
                    v-model="article.content"></textarea>
            </div>
            <div>
                <label for="article_image">Image</label>
                <input type="file" accept="image/jpg , image/jpeg, image/png" id="article_image" ref="file_upload"
                    @change="uploadFile" />
            </div>
            <button type=" submit" class="button">Modifier votre article</button>
        </form>
    </div>
</template>


<script>
import { articleService } from '/_services'
export default {
    name: "editArticle",
    props: ["id"],
    data() {
        return {
            article: {}
        }
    },
    mounted() {
        articleService.getArticle(this.id) // récupèration de l'article via l'id en props
            .then(res => {
                this.article = res.data.data
            })
            .catch(err => console.log(err))
    },
    methods: {
        uploadFile(event) {
            this.article.image = event.target.files[0] // récupération de l'image

        },
        updateArticle() {
            articleService.updateArticleImg(this.article)
                .then((res) => {
                    let userConnected = localStorage.getItem("userId");
                    if (userConnected === "7") {
                        this.$router.push("/home")
                    } else {
                        this.$router.push("/article/myArticles")
                    }
                })
                .catch(err => console.log(err))
        }
    }

}

</script>

<style>
</style>