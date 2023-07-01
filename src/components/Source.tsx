import Block, { BlockProps } from './Block';
import styles from './Source.module.css';

interface SourceProps extends BlockProps {}

const Source = (props: SourceProps) => {
  return <Block additionalClassNames={[styles.source]} {...props} />;
};

export default Source;
