import {generate, parse, transform, stringify} from 'csv';
import fs from 'fs';


// Implementation for app storage using CSV file
// Each row in CSV file has the following format:
// invoice_number, first_name, last_name, email, player_name, quantity, subtotal, player_name, quantity, subtotal, etc...
export default class CsvStorage {
  constructor(name) {
    this.csvFile = process.env.CSV_PATH;
  }

  async getParser() {
    const content = await fs.promises.readFile(this.csvFile);
    return parse(content, {
      bom: true,
      columns: false,
      relax_column_count : true,
    });
  }

  async findInvoice(id, parser) {
    for await (const record of parser) {
      // First column in CSV corresponds to invoice #
      if (record[0].length > 0 &&
        record[0] === id.toString())
        return record;
    }

    throw new Error('Invoice not found');
  }

  async retrieveInvoice(id) {
    const parser = await this.getParser();

    return this.findInvoice(id, parser);
  }

  async getNextId() {
    let parser = null;
    
    // File doesn't exist
    try {
      parser = await this.getParser();
    }
    catch(e) {
      return 1;
    }

    let largestId = 0;
    for await (const record of parser) {
      // First column in CSV corresponds to invoice #
      if (record[0].length > 0 &&
        parseInt(record[0]) > largestId)
        largestId = parseInt(record[0]);
    }

    return largestId+1;
  }

  async appendInvoice(data) {
    const arrayData = [
      data.id,
      data.firstName,
      data.lastName,
      data.email,
    ];

    data.data.map( item => {
      arrayData.push(item.name);
      arrayData.push(item.quantity);
      arrayData.push(item.subtotal);
    });

    // Make the stringify() function compatible w/ await
    return new Promise(resolve => {
      stringify([arrayData], async (err, output) => {
        if (err) {
          throw new Error(err);
          return;
        }

        await fs.promises.appendFile(this.csvFile, output, (err) => {
          if (err) throw err;
        });

        resolve();
      });
    });
  }

};
