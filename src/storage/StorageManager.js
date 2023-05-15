import csvStorage from './csvStorage';


// Interface used by rest of application
export default class StorageManager {
  constructor(name) {
    // Update this line to switch to a different storage provider
    this.storageInstance = new csvStorage();
  }

  retrieveInvoice(id) {
    return this.storageInstance.retrieveInvoice(id);
  }

  getNextId() {
    return this.storageInstance.getNextId();
  }

  appendInvoice(d) {
    return this.storageInstance.appendInvoice(d);
  }
};
