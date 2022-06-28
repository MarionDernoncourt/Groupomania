<template>
    <div>
        <PublicHeader />
        <div class="connection">
            <h1>Bienvenue sur votre réseau social d'entreprise</h1>
            <form id="login" @submit.prevent="login">
                <div class="formUser">
                    <h2>Se connecter</h2>
                    <div class="formGroup_login">
                        <label for="user_email">Email</label>
                        <input type="text" id="user_email" v-model="user.email" />
                    </div>
                    <div class="formGroup_login">
                        <label for="user_password">Mot de passe</label>
                        <input type="password" id="user_password" v-model="user.password" />
                    </div>
                    <div class="formGroup_login">
                        <button type="submit" class="button">Se connecter</button>
                    </div>
                </div>
            </form>
            <div class="createAccount">
                <p>Je n'ai pas d'identifiant</p>
                <button class="button" type="submit" @click="goCreateAccount">Créer son compte</button>
            </div>
        </div>
    </div>
</template>


<script>
import PublicHeader from '@/components/publicHeader.vue';
import { accountService } from "/_services"
export default {
    name: "login",
    components: { PublicHeader },
    data() {
        return {
            user: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            accountService.login(this.user)
                .then(res => {
                    accountService.saveToken(res.data.token)
                    accountService.saveRefreshToken(res.data.refreshToken)
                    accountService.saveId(res.data.userId)
                    this.$router.push("/home")
                })
                .catch(err => console.log(err))
        },
        goCreateAccount() {
            this.$router.push("/signup")
        }
    },
}
</script>

<style>
.connection {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f7fbff;
    padding: 10px;
}

#login {
    width: 30%;
    border-radius: 25px;
}

.createAccount {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    border: 1px solid #003368;
    background-color: white;
    padding: 10px;
    margin: 10px;
    border-radius: 25px;
    width: 30%;
}

.createAccount p,
.createAccount button {
    margin: 0px;
    color: #003368;
    font-family: "Nunito";
}

form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.formUser {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    border-radius: 25px;
    padding: 10px;
    width: 100%;
    background-color: white;

}

.formUser h2 {
    font-family: "Nunito";
    font-size: 1.5em;
    font-weight: 300;
    margin: 0px;
    color: #003368;
}

.formUser label,
.formUser input {
    font-family: "Nunito";
    font-weight: 300;
    color: #003368;
}

.formGroup_login {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
}

.formGroup_login label {
    width: 30%;
}

.formGroup_login input {
    width: 70%;
}

@media screen and (max-width: 980px) {
    #login {
        width: 60%;
        padding: 0px 10px;
    }

    .formUser {
        width: 100%;

    }

    .createAccount {
        width: 60%;
    }
}
</style>