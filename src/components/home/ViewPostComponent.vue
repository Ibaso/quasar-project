<template>
  <div align="center">
    <div class="q-card--bordered" style="width: 600px">
      <div align="center">
        <div style="text-align: left" @click="back">
          <q-btn flat round icon="mdi-arrow-left"/>

        </div>

        <q-item class="cursor-pointer">
          <q-item-section top avatar class="bi-align-top">
            <q-avatar color="primary" text-color="white">
              {{getScreenNameCaps( item.screen_name)}}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <div>
              <div align="left">
                <b>{{item.screen_name}}</b> {{item.username}}

                <!--            menu button-->
                <q-btn flat class="float-right label-hover " round size="sm" color=" " icon="mdi-dots-horizontal">
                  <q-menu anchor="bottom left" self="top right">
                    <q-item clickable @click="deletePost(item)" v-if="item.user_id == getUser().id">
                      <q-item-section>
                        <div>
                          <q-icon name="mdi-trash-can" size="sm" color="red"/>
                          Delete
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-item clickable>
                      <q-item-section>New incognito tab</q-item-section>
                    </q-item>
                  </q-menu>
                </q-btn>
              </div>
            </div>
            <div style="font-size: 18px" align="left">{{item.content}}</div>
            <br>
            <div class="text-grey-14" align="left">{{formatDate(item.created_date)}}</div>
            <div class="justify-between row">
              <q-btn flat :label="item.comment_count" class="float-right comment-hover " round size="sm"
                     icon="mdi-comment-outline"
                     @click="createComment"/>
              <q-btn flat class="float-right repost-hover "  round size="sm" icon="mdi-twitter-retweet"/>
              <q-checkbox
                class="float-right"
                v-model="liked"
                @click="like(item.id)"
                checked-icon="mdi-heart"
                color="red"
                unchecked-icon="mdi-heart-outline"
                :label="item.like_count"

                indeterminate-icon="help"
              />
              <q-btn flat class="float-right share-hover " round size="sm" icon="mdi-arrow-up-bold-outline"/>
            </div>
            <q-separator/>

            <div class="q-py-sm">
              <q-input
                v-model="text"
                filled
                autogrow
              />
            </div>
            <div align="right">

              <q-btn :disable="text.length==0" class="q-mr-md q-my-sm" color="blue" @click="sendPost">
                post
              </q-btn>

            </div>
          </q-item-section>
        </q-item>


        <q-list bordered separator>
          <div v-for="comment in comments">
            <post-component :author-username="item.username" is-comment="true" :item="comment" @done="getComments"/>
          </div>

        </q-list>

      </div>

    </div>


  </div>
</template>

<script>
  import {apiUrls} from "src/utils/const/apiUrls";
  import PostComponent from "components/home/PostComponent";
  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: "ViewPostComponent",
    components: {PostComponent},
    props: {

      id: null
    },
    data() {
      return {
        item: {
          id: 0,
          screen_name: "ss",
          username: "",
          content: "",
          created_date: "",
          like_count: 0,
          repost_count: 0,
          user_id: 0

        },
        text: "",
        comments: [],
        liked : false,
      }
    },
    methods: {
      ...mapGetters(['getUser', 'getPostItem']),
      ...mapMutations(['setPostItem']),
      getComments() {
        this.$axios.get(apiUrls.post + '/comments' + '?parent_id=' + this.item.id).then(res => {
          this.comments = res.data
          // console.log('comments', this.comments)
        }).catch(err => {
          console.log(err)
        })
      },
      getScreenNameCaps(screen_name) {
        let caps = ""
        screen_name.split(" ").forEach(s => caps += s.charAt(0))
        return caps
      },
      formatDate(d) {
        let date = new Date(d)
        console.log(date)
        let s = ""
        s = date.getDay() + " " + date.getMonth() + " " + date.getYear()
        return date.toLocaleString()
      },
      sendPost() {
        this.$axios.post(apiUrls.post + '/save', {
          user_id: this.getUser().id,
          content: this.text,
          parent_id: this.getPostItem().id
        }).then(res => {
          this.getComments()
          this.text = ""
          this.commentDialog = false
          console.log("Success")
        })
      },
      back() {
        if (this.getPostItem().parent_id !== -1) {
          window.location = 'home'
          this.$axios.get(apiUrls.post + '?id=' + this.getPostItem().parent_id)
            .then(res => {
              console.log('res receoved')
              this.setPostItem(res.data)
            })

          window.location = '/view'
        } else {
          console.log('else')
          window.location = '/home'
        }


      },
      installItem() {
        this.item = this.getPostItem()
        console.log(this.item)
      },
      like(post_id){
        if(this.liked){
          this.$axios.post(apiUrls.like , {
            liked_user_id: this.getUser().id,
            post_id : post_id
          }).then(res => {
            this.getPosts()
            this.text = ""
            this.commentDialog = false
            this.$emit("done")
          })
        }
        else {
          this.$axios.delete(apiUrls.like + '?post_id=' + post_id + '&user_id=' + this.getUser().id ).then(res => {
            this.getPosts()
            this.text = ""
            this.commentDialog = false
            this.$emit("done")
          })
        }
      }

    },
    computed: {},
    mounted() {
      this.installItem()
      this.getComments()
    }
  }
</script>

<style scoped>

</style>
