<template>
  <q-dialog ref="dialog" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <q-card-section style="max-height: 300px" class="scroll">
        <api-page />
      </q-card-section>
      <q-card-section>
        <div class="text-h1">From Props</div>
        {{ apiResponse || 'Awaiting response... ' }}
        <br />
        <div>
          <q-btn
            label="Clear response"
            color="negative"
            @click="
              $store.commit('apcStore/updateField', {
                path: 'apiResponse',
                value: null
              })
            "
          />
        </div>
        <br />
        <div class="text-subtitle1">
          What's in the store: {{ storeResponse }}
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onCancelClick" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import ApiPage from 'features/ApiCommunication/ui/AxiosNodeTest.vue'
export default {
  components: {
    ApiPage
  },
  props: {
    // ...your custom props
    apiResponse: {
      type: Object,
      default: null
    }
  },
  computed: {
    storeResponse() {
      return this.$store.state.apcStore.apiResponse
    }
  },

  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show() {
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick() {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick() {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>

<style>
</style>