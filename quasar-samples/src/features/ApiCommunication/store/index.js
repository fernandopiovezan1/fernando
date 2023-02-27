import { getField, updateField } from 'assets/utils/vuex-utils'
import * as actions from './actions.js'
// import { routerInstance } from 'boot/router'
// a function returning the state objects useful for reinitialization
const apcStates = () => ({
  apiResponse: null,
  apiErrorResponse: null,
  requestedBy: null
})

const state = {
  // important prop if you want to reset state of this module
  initState: apcStates,
  // populate state props
  ...apcStates()
}

// getters, just using helper here
const getters = {
  getField
}

// mutator, using helper
const mutations = {
  updateField
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
