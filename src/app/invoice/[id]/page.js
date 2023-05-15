import Providers from "../../../components/Provider";
import InvoiceView from '../../../components/InvoiceView';
import StatusIndicator from '../../../components/StatusIndicator';

import SyncIndicator from '../../../components/SyncIndicator';
import SyncInvoice from '../../../components/SyncInvoice';

import StorageManager from '../../../storage/StorageManager';

import { store } from "../../../store";
import { INDICATOR } from '../../../utils/constants';
import { setType } from '../../../store/indicatorSlice';

import styles from '../../page.module.css'


export default async function Invoice(props) {

  const storageManager = new StorageManager();
  const id = props.params.id;

  let indicatorText = '';
  let indicatorType = '';
  let invoiceNumber = NaN;
  let data = [];

  try {
    data = await storageManager.retrieveInvoice(id);
    if (data.length < 7)
      throw new Error('Invalid data');

    invoiceNumber = data[0];
    indicatorType = INDICATOR.SUCCESS;
  } catch(e) {
    indicatorType = INDICATOR.WARNING;
    indicatorText = e.toString();
  }
  store.dispatch(setType(indicatorType));

  return (
    <main className={styles.main}>
      <Providers>
        <SyncIndicator type={indicatorType} text={indicatorText} />
        {
          indicatorType == INDICATOR.SUCCESS &&
            <SyncInvoice
              invoiceNumber={invoiceNumber}
              firstName={data[1]}
              lastName={data[2]}
              email={data[3]}
              tableData={data.slice(4, data.length)}
            />
        }
        <InvoiceView />
      </Providers>
    </main>
  );

};
