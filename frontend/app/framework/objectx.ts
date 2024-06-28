import { F } from '@/app/framework';

type typesType = {
  [key: string]: string;
};

export default class objectX {
  id!: number;
  unique!: string;
  name: string;
  data: { [key: string]: any };
  type: any;
  parent: { [key: string]: objectX };
  child: objectX[];

  static types: typesType = {
    id: "mediumint(10) unsigned",
    tinytext: "tinytext",
    mediumtext: "mediumtext",
    text: "text",
    longtext: "longtext",
    int: "int",
    price: "decimal(10,2)",
    double: "double",
    enum: "enum",
    set: "set",
    time: "time",
    date: "date",
    datetime: "datetime",
    url: "varchar(250)",
    code: "varchar(4096)",
    password: "varchar(240)",
    color: "char(10)",
    tags: "varchar(235)",
    options: "varchar(2048)",
    varchar: "varchar(255)",
    boolean: "tinyint(1)",
    image: "char(250)",
    multimage: "char(255)",
    file: "char(240)",
    unique: "varchar(16)",
    timestamp: "timestamp",
    parent: "mediumint(11) unsigned"
  };

  constructor(name: string) {
    this.name = name;
    this.type = {};
    this.data = {};
    this.child = [];
    this.parent = {};
  };


  async getType() {

    const columns: any = await F.sql(`SHOW COLUMNS FROM ${this.name}`);

    for (const column of columns) {
      const field: string = column.Field;
      const type: string = column.Type;

      for (const [typeName, typeValue] of Object.entries(objectX.types)) {
        if (type === typeValue) {
          this.type[field] = typeName;
          break;
        }
      }
    }
    // console.log("*** getType() ***");
    // console.log(this.type);
  }

  async getData(id: number) {
    await this.getDataWhere("id", id);
  }

  async getDataUnique(unique: string) {
    await this.getDataWhere("unique", unique);
  }

  async getDataWhere(field: string, value: any) {
    const data: any = await F.sql(`SELECT * FROM \`${this.name}\` WHERE \`${field}\`='${value}' LIMIT 1`);

    this.data = data[0];
    this.id = this.data['id'];
    this.unique = this.data['unique'];

    await this.getType();
    this.convertValues();

  }

  convertValues() {
    for (const [key, value] of Object.entries(this.data)) {
      if (this.type[key] == "boolean") {
        if (this.data[key] == '0') { this.data[key] = 'true'; } else { this.data[key] = 'false'; }
      }
    }
  }

  setData(data: any) {
    this.data = data;
    this.id = data.id;
    this.unique = data.unique;
  }

  async getParents() {
    for (const [key, value] of Object.entries(this.data)) {
      if (this.type[key] == "parent" && value != 0) {
        const name = key.split('-')[0];
        let objectX = new F.objectX(name);
        await objectX.getData(value);
        this.parent[name] = objectX;
      }
    }
    //console.log("***** PARENTS *****");
    //console.log(this.parent);
  }
}
