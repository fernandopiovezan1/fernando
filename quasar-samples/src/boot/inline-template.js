export default async ({ Vue }) => {
  Vue.component('inline-template-test', {
    data: function () {
      return {
        message: "Hello! i'm coming from inline template."
      }
    }
  })
}
