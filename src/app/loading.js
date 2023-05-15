
import StatusIndicator from '../components/StatusIndicator';
import Providers from "../components/Provider";

import styles from './loading.module.css';


export default function PageLoading() {
  return (
    <Providers>
      <div className={styles.contLoading}>
        <StatusIndicator />
      </div>
    </Providers>
  );
};
