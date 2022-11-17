<template>
  <div>
    <div class="items-center">
      <div style="padding: 10px">
        <q-input dense :model="username1" placeholder="username 1" outlined/>
      </div>
      <div style="padding: 10px">
        <q-input dense :model="username2" placeholder="username 2" outlined/>
      </div>
      <q-btn @click="checkUsernames" label="check" color="primary" outline/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CheckComponent",
    data() {
      return {
        username1: "",
        username2: "",
        url: 'https://twitter.com/i/api/graphql/HThKoC4xtXHcuMIok4O0HA/UserByScreenName?variables=%7B%22screen_name%22%3A%22the%22%2C%22withSafetyModeUserFields%22%3Atrue%2C%22withSuperFollowsUserFields%22%3Atrue%7D&features=%7B%22verified_phone_label_enabled%22%3Afalse%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%7D',
        headers: {
          'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
          'cookie': 'guest_id_marketing=v1%3A165952950427009246; guest_id_ads=v1%3A165952950427009246; kdt=XvRbKNKScAWXQkXDdbMfnY8fdZG0G4ocOcG3AeGx; night_mode=2; _ga_BYKEBDM7DS=GS1.1.1660893609.2.1.1660893642.0.0.0; _ga=GA1.2.83090389.1659536706; mbox=PC#3ee666df24e0456eb9755d680a360ded.38_0#1724475449|session#2f2ef4861d8c46d0a339df10cfc51150#1661232509; _gid=GA1.2.3625086.1666584429; dnt=1; _sl=1; att=1-O0EqDwr3gB0ugrDIA7kkG66Xd3kAQApQaK9H6BYq; personalization_id="v1_OFumVVwOo1OUIF46rD/dDg=="; guest_id=v1%3A166667548298572172; ct0=681a1bfe30ed08b60c4209d2d3ca933b; gt=1584806038083182595',
          'x-csrf-token': '681a1bfe30ed08b60c4209d2d3ca933b',
          'x-guest-token': '1584806038083182595',
          'x-twitter-active-user': 'yes',
          'x-twitter-client-language': 'ru',
          'Referer':'https://twitter.com'
        }
      }
    },
    methods: {
      go: function(){
        console.log("function")
      },

      checkUsernames() {
        this.$axios.get('http://localhost:8090/hello').then(res => {
          console.log('res => ', res)
          this.go
        })
      }
    }
  }
</script>

<style scoped>

</style>
