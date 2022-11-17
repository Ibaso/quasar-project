<template>
  <div @click="viewPost">
    <q-item class="cursor-pointer">
      <q-item-section top avatar class="bi-align-top">
        <q-avatar color="primary" text-color="white">
          <profile-view-component>
            {{getScreenNameCaps(item.screen_name)}}
          </profile-view-component>
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <div>
          <div align="left" class="row justify-between">

              <profile-view-component :profile-user-name="item.username">
                <b>
                {{item.screen_name}}
                </b>
                {{item.username}}

              </profile-view-component>


            <!--            menu button-->
            <q-btn flat @click.stop="" class="float-right label-hover " round size="sm" color=" "
                   icon="mdi-dots-horizontal">
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
          <div align="left" v-if="item.parent_id !=-1">
            <label class="text-blue">Replying to</label> {{item.parent_username}}
          </div>
        </div>
        <div align="left">{{item.content}}</div>
        <div class="justify-between row">
          <q-btn flat :label="item.comment_count" class="float-right comment-hover " round size="sm"
                 icon="mdi-comment-outline" @click.stop="createComment"/>
          <q-btn flat class="float-right repost-hover " round size="sm" icon="mdi-twitter-retweet"
                 @click.stop="repost"/>
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
          <q-btn flat class="float-right share-hover " round size="sm" icon="mdi-arrow-up-bold-outline" @click.stop=""/>
        </div>
      </q-item-section>
    </q-item>
    <q-separator/>

    <q-dialog v-model="commentDialog">
      <q-card style="width: 500px">
        <q-card-section>
          <div>
            <q-btn flat round icon="close" @click="commentDialog = false"/>
          </div>
        </q-card-section>
        <q-item class="cursor-pointer">
          <q-item-section top avatar class="bi-align-top">
            <q-avatar color="primary" text-color="white">
              {{getScreenNameCaps(item.screen_name)}}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <div>
              <div align="left">
                <b>{{item.screen_name}}</b> <label class="label-hover">{{item.username}}</label>
              </div>
            </div>

            <div align="left">{{item.content}}</div>
            <div class="q-mr-sm">
              <q-input
                v-model="text"

                autogrow
              />
            </div>

          </q-item-section>
        </q-item>

        <q-card-actions align="right">
          <q-btn label="Post" :disable="text.length==0" class="q-mr-md q-my-sm" color="blue" @click="sendPost"/>

        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>
</template>

<script>
  import {apiUrls} from "src/utils/const/apiUrls";
  import {mapGetters, mapMutations} from "vuex";
  import ProfileViewComponent from "components/base/ProfileViewComponent";

  export default {
    name: "PostComponent",
    components: {ProfileViewComponent},
    props: {
      item: {},
      isComment: false,

    },
    data() {
      return {
        commentDialog: false,
        text: "",
        liked: false,
      }
    },
    methods: {
      ...mapGetters(['getUser']),
      ...mapMutations(['setPostItem']),
      deletePost(item) {
        this.$axios.delete(apiUrls.post + '?id=' + item.id + '&user_id=' + this.getUser().id).then(res => {
          this.getPosts()
          this.$emit("done")
          console.log("Success")
        })
      },
      getScreenNameCaps(screen_name) {
        let caps = ""
        screen_name.split(" ").forEach(s => caps += s.charAt(0))
        return caps
      },
      getPosts() {
        this.$axios.get(apiUrls.feed).then(res => {
          this.posts = res.data
          console.log('res.data ->', res.data)
        })
      },
      createComment() {
        this.commentDialog = true;
      },
      sendPost() {
        this.$axios.post(apiUrls.post + '/save', {
          user_id: this.getUser().id,
          content: this.text,
          parent_id: this.item.id
        }).then(res => {
          this.getPosts()
          this.text = ""
          this.commentDialog = false
          console.log("Success")
        })
      },
      repost() {
        console.log("repost")
      },
      viewPost() {
        console.log('post', this.item)
        this.setPostItem(this.item)
        window.location = '/view'
      },
      like(post_id) {
        if (this.liked) {
          this.$axios.post(apiUrls.like, {
            liked_user_id: this.getUser().id,
            post_id: post_id
          }).then(res => {
            this.getPosts()
            this.text = ""
            this.commentDialog = false
            this.$emit("done")
          })
        } else {
          this.$axios.delete(apiUrls.like + '?post_id=' + post_id + '&user_id=' + this.getUser().id).then(res => {
            this.getPosts()
            this.text = ""
            this.commentDialog = false
            this.$emit("done")
          })
        }

      },
      installLikes() {

      }

    }
  }
</script>

<style scoped>
  .label-hover {
    cursor: pointer;
    transition: 0.3s;
  }

  .label-hover:hover {
    color: rgb(22, 188, 220);
  }

  .like-hover {
    cursor: pointer;
    transition: 0.3s;
  }

  .like-hover:hover {
    color: red;
  }

  .repost-hover {
    cursor: pointer;
    transition: 0.3s;
  }

  .repost-hover:hover {
    color: green;
  }

  .comment-hover {
    cursor: pointer;
    transition: 0.3s;
  }

  .comment-hover:hover {
    color: rgb(22, 188, 220);
  }

  .share-hover {
    cursor: pointer;
    transition: 0.3s;
  }

  .share-hover:hover {
    color: rgb(22, 188, 220);
  }
</style>
