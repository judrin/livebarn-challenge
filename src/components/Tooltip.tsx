import { ReactNode } from 'react';
import styles from './Tooltip.module.css';

interface ToolipProps {
  message: string;
  disabled?: boolean;
  children: ReactNode;
}

const Tooltip = ({ message, disabled = false, children }: ToolipProps) => {
  const classNames = [styles.tooltip];

  if (disabled) {
    classNames.push(styles.disabled);
  }

  return (
    <div className={styles.container}>
      {children}
      <div className={classNames.join(' ')}>{message}</div>
    </div>
  );
};

export default Tooltip;
