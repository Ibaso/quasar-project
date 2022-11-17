<template>
  <q-page class="flex flex-center">
    <check-component/>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import CheckComponent from "components/CheckComponent";

export default defineComponent({
  name: 'IndexPage',
  components: {CheckComponent}
})
</script>
