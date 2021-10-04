<template>
  <div>
    
    <div class="gayHeader">
      <div class="gayHeaderRightBar">
      </div>
      <div class="gayHeaderRightBar">
        <button @click="logout()" class="btn btn-danger">
          Закончить любовные похождения
        </button>
      </div>
    </div>
    
    <div class="bench">
      <img class="gayPhoto" :src="`http://localhost:4000/mans/photos/?gayname=${ gayName }`" alt="" />
      <div class="benchActions">
        <span title="Начать встречаться" class="btn btn-primary material-icons">
          favorite
        </span>
        <span title="Отдать часть своего сердца" class="btn btn-danger material-icons">
          volunteer_activism
        </span>
        <span class="btn btn-warning material-icons"  title="Назначть свидание" >
          people
        </span>
        <span class="btn btn-light material-icons"  title="Подозревать в измене" >
          mood_bad
        </span>
        <span class="btn btn-secondary material-icons"  title="Обнять" >
          sports_kabaddi
        </span>
        <span class="btn btn-success material-icons"  title="Стать тайным поклоником" >
          favorite_border
        </span>
        <span class="btn btn-info material-icons"  title="Порвать с парнем" >
          thumb_down
        </span>
        <span class="btn btn-dark material-icons"  title="Отомстить другу твоего бывшего" >
          chair
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import * as jwt from 'jsonwebtoken'

export default {
  name: 'HotelRoom',
  data(){
    return {
      gayName: '',
      token: window.localStorage.getItem('bluepassiontoken'),
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
  },
  methods: {
    logout(){
      this.token = jwt.sign({
        man: "ungay"
      }, 'bluepassionsecret', { expiresIn: 1 })
      localStorage.removeItem('bluepassiontoken')
      setTimeout(() => {
        this.$router.push({ name: 'Hotel' })
      }, 1500)
    }
  }
}
</script>

<style scoped>
  
  .gayPhoto {
    width: 275px;
    border-radius: 15px;
    -webkit-filter: grayscale(1);
  }
  
  .bench {
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    margin: 25px;
  }

  .benchActions > * {
    margin: 25px;
  }

</style>