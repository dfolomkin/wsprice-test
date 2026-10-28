import styles from './ScrollableBlock.module.less'

interface ScrollableBlockProps {
  children: React.ReactNode
  height?: number
}

export const ScrollableBlock: React.FC<ScrollableBlockProps> = ({
  children,
  height = 300,
}) => (
  <div className={styles.outer}>
    <div className={styles.inner} style={{ maxHeight: `${height}px` }}>
      {children}
    </div>
  </div>
)
