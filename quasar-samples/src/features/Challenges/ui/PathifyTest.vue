<template>
  <q-page padding>
    {{ example }}
    <q-input v-model="msg" label="test"/>
  </q-page>
</template>

<script>
import { sync } from 'vuex-pathify'
export default {
  name: 'sample',
  computed: {
    example: sync('example'),
    ...sync('example/*')
  }
}
</script>

<style>
</style>
