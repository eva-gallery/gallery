import { F } from '@/app/framework';
import objectX from './objectx';

export default class dataX {

  table: string;
  data: any;
  objects: any[];

  constructor(table: string) {
    this.table = table;
    this.objects = [];
  }

  async dataObjectX() {
    let temp = new F.objectX(this.table);
    await temp.getType();

    for (const row of this.data) {
      let objectX = new F.objectX(this.table);
      objectX.type = temp.type;
      objectX.setData(row);
      objectX.convertValues();
      this.objects.push(objectX);
    }
  }

  async dataParents() {
    for (const object of this.objects) {
      await object.getParents();
    }
  }

  async getData(options: {
    fields?: string[],
    where?: { [key: string]: string },
    parents?: boolean,
    user?: number,
    deleted?: boolean
  } = { parents: true, deleted: false }) {
    let query: string = "SELECT ";

    if (options.fields && options.fields.length > 0) {
      const fieldNames = options.fields.map(field => `\`${field}\``).join(",");
      query += fieldNames + " ";
    } else {
      query += "* ";
    }

    query += `FROM \`${this.table}\` `;

    if (options.where && Object.keys(options.where).length > 0) {
      query += "WHERE ";
      const conditions = Object.keys(options.where).map(field => `\`${field}\`='${options.where![field]}'`).join(" AND ");
      query += conditions + " ";
    }

    if (options.user !== undefined) {
      if (query.includes("WHERE")) {
        query += "AND ";
      } else {
        query += "WHERE ";
      }
      query += `\`user\`='${options.user}' `;
    }

    if (options.deleted !== undefined) {
      if (query.includes("WHERE")) {
        query += "AND ";
      } else {
        query += "WHERE ";
      }
      if (options.deleted) query += `\`deleted\`='1' `;
      else query += `\`deleted\`='0' `;
    }

    this.data = await F.sql(query);

    //console.log("**** query ****");
    //console.log(this.data);
    //console.log(typeof this.data);    

    await this.dataObjectX();

    if (options.parents) {
      await this.dataParents();
    }
  }


}