<template>
    <div class="gayHeader">
        <div class="gayHeaderRightBar">
        <span class="gayLogo">
            О нас
        </span>
        </div>
        <div class="gayHeaderRightBar">
        <span class="gayLogo">
            bluePassion
        </span>
        <button @click="toggleGayLogin()" class="gayLoginBtn btn btn-light">Войти</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "HotelHeader"
}
</script>

<style scoped>
    
  .gayHeader {
    height: 50px; display: flex; justify-content: space-around; background-color: rgb(0, 0, 100); align-items: center;
  }

  .gayHeaderRightBar > * {
    margin: 25px;
  }

  .gayLoginBtn {
    font-weight: bolder;
    color: rgb(150, 0, 0);
    width: 175px;
  }

</style>