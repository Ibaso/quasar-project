<template>
  <q-layout view="lHh Lpr lFf">
    <q-header >
<!--      <q-toolbar>-->
<!--        <q-btn-->
<!--          flat-->
<!--          dense-->
<!--          round-->
<!--          icon="menu"-->
<!--          aria-label="Menu"-->
<!--          @click="toggleLeftDrawer"-->
<!--        />-->

<!--        <q-toolbar-title>-->
<!--          Quasar App-->
<!--        </q-toolbar-title>-->

<!--        <div> <q-icon name="logout" size="sm" class="cursor-pointer" @click="logOut" /> </div>-->
<!--      </q-toolbar>-->
    </q-header>

<!--    <q-drawer-->
<!--      v-model="leftDrawerOpen"-->
<!--      show-if-above-->
<!--      bordered-->
<!--    >-->
<!--      <q-list>-->
<!--        <q-item-label-->
<!--          header-->
<!--        >-->
<!--          Essential Links-->
<!--        </q-item-label>-->

<!--&lt;!&ndash;        <EssentialLink&ndash;&gt;-->
<!--&lt;!&ndash;          v-for="link in essentialLinks"&ndash;&gt;-->
<!--&lt;!&ndash;          :key="link.title"&ndash;&gt;-->
<!--&lt;!&ndash;          v-bind="link"&ndash;&gt;-->
<!--&lt;!&ndash;        />&ndash;&gt;-->
<!--      </q-list>-->
<!--    </q-drawer>-->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import {mapGetters, mapMutations} from 'vuex';

export default{
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data(){
    return{
      leftDrawerOpen: false
    }


  },
  methods:{
    ...mapGetters(['getUser']),
    ...mapMutations(['setUser']),
    toggleLeftDrawer () {
      this.leftDrawerOpen= ! this.leftDrawerOpen
    },
    logOut(){

      this.$router.push({path : "/"})
      this.setUser({})
      console.log(this.getUser())
    }
  },


}
</script>
