import { type PropsWithChildren } from 'react';

import styles from './app-shell.module.scss';

import '../styles/base.scss';

export default function AppShell({ children }: PropsWithChildren) {
  return (
    <div className={styles.appGrid}>
      <aside aria-label="Main navigation" />

      <main className={styles.appMain}>{children}</main>
    </div>
  );
}
