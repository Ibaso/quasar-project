<template>
  <div>
    <q-card class="absolute-center" style="width: 300px">
      <q-card-section>

        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            outlined
            v-model="login"
            label="Foydalanuvchi"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            outlined
            type="password"
            v-model="password"
            label="Parol"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />


          <div align="center">
            <q-btn label="Kirish" type="submit" color="primary"/>
          </div>
        </q-form>

      </q-card-section>
    </q-card>
  </div>
</template>

<script>
  import {apiUrls} from "src/utils/const/apiUrls";
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    name: "LoginPageComponent",
    data() {
      return {
        login: "",
        password: ""
      }
    },
    methods: {
      ...mapGetters(['getUser']),
      ...mapMutations(['setUser']),
      onSubmit() {
        this.$axios.post(apiUrls.auth + '/login', {
          login: this.login,
          password: this.password
        }).then(res => {

          this.$router.push({path: '/home'})

          this.setUser(res.data)

        }).catch(err=>{
          console.log(err)
          alert(err.errorMessage)
        })
      }
    }
  }
</script>

<style scoped>

</style>
