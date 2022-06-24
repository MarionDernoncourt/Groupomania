<template>
  <div class="publicNav">
    <nav>
      <ul>
        <router-link to="/home">Accueil</router-link>
        <router-link to="/article/myArticles">Mes articles</router-link>
        <router-link to="/article/createArticle">Ajouter un article</router-link>
        <router-link to="/user/accountUser">Mon compte</router-link>
        <router-link v-if="sameUserId(7)" to="/user/userList">Liste des utilisateurs</router-link>
        <router-link @click="goLogout" to="/">Déconnexion</router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
import { accountService } from '/_services'

export default {
  name: 'publicNav',
  data() {
    return {
      sameUserId: function (userAdmin) { // affichage si userAdmin === id // userAdmin ==> 7
        const id = parseInt(localStorage.getItem("userId"));
        console.log(id)
        return userAdmin === id;
      }
    }
  },
  methods: {
    goLogout() { 
      accountService.logout()
    }
  },

}
</script>

<style >
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,500;1,300;1,400;1,500&display=swap');

.publicNav {
  border: 1px solid black;
  margin: 10px;
  border-radius: 25px;
  background: white;
}

h1 {
  font-family: "Nunito";
  font-weight: 300;
  text-align: center;
  color: #003668
}

li {
  list-style: none;
  text-align: center;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 10px;
}

a:hover {
  color: red
}

a {
  color: #003668;
  font-family: "Nunito";
  font-weight: 300;
  text-decoration: none;
  padding: 10px;
  text-align: center;
}

ul {

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 0px;
}

@media screen and (max-width: 980px) {
  .publicNav {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    box-sizing: border-box;
    margin: 0px;
    margin-top: 10px;
  }

  nav {
    width: 100%;
  }

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 0px;
  }

}
</style>
