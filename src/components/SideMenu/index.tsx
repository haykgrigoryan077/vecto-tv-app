import React, { useMemo, useState, useCallback } from 'react';
import cn from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';

import MenuItem from './components/MenuItem';
import { FOOTER, NAV_ITEMS } from './config';
import styles from './SideMenu.module.scss';

interface SideMenuProps {
  onExpandedChange: (expanded: boolean) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onExpandedChange }) => {
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMouseEnter = useCallback(() => {
    setExpanded(true);
    onExpandedChange(true);
  }, [onExpandedChange]);

  const handleMouseLeave = useCallback(() => {
    setExpanded(false);
    onExpandedChange(false);
  }, [onExpandedChange]);

  const handleItemClick = useCallback(
    (path?: string) => {
      if (path) navigate(path);
    },
    [navigate]
  );

  const activePaths = useMemo(() => {
    const currentPath = location.pathname;
    return NAV_ITEMS.reduce<Record<string, boolean>>((acc, { key, path }) => {
      if (!path) return acc;
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;

      acc[key] =
        normalizedPath === '/'
          ? currentPath === '/'
          : currentPath.startsWith(normalizedPath);

      return acc;
    }, {});
  }, [location.pathname]);

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
          alt="Avatar"
        />
        <span className={styles['profile-name']}>Daniel</span>
      </header>

      <ul className={styles['nav']} role="menu">
        {NAV_ITEMS.map(({ key, icon, label, path }) => {
          const onClick = () => handleItemClick(path);

          return (
            <li key={key} role="none">
              <MenuItem
                icon={icon}
                label={label}
                active={!!activePaths[key]}
                expanded={expanded}
                onClick={onClick}
                className={styles['nav-item']}
              />
            </li>
          );
        })}
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
