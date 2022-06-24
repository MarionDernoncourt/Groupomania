<template>
    <articleContainer :articles="articles" />


</template>

<script>
import articleContainer from "@/components/articleContainer";
import buttonComment from "@/components/buttonComment";
import { articleService } from '/_services';
export default {
    name: "index",
    components: { articleContainer, buttonComment },
    data() {
        return {
            articles: [],
        }
    },



    mounted() {
        articleService.getAllArticle()
            .then(res => {
                this.articles = res.data.data.reverse().filter(article => {
                    const id = parseInt(localStorage.getItem("userId"))
                    return article.user_id === id // Récupere les articles du user connecté
                })
            })
            .catch(err => console.log(err))

    }
}
</script>

<style>
</style>