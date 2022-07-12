<template>
  <div id="app">
    <h1>JsStore Output</h1>
    <vue-json-pretty :path="'res'" :data="boutiques"> </vue-json-pretty>
    <!-- <h1>Expected Output</h1>
    <vue-json-pretty :path="'res'" :data="getExpectedOutput()"> -->
    <!-- </vue-json-pretty> -->
    <button @click="cliked">Botão</button>
    {{ boutiques2 }}
  </div>
</template>

<script>
import { initJsStore } from "./service/idb_service";
import { Global } from "./global";
import { BoutiqueService } from "./service/boutique_service";
import VueJsonPretty from "vue-json-pretty";
import "vue-json-pretty/lib/styles.css";

export default {
  name: "App",
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      boutiques: null,
      boutiques2: null,
      expectedOutput: null,
    };
  },
  async beforeCreate() {
    try {
      const isDbCreated = await initJsStore();
      if (isDbCreated) {
        console.log("prefill database");
      } else {
        console.log("erro");
      }
      const service = new BoutiqueService();
      const obj = await service.getAllWithBoutiqueType();
      this.boutiques = obj;
      this.boutiques2 = this.testeMethod();
    } catch (ex) {
      console.error(ex);
      alert(ex.message);
      Global.isIndexedDbSupported = false;
    }
  },
  async mounted() {},
  methods: {
    testeMethod() {
      const boutiqueService = new BoutiqueService();

      return new Promise((resolve) => {
        let test = boutiqueService.getAllWithBoutiqueType();
        console.log(test);
        resolve(test);
      }).then((resp) => {
        console.log("testeMethod", resp);
        return resp;
      });
      // return useLiveQueryTicket(boutiqueService.getAllWithBoutiqueType());
    },
    async cliked() {
      const boutiqueService = new BoutiqueService();
      const boutiques = [
        { id: "uniqueid09", title: "Sport 3000", types: ["uniqueid01"] },
      ];
      await boutiqueService.insert(boutiques);
      console.log("cliked");
    },
    getExpectedOutput() {
      return [
        {
          id: "uniqueid04",
          title: "Sport 3000",
          types: [{ id: "uniqueid01", title: "Sport boutique" }],
        },
        {
          id: "uniqueid05",
          title: "LuxuryWear",
          types: [
            { id: "uniqueid02", title: "Luxe boutique" },
            { id: "uniqueid03", title: "Wear boutique" },
          ],
        },
        {
          id: "uniqueid06",
          title: "WearShop",
          types: [{ id: "uniqueid03", title: "Wear boutique" }],
        },
      ];
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
