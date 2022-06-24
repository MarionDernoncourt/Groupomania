<template>
    <div>
        <publicHeader />
        <div class="container_signup">
            <form class="form_signup" @submit.prevent="createUser">
                <h2>Veuillez compléter le formulaire</h2>

                <div class="signup_formGroup">
                    <label for="user_nom">Nom</label>
                    <input type="text" id="user_nom" v-model="user.nom" />
                </div>
                <div class="signup_formGroup">
                    <label for="user_prenom">Prénom</label>
                    <input type="text" id="user_prenom" v-model="user.prenom" />
                </div>

                <div class="signup_formGroup">
                    <label for="user_pseudo">Pseudo</label>
                    <input type="text" id="user_pseudo" v-model="user.pseudo" />
                </div>
                <div class="signup_formGroup">
                    <label for="user_email">Email</label>
                    <input type="text" id="user_email" v-model="user.email" />
                </div>
                <div class="signup_formGroup">
                    <label for="user_password">Mot de passe</label>
                    <input type="password" id="user_password" v-model="user.password" />
                </div>
                <div class="signup_formGroup">
                    <label for="user_confirm">Confirmer le mot de passe</label>
                    <input type="password" id="user_confirm" v-model="confirme" />
                </div>
                <div>
                    <button type="submit" class="button">Créer votre compte</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import publicHeader from '@/components/publicHeader.vue'
import { userService } from '../../../_services'
export default {
    name: "addUser",
    components: { publicHeader },
    data() {
        return {
            user: {
                nom: "",
                prenom: "",
                pseudo: "",
                email: "",
                password: "",
            },
            confirme: "",
        }
    },
    methods: {
        createUser() {
            userService.addUser(this.user)
                .then(res =>
                    this.$router.push("/")
                )
                .catch(err => console.log(err))
        }
    }
}
</script>

<style>
.container_signup {
    background-color: #f7fbff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
}

.form_signup {
    width: 60%;
    border-radius: 25px;
    background-color: white;
}

.form_signup label,
.form_signup input,
.form_signup h2 {
    font-family: "Nunito";
    color: #003368;
}

@media screen and (max-width: 720px) {
    .signup_formGroup {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
}
</style>