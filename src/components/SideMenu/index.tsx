import React from 'react';

import cn from 'classnames';

import MenuItem from './components/MenuItem';
import { FOOTER, NAV_ITEMS } from './config';
import styles from './SideMenu.module.scss';

const SideMenu: React.FC = () => {
  const [expanded, setExpanded] = React.useState(false);
  const activeKey = 'home';

  return (
    <nav
      className={cn(styles['side-menu'], expanded && styles['is-expanded'])}
      aria-label="Main navigation"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <header className={styles['profile']}>
        <img
          className={styles['profile-avatar']}
          src="/assets/icons/avatar.png"
          alt=""
        />
        <span className={styles['profile-name']}>Daniel</span>
      </header>

      <ul className={styles['nav']} role="menu">
        {NAV_ITEMS.map(({ key, icon, label }) => (
          <li key={key} role="none">
            <MenuItem
              icon={icon}
              label={label}
              active={key === activeKey}
              expanded={expanded}
              className={styles['nav-item']}
            />
          </li>
        ))}
      </ul>

      <footer className={styles['footer']}>
        <ul className={styles['footer-list']} aria-label="Secondary">
          {FOOTER.map((text) => (
            <li key={text} className={styles['footer-item']}>
              <span className={styles['footer-text']}>{text}</span>
            </li>
          ))}
        </ul>
      </footer>
    </nav>
  );
};

export default SideMenu;
