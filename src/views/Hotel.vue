<template >
  <div>
    <div class="gayTable">
      <div class="gayRow">
        <img class="gayPhoto" src="https://my-hit.net/upload/star/ivib/vi/bh/tvlhf/tvlhf_210x300.jpg" alt="" />
        <img class="gayPhoto" src="https://my-hit.net/upload/star/ivib/vt/bl/itbkll/itbkll_210x300.jpg" alt="" />
        <img class="gayPhoto" src="https://my-hit.net/upload/star/ivib/vi/bh/rvhhl/rvhhl_210x300.jpg" alt="" />
      </div>
      <div class="gayRow">
        <img class="gayPhoto" src="https://my-hit.net/upload/star/ivib/vg/bt/ihlhlr/ihlhlr_210x300.jpg" alt="" />
        <img class="gayPhoto" src="https://my-hit.net/upload/star/ivib/vi/bh/rvhlv/rvhlv_210x300.jpg" alt="" />
        <img class="gayPhoto" src="https://my-hit.net/upload/star/ivib/vt/br/bklgft/bklgft_210x300.jpg" alt="" />
      </div>
      <div class="gayRow">
        <img class="gayPhoto" src="https://my-hit.net/upload/star/ivib/vt/br/bbgfb/bbgfb_210x300.jpg" alt="" />
        <img class="gayPhoto" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/af523f82-82b2-4fda-bf9c-4109303c09ad/360" alt="" />
        <img class="gayPhoto" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1898899/54bdb105-fd99-4854-b9c4-34606f9976ab/280x420" alt="" />
      </div>
      <div class="gayRow">
        <img class="gayPhoto" src="https://my-hit.net/upload/star/ivib/vt/bl/bttklv/bttklv_210x300.jpg" alt="" />
        <img class="gayPhoto" src="https://my-hit.net/upload/star/ivib/vt/il/itbkgg/itbkgg_210x300.jpg" alt="" />
        <img class="gayPhoto" src="https://st.kp.yandex.net/images/kadr/sm_2338448.jpg" alt="" />
      </div>
      <div class="gayRow">
        <img class="gayPhoto" src="https://my-hit.net/upload/star/ivib/vt/br/bvhbhr/bvhbhr_210x300.jpg" alt="" />
        <img class="gayPhoto" src="https://my-hit.net/upload/star/ivib/vi/bh/bvvkf/bvvkf_210x300.jpg" alt="" />
        <img class="gayPhoto" src="https://my-hit.net/upload/star/ivib/vt/br/lblv/lblv_210x300.jpg" alt="" />
      </div>
      <div class="gayRow">
        <img class="gayPhoto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc33CaxrCz9itT7mlp-gkvH4QLtKmROy-ZNA&usqp=CAU" alt="" />
        <img class="gayPhoto" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1600647/b2ad5dc3-45b1-4c86-8adf-54a5357367d6/360" alt="" />
        <img class="gayPhoto" src="https://avatars.mds.yandex.net/get-kinopoisk-image/1777765/7824b523-a6c3-4c17-88a9-9b2f84aa8ded/360" alt="" />
      </div>
    </div>
    <div >
      <button class="createAccountBtn btn btn-primary" @click="toggleGayForm()">
        Создать аккаунт
      </button>
      <div v-if="togglerGayForm" class="gayForm">
        <form method="POST" enctype="multipart/form-data" @submit.prevent="submitGayForm($event)" :action="`http://localhost:4000/mans/create/?gayname=${gayName}&gaypassword=${gayPassword}&gayage=${gayAge}`">
          <label class="gayLabel" for="gayname">
            Твоё имя
          </label>
          <input v-model="gayName" id="gayname" placeholder="Как к тебе будут обращаться" type="text" class="gayInputField form-control w-50">
          <label class="gayLabel" for="gaypassword">
            Твой секрет
          </label>
          <input v-model="gayPassword" id="gaypassword" placeholder="Никому не раскрывай свой секрет" type="password" class="gayInputField form-control w-50">
          <label class="gayLabel" for="gayage">
            Твой возраст
          </label>
          <input v-model="gayAge" id="gayage" placeholder="Насколько ты молодой мальчик" type="number" class="gayInputField form-control w-50">
          <label class="gayLabel" for="gaygender">
            Твой пол
          </label>
          <div class="selectGenderContainer">
            <label class="gayLabel" for="gaygender">
              парень
            </label>
            <input id="gaygender" type="radio" name="gaygender" class="gayInputField">
            <label class="gayLabel" for="gaygender">
              парень
            </label>
            <input id="gaygender" type="radio" name="gaygender" class="gayInputField">
          </div>
          <label class="gayLabel" for="gayphoto">
            Твои фотки
          </label>
          <input id="gayphoto" placeholder="Никому не раскрывай свой секрет" name="myphoto" type="file" class="gayInputField form-control w-50">
          <div class="registerGayBtnContainer">
            <button class="registerGayBtn btn btn-primary" @click="createGay()">
              Создать аккаунт
            </button>
            <button v-if="errors.length >= 1" class="btn btn-danger">
              {{ errors }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import * as jwt from 'jsonwebtoken'

export default {
  name: 'Home',
  data(){
    return {
      token: window.localStorage.getItem('bluepassiontoken'),
      togglerGayForm: false,
      gayName: '',
      gayPassword: '',
      gayAge: 0,
      errors: ''
    }
  },
  mounted(){
    if(this.$route.query.redirectroute !== null && this.$route.query.redirectroute !== undefined){
      // логика перенаправления
      if(this.$route.query.redirectroute.length <= 1){
        this.$router.push({ path: this.$route.query.redirectroute })
      } else if(!this.$route.query.redirectroute.length >= 2){
        this.$router.push({ name: "HotelRoom" })
      }
    } else {
      jwt.verify(this.token, 'bluepassionsecret', (err, decoded) => {
        if (err) {
          this.$router.push({ name: "Hotel" })
        } else {
          this.$router.push({ name: "HotelRoom" })
        }
      })
    }
  },
  methods: {
    submitGayForm(event){
      this.token = jwt.sign({
        man: this.gayName
      }, 'bluepassionsecret', { expiresIn: '5m' })
      localStorage.setItem('bluepassiontoken', this.token)
      setTimeout(() => {
        event.target.submit()
      }, 1500)
    },
    createGay(){
      fetch(`http://localhost:4000/mans/create/?gayname=${this.gayName}&gaypassword=${this.gayPassword}&gayage=${this.gayAge}`, {
        mode: 'cors',
        method: 'GET'
      }).then(response => response.body).then(rb  => {
        const reader = rb.getReader()
        return new ReadableStream({
          start(controller) {
            function push() {
              reader.read().then( ({done, value}) => {
                if (done) {
                  console.log('done', done);
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                console.log(done, value);
                push();
              })
            }
            push();
          }
        });
    }).then(stream => {
      return new Response(stream, { headers: { "Content-Type": "text/html" } }).text();
    })
    .then(result => {
      console.log(JSON.parse(result))
      if(JSON.parse(result).status.includes('OK')){
        this.token = jwt.sign({
          man: this.gayname
        }, 'bluepassionsecret', { expiresIn: '5m' })
        localStorage.setItem('bluepassiontoken', this.token)
        this.$router.push({ name: 'HotelRoom' })  
      } else if(JSON.parse(result).status.includes('Error')){
        this.errors = "Такой мальчик уже существует"
      }
    });

    },
    toggleGayForm(){
      this.togglerGayForm = !this.togglerGayForm
    }
  }
}
</script>
<style>
  .gayRow {
    -webkit-filter: grayscale(1);
    display: flex;
    justify-content: space-around;
  }
  .gayTable {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 2000px;
  }

  .gayPhoto {
    width: 175px;
    border-radius: 15px;
  }

  .createAccountBtn {
    position: fixed;
    top: 50%;
    left: calc(50% - 250px / 2);
    height: 75px; 
    width: 250px;
    border: 1px solid rgb(0, 0, 150);
    border-radius: 35px;
  }

  .createAccountBtn:hover {
    position: fixed;
    top: 50%;
    left: calc(50% - 250px / 2);
    height: 75px; 
    width: 250px;
    border: 1px solid rgb(0, 0, 100);
    border-radius: 35px;
  }

  .gayForm {
    position: fixed;
    top: calc(50% - 95% / 2);
    left: calc(50% - 65% / 2);
    width: 65%;
    height: 95%;
    background-color: rgb(0, 0, 185);
    border-radius: 35px; 
    border: 1px solid rgb(0, 0, 225,);
  }

  .gayLabel {
    font-size: 24px;
    width: 100%;
    text-align: center;
    color: rgb(255, 255, 255);
  }

  .gayInputField {
    margin: 15px auto;
  }

  .registerGayBtnContainer {
    display: flex;
    justify-content: space-around;
  }

  .selectGenderContainer {
    display: flex;
    width: 50%;
    justify-content: center;
    margin: auto;
  }

  .registerGayBtn {
    height: 50px; 
    width: 200px;
    border: 1px solid rgb(0, 0, 100);
    border-radius: 35px;
  }

</style>