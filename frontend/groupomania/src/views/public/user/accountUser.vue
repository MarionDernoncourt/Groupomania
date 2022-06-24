<template>
    <div class="main_container">
        <h2>Informations personnelles</h2>
        <div class="container">
            <div class="info_user">
                <p>Mon nom : {{ user.nom }}</p>
                <p>Mon prénom : {{ user.prenom }}</p>
                <p>Mon pseudo: {{ user.pseudo }}</p>
                <p>Mon email : {{ user.email }}</p>
                <p>Mon mot de passe : ***** </p>
            </div>
            <div class="edit_user"> <button type="button" class="button" @click="goEditUser">Je souhaite modifier mes
                    informations</button>
                <button type="submit" class="button" @click="goDelUser">Supprimer mon compte</button>
            </div>
        </div>
    </div>
</template>

<script>
import { accountService, userService } from '../../../../_services'
export default {
    name: "userAccount",
    data() {
        return {
            user: {}
        }
    },
    mounted() {
        let id = localStorage.getItem("userId"); // Récupération données user
        userService.getUser(id)
            .then(res => {
                this.user = res.data.data
            })
            .catch(err => console.log(err))
    },
    methods: {
        goEditUser() {
            let id = localStorage.getItem("userId");
            this.$router.push('/user/edit/' + id)
        },
        goDelUser() {
            userService.deleteUser(this.user.id)
                .then(res => {
                    accountService.logout()
                    this.$router.push("/")
                })
                .catch(err => console.log(err))

        }
    }
}
</script>

<style>
.edit_user {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
}
</style>