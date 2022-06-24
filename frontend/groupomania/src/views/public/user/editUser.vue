<template>
    <div>
        <form @submit.prevent="editUser">
            <input type="text" id="user_id" v-model="user.id" hidden />
            <div classe="edit_user_form">
                <label for="user_nom">Nom</label>
                <input type="text" id="user_nom" v-model="user.nom" />
            </div>
            <div classe="edit_user_form">
                <label for="user_prenom">Prénom</label>
                <input type="text" id="user_prenom" v-model="user.prenom" />
            </div>

            <div classe="edit_user_form">
                <label for="user_pseudo">Pseudo</label>
                <input type="text" id="user_pseudo" v-model="user.pseudo" />
            </div>
            <div classe="edit_user_form">
                <label for="user_email">Email</label>
                <input type="text" id="user_email" v-model="user.email" />
            </div>

            <div>
                <button type="submit" class="button">Enregistrer les modifications</button>

            </div>

        </form>
    </div>
</template>

<script>
import { userService } from '../../../../_services'

export default {
    name: "editUser",
    props: ["id"],
    data() {
        return {
            user: {}
        }
    }, methods: {
        editUser() {
            userService.editUser(this.user)
                .then(res => {
                    let userConnected = localStorage.getItem("userId");
                    if (userConnected === "7") {
                        this.$router.push("/user/userList")
                    } else {
                        this.$router.push("/user/accountUser")
                    }
                }
                )
                .catch(err => console.log(err))
            console.log(this.user)

        },

    },

    mounted() {
        userService.getUser(this.id)
            .then(res => { this.user = res.data.data })
            .catch(err => console.log(err))

    }
}
</script>

<style>
</style>