import { ReactNode } from 'react';
import styles from './BoardRow.module.css';

interface BoardRowProps {
  children: ReactNode;
}
const BoardRow = ({ children }: BoardRowProps) => {
  return <div className={styles.row}>{children}</div>;
};

export default BoardRow;
