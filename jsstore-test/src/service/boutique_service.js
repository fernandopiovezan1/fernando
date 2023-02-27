import { connection } from "./jsstore_con";

export class BoutiqueService {
  constructor() {
    this.tableName = "Boutique";
  }

  getAll() {
    return connection.select({
      from: this.tableName
    });
  }

  getAllWithBoutiqueType() {
    return connection.select({
      from: this.tableName
      // join: {
      //   with: "BoutiqueType",
      //   on: "Boutique.types=BoutiqueType.id",
      //   type: "inner",
      //   as: {
      //     id: "BoutiqueTypeId",
      //     title: "BoutiqueTypeTitle"
      //   }
      // }
    });
  }

  insert(boutiques) {
    return connection.insert({
      into: this.tableName,
      values: boutiques,
      return: true
    });
  }
}
