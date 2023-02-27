import { connection } from "./jsstore_con";
import { DATA_TYPE } from "jsstore";
import { BoutiqueService } from "./boutique_service";
import { BoutiqueTypeService } from "./boutiqueType_service";

const getDatabase = () => {
  const boutiqueModel = {
    name: "Boutique",
    columns: {
      id: {
        primaryKey: true
      },
      title: {
        dataType: DATA_TYPE.String
      },
      types: {
        dataType: DATA_TYPE.Array,
        multiEntry: true
      }
    }
  };

  const boutiqueTypeModel = {
    name: "BoutiqueType",
    columns: {
      id: {
        primaryKey: true
      },
      title: {
        dataType: DATA_TYPE.String
      }
    }
  };

  const dataBase = {
    name: "Vue_Demo",
    tables: [boutiqueModel, boutiqueTypeModel]
  };
  return dataBase;
};
const boutiqueTypeService = new BoutiqueTypeService();
const boutiqueService = new BoutiqueService();

const fillDB = async () => {
  const boutiquesTypes = [
    { id: "uniqueid01", title: "Sport boutique" },
    { id: "uniqueid02", title: "Luxe boutique" },
    { id: "uniqueid03", title: "Wear boutique" }
  ];
  await boutiqueTypeService.insert(boutiquesTypes);
  const boutiques = [
    { id: "uniqueid04", title: "Sport 3000", types: ["uniqueid01"] },
    {
      id: "uniqueid05",
      title: "LuxuryWear",
      types: ["uniqueid02", "uniqueid03"]
    },
    { id: "uniqueid06", title: "WearShop", types: ["uniqueid03"] }
  ];
  await boutiqueService.insert(boutiques);
};
export const initJsStore = async () => {
  const dataBase = getDatabase();
  console.log(dataBase);
  await connection.initDb(dataBase);
  await connection.dropDb();
  await connection.initDb(dataBase);
  await fillDB();
  const insertedBoutiqueType = await boutiqueTypeService.getAll();
  console.log(insertedBoutiqueType);
  const insertedBoutique = await boutiqueService.getAll();
  return true;
};
