import Image from 'next/image';

import Providers from "../components/Provider";
import InvoiceForm from '../components/InvoiceForm';
import FormModal from '../components/FormModal';
import SyncPlayers from '../components/SyncPlayers';

import { FORM_MODE } from '../utils/constants';
import {
  fetchPlayersIfNeeded,
} from '../utils/fetchPlayers';
import {
  selectPlayers,
} from '../store/playersDataSlice';
import { store } from "../store";
import { cacheClientEnabled } from '../utils/cache';

import styles from './page.module.css'


export default async function Home() {
  // Fetch players if not already in store
  await fetchPlayersIfNeeded();

  const players = selectPlayers (store.getState() );
  const CACHE_CLIENT = cacheClientEnabled();

  return (
    <main className={styles.main}>

      { CACHE_CLIENT &&
        <SyncPlayers players={players} />
      }

      <Providers>
        <div className={styles.pgContainer}>
          <InvoiceForm mode={FORM_MODE.EDIT} />
          <FormModal />
        </div>
      </Providers>

    </main>
  )
};
