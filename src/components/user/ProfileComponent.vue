<template>
    <div>
      <div align="center">
        <div class="q-card--bordered " style="width: 600px">
          <div>
            <div class="bg-primary">
              <div style="text-align: left" @click="back">
                <q-btn flat round text-color="white" icon="mdi-arrow-left"/>
                <label class="text-h6 text-white">{{user.screen_name}}</label>

              </div>
            </div>
            <div align="left" class="q-pl-lg q-pt-sm">
              <q-avatar  color="primary" text-color="white" size="100px">{{getScreenNameCaps(user.screen_name)}} </q-avatar>
            </div>
            <div align="left" class="q-pl-md">
              <div class="text-bold text-h6"> {{user.screen_name}} </div>
              <div > {{user.username}} </div>
              <div > <label class="text-grey" >Joined</label> {{formatDate(user.created_date)}} </div>
            </div>
            <q-separator/>
            <q-tabs
              v-model="tab"
              class="text-primary"
              @click="getPosts"
            >
              <q-tab name="2"  label="tweets" />
              <q-tab name="1"   label="replies" />
              <q-tab name="3"  label="likes" />
            </q-tabs>
          </div>


          <div >
            <div v-for="item in posts">
              <post-component :is-comment="false"  :item="item"/>
            </div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {apiUrls} from "src/utils/const/apiUrls";
    import PostComponent from "components/home/PostComponent";

    export default {
        name: "ProfileComponent",
      components: {PostComponent},
      data(){
          return {
            profileUserId : null,
            user : {
              screen_name :"s"
            },
            posts : [],
            tab : '2'
          }
      },
      methods : {
        ...mapGetters(['getUsername']),
        getScreenNameCaps(screen_name) {
          let caps = ""
          screen_name.split(" ").forEach(s => caps += s.charAt(0))
          return caps
        },
        installProfile(){

          console.log(this.getUsername())
          this.$axios.get(apiUrls.user + '?username=' + this.getUsername())
          .then(res=>{
            this.user = res.data
            this.getPosts()
          })

        },
        formatDate(d) {
          let date = new Date(d)
          console.log(date)
          let s = ""
          s = date.getMonth()+1 + " " + date.getFullYear()
          return s
        },
        getPosts(){
          this.$axios.get(apiUrls.post + '/posts' + '?username=' + this.getUsername() + '&all=' + this.tab)
            .then(res=>{
              console.log(res)
              this.posts = res.data
            })
        },
        back(){
          window.location = '/home'
        }

      },
      mounted() {
          this.installProfile();
      }
    }
</script>

<style scoped>

</style>
