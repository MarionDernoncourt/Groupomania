<template>
    <div class="public">
        <PublicHeader />
        <div class="public_contain">
            <div class="public_side">
                <publicNav />
            </div>
            <div class="public_display">
                <router-view />
            </div>
        </div>
    </div>


</template>

<script>
import publicNav from "@/components/publicNav.vue"
import PublicHeader from "../../components/publicHeader.vue"

export default {
    name: "publicLayout",
    components: { publicNav, PublicHeader }

}
</script>

<style>

.public_contain {
    width: 100%;
    display: flex;
    background: #f7fbff
}

.public_side {
    width: 20%;
}

.public_display {
    width: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

@media screen and (max-width: 980px) {
    .public_contain {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .public_side {
        width: 100%;
    }
}
</style>


   
