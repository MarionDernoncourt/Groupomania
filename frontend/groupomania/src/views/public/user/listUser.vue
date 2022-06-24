<template>
    <div class="list_container" v-for="(user, index) in users" :key="user.id">
        <div class="main_container">
            <div class="container">
                <div class="info">
                    <p>Mon nom : <br>{{ user.nom }}</p>
                    <p>Mon prénom : <br>{{ user.prenom }}</p>
                    <p>Mon pseudo: <br>{{ user.pseudo }}</p>
                    <p>Mon email :<br>{{ user.email }}</p>
                    <p>Mon mot de passe : <br>***** </p>
                </div>
                <div class="edit">
                    <button type="button" class="button" @click="goEditUser(user.id)">Modifier</button>
                    <button type="button" class="button" @click="goDelUser(index)">Supprimer</button>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { userService } from "/_services"
export default {
    name: "listUser",
    data() {
        return {
            users: [],
            user: {
            }
        }
    },
    mounted() {
        userService.getAllUser() // récupération de tous les users
            .then(res =>
                this.users = res.data.data)
            .catch(err => console.log(err))
    },
    methods: {
        goEditUser(id) {
            console.log(id)
            this.$router.push('/user/edit/' + id)
        },
        goDelUser(index) { // suppression user 
            userService.deleteUser(this.users[index].id)
                .then(res => {
                    console.log(res)
                    this.users.splice(index, 1) // élément supprimer du tableau via son index
                    this.$router.push({ name: "userList" })
                })

                .catch(err => console.log(err))
        },
    }
}
</script>

<style>
.list_container {
    width: 100%;
    display: flex;
    justify-content: center;
}

.list_container .main_container {
    width: 90%;
}

.list_container .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.info {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 80%;
    justify-content: space-between;
}

.edit {
    width: 20%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
</style>