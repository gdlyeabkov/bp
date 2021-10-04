<template>
  <div>
    <img class="gayPhoto" :src="`http://localhost:4000/mans/photos/?gayname=${ 'Герман' }`" alt="" />
  </div>
</template>

<script>
import * as jwt from 'jsonwebtoken'

export default {
  name: 'HotelRoom',
  data(){
    return {
      gayName: ''
    }
  },
  mounted(){
    jwt.verify(this.token, 'bluepassionsecret', (err, decoded) => {
      if (err) {
        this.$router.push({ name: "Hotel" })
      } else {
        this.gayName = decoded.man
      }
    })
  }
}
</script>

<style>
  .gayPhoto {
    width: 175px;
    border-radius: 15px;
    -webkit-filter: grayscale(1);
  }
</style>