import { make } from 'vuex-pathify'

// a function returning the state objects useful for reinitialization
const commonState = () => ({
  sample: null,
  msg: 'hello'
})

const state = {
  // important prop if you want to reset state of this module
  initState: commonState,
  // populate state props
  ...commonState()
}

// // getters, just using helper here
const getters = {}

// // mutator, using helper
const mutations = make.mutations(state)

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
