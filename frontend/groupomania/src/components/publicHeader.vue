<template>
  <div class="header">
    <img src="@/assets/icon-left-font-monochrome-white.png" alt="logo" id="logo" />
  </div>
</template>

<script>

export default {
  name: 'publicHeader',

}
</script>

<style>
#logo {
  width: 20%;
  height: 100px;
  object-fit: cover;
  margin-left: 10px;
}

.header {
  background: #003368;
}

@media screen and (max-width: 980px) {
  #logo {
    width: 40%;
  }
}
</style>
