import { connection } from "./jsstore_con";

export class BoutiqueTypeService {
  constructor() {
    this.tableName = "BoutiqueType";
  }

  getAll() {
    return connection.select({
      from: this.tableName
    });
  }

  insert(boutiquesTypes) {
    return connection.insert({
      into: this.tableName,
      values: boutiquesTypes,
      return: true
    });
  }
}
