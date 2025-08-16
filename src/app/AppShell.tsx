import { useState } from 'react';

import cn from 'classnames';
import { Outlet } from 'react-router-dom';

import SideMenu from '../components/SideMenu';
import styles from './app-shell.module.scss';

import '../styles/base.scss';

export default function AppShell() {
  const [sideMenuExpanded, setSideMenuExpanded] = useState(false);

  return (
    <div className={cn(styles['app-grid'])}>
      <main
        className={cn(
          styles['app-main'],
          sideMenuExpanded && styles['app-main-overlay']
        )}
      >
        <Outlet />
      </main>
      <SideMenu onExpandedChange={setSideMenuExpanded} />
    </div>
  );
}
