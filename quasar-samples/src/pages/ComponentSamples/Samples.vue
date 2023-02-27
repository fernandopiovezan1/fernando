<template>
  <q-page class="q-pa-md row justify-center">
    <div>
      <q-btn @click="dialog = true" label="Show Form Dialog" />
      <e-dialog
        :maximized="$q.platform.is.mobile"
        v-model="dialog"
        @child-update="updateForm"
        :formData="formData"
      />
    </div>
    <div>{{ formData || '' }}</div>
    <dialog-test @uploader-ref="dialogClosed" />

    <div>
      <q-btn label="custom dialog" @click="showDialog" />
    </div>
    The store:: {{ resp }}
  </q-page>
</template>

<style>
</style>

<script>
/* eslint-disable */
import EDialog from 'pages/ComponentSamples/DialogExtension'
import DialogTest from 'features/Challenges/ui/DialogTest'
import CustomDialog from './CustomDialog.vue'
export default {
  components: {
    EDialog,
    DialogTest
  },
  name: 'Samples',
  data() {
    return {
      dialog: false,
      formData: {
        amount: null,
        account: 'Default',
        description: 'Default input',
        type: 'Savings',
        uppercase: '',
        password: ''
      },
      customDialog: null,
      propResp: null
    }
  },
  computed: {
    resp() {
      this.propResp = this.$store.state.apcStore.apiResponse
      return this.propResp
    }
  },
  watch: {
    propResp(v) {
      if (this.customDialog) {
        this.customDialog.update({ apiResponse: this.resp })
      }
    }
  },
  methods: {
    updateForm(data) {
      this.formData = data
    },
    dialogClosed(v) {
      console.log('parent', v)
    },
    showDialog() {
      this.customDialog = this.$q
        .dialog({
          component: CustomDialog,

          // optional if you want to have access to
          // Router, Vuex store, and so on, in your
          // custom component:
          parent: this, // becomes child of this Vue node
          // ("this" points to your Vue component)
          // (prop was called "root" in < 1.1.0 and
          // still works, but recommending to switch
          // to the more appropriate "parent" name)

          // props forwarded to component
          // (everything except "component" and "parent" props above):
          apiResponse: this.resp
          // ...more.props...
        })
        .onOk(() => {
          console.log('OK')
        })
        .onCancel(() => {
          console.log('Cancel')
        })
        .onDismiss(() => {
          console.log('Called on OK or Cancel')
        })
    }
  }
}
</script>
