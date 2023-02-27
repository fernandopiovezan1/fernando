import { axios } from 'boot/axios'

export async function callApi({ commit, state }) {
  try {
    const {
      data: { data }
    } = await axios.get('/test')
    console.log('callApi', data)
    commit('updateField', { path: 'apiResponse', value: data })
    return data
  } catch (e) {
    throw e
  }
}
