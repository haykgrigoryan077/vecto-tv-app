import React from 'react';

import cn from 'classnames';

import styles from './MenuItem.module.scss';

export interface MenuItemProps {
  icon: string;
  label: string;
  active?: boolean;
  expanded?: boolean;
  className?: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  label,
  active,
  expanded,
  className,
  onClick,
}) => {
  return (
    <button
      role="menuitem"
      className={cn(
        styles['menu-item'],
        expanded && styles['is-expanded'],
        active && styles['is-active'],
        className
      )}
      aria-current={active ? 'page' : undefined}
      onClick={onClick}
    >
      <span
        className={cn(
          styles['icon-wrap'],
          active && !expanded && styles['icon-wrap--active']
        )}
      >
        <img src={icon} alt="" className={styles['icon']} />
      </span>
      <span className={styles['label']}>{label}</span>
    </button>
  );
};

export default MenuItem;
