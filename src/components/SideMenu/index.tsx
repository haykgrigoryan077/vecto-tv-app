/* eslint-disable no-unused-vars */
import React from 'react';

import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import MenuItem from './components/MenuItem';
import { FOOTER, NAV_ITEMS } from './config';
import styles from './SideMenu.module.scss';

interface SideMenuProps {
  onExpandedChange: (expanded: boolean) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onExpandedChange }) => {
  const [expanded, setExpanded] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setExpanded(true);
    onExpandedChange(true);
  };

  const handleMouseLeave = () => {
    setExpanded(false);
    onExpandedChange(false);
  };

  const handleItemClick = (path?: string) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav
      className={cn(styles['side-menu'], expanded && styles['is-expanded'])}
      aria-label="Main navigation"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <header className={styles['profile']}>
        <img
          className={styles['profile-avatar']}
          src="/assets/avatar.png"
          alt=""
        />
        <span className={styles['profile-name']}>Daniel</span>
      </header>

      <ul className={styles['nav']} role="menu">
        {NAV_ITEMS.map(({ key, icon, label, path }) => (
          <li key={key} role="none">
            <MenuItem
              icon={icon}
              label={label}
              active={path ? location.pathname === path : false}
              expanded={expanded}
              onClick={() => handleItemClick(path)}
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
