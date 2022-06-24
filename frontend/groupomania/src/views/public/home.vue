<template>
    <h1 id="top"> Bonjour {{ user.pseudo }}, voici les dernières actualités</h1>
    <div class="articleContainer">
        <articleContainer :articles="articles" />

    </div>
    <a href="#top" alt="scrolltotop">
        <div class="scrollToTop">
            <img id="goUp" src="@/assets/icon.png" alt="icon" />
        </div>


    </a>

</template>

<script>
import { articleService } from '/_services';
import { userService } from "/_services"
import articleContainer from "@/components/articleContainer";
import buttonComments from "@/components/buttonComment"
export default {
    name: "home",
    components: { buttonComments, articleContainer },
    data() {
        return {
            articles: [],
            user: {}
        }
    },

    mounted() {
        articleService.getAllArticle()
            .then(res =>
                this.articles = res.data.data.reverse()
            )
            .catch(err => console.log(err));

        let id = localStorage.getItem("userId");
        userService.getUser(id)
            .then(res => this.user = res.data.data)
            .catch(err => console.log(err))

    },
}
</script>

<style>
.articleContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.scrollToTop {
    width: 50px;
    height: 50px;
    position: fixed;
    right: 25px;
    bottom: 25px;
}

#goUp {
    border: 1px solid #003368;
    border-radius: 50px;
}

@media screen and (min-width: 720px) (max-width: 980px) {
    .scrollToTop {
        width: 30px;
        height: 30px;
        position: fixed;
        right: 30px;
        bottom: 30px;
    }
}

@media screen and (max-width: 720px) {
    .scrollToTop {
        display: none;
    }
}
</style>