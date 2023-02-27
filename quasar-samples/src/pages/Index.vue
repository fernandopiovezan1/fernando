<template>
  <q-page class="flex flex-center">
    <div class="row q-gutter-md">
      <q-btn color="primary" label="Persistent Menu">
        <q-menu persistent auto-close>
          <q-list style="min-width: 100px">
            <q-item clickable>
              <q-item-section>New tab</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>New incognito tab</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Recent tabs</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>History</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section>Downloads</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Settings</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable>
              <q-item-section>Help &amp; Feedback</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        <q-toggle v-model="toggleDark" />
      </q-btn>
      <div class="col-12 row justify-center">
        <p class="caption">Quasar Component Samples</p>
      </div>
      <div class="col-12 row justify-center">
        <img alt="Quasar logo" src="~assets/quasar-logo-full.svg" />
      </div>
    </div>
    <inline-template-test inline-template>
      <div>
        <div>{{ message }}</div>
        <q-btn :label="message" />
      </div>
    </inline-template-test>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  computed: {
    toggleDark: {
      get() {
        return this.$q.dark.isActive
      },
      set(val) {
        this.$q.dark.set(val)
      }
    }
  }
}
</script>
