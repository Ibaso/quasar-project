<template>
  <div @click.stop="sendToProfileView">
    <slot >

    </slot>
  </div>
</template>

<script>
  import { mapMutations} from 'vuex';
  export default {
    name: "ProfileViewComponent",
    props: {
      profileUserName: null


    },
    methods: {
      ...mapMutations(['setUsername']),
      sendToProfileView(){
        console.log(this.profileUserName)
        this.setUsername(this.profileUserName)
        window.location = '/profile'
      }
    },
    mounted() {

    }

  }
</script>

<style scoped>


</style>
