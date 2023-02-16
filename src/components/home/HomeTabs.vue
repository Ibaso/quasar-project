<template>
  <div>
    <div align="center">
      <div class="q-card--bordered" style="width: 600px">
        <q-toolbar class="bg-primary text-white">
          <div>
            <q-icon name="person" size="sm" class="cursor-pointer" @click=""/>
          </div>

          <q-toolbar-title>
            <label class="text-white cursor-pointer">Home</label>
          </q-toolbar-title>

          <div>
            <q-icon name="logout" size="sm" class="cursor-pointer" @click="logout"/>
          </div>
        </q-toolbar>


        <home-page-component @changeTabtoView="changeToView($event)"/>

      </div>
    </div>

  </div>
</template>

<script>
  import HomePageComponent from "components/home/HomePageComponent";
  import ViewPostComponent from "components/home/ViewPostComponent";
  import {apiUrls} from "src/utils/const/apiUrls";
  import {mapGetters} from "vuex";

  export default {
    name: "HomeTabs",
    components: {ViewPostComponent, HomePageComponent},
    data() {
      return {
        tab: "home",
        id: 0
      }
    },
    methods: {
      ...mapGetters(['getUser']),
      changeToView(id) {
        console.log("id", id)
        this.id = id
        this.tab = "view"
      },
      changeToHome() {
        this.tab = "home"
      },
      logout() {
        this.$axios.put(apiUrls.auth + '/logout', {
          username: null,
          token: null
        }).then(
          window.location = '/'
        )
      }
    }
  }
</script>

<style scoped>

</style>
