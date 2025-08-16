import cn from 'classnames';
import type { PropsWithChildren } from 'react';

import SideMenu from '../components/SideMenu';
import styles from './app-shell.module.scss';

import '../styles/base.scss';

export default function AppShell({ children }: PropsWithChildren) {
  return (
    <div className={cn(styles['app-grid'])}>
      <SideMenu />
      <main className={cn(styles['app-main'])}>{children}</main>
    </div>
  );
}
