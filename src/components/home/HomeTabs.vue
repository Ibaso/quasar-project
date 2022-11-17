<template>
  <div>
    <div align="center">
      <div class="q-card--bordered" style="width: 600px">
          <q-toolbar   class="bg-primary text-white">


            <q-toolbar-title>
              <label class="text-white cursor-pointer">Home</label>
            </q-toolbar-title>

            <div> <q-icon name="logout" size="sm" class="cursor-pointer" @click="logOut" /> </div>
          </q-toolbar>


            <home-page-component @changeTabtoView="changeToView($event)"  />

      </div>
    </div>

  </div>
</template>

<script>
    import HomePageComponent from "components/home/HomePageComponent";
    import ViewPostComponent from "components/home/ViewPostComponent";
    export default {
        name: "HomeTabs",
      components: {ViewPostComponent, HomePageComponent},
      data(){
          return{
            tab : "home",
            id : 0
          }
      },
      methods:{
        changeToView(id){
          console.log("id", id)
          this.id = id
          this.tab = "view"
        },
        changeToHome(){
          this.tab = "home"
        }
      }
    }
</script>

<style scoped>

</style>
