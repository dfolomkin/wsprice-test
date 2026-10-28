import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'

import { ERROR_LOCALE } from '../../shared/constants'
import { ScrollableBlock } from '../ScrollableBlock'

import styles from './Selectable.module.less'

interface SelectableListProps {
  data: string[]
  error: string
  onSelect: (v: string) => void
}

export const SelectableList: React.FC<SelectableListProps> = ({
  data,
  error,
  onSelect,
}) => (
  <>
    {data.length > 0 && (
      <ScrollableBlock height={200}>
        <ListGroup>
          {data.map((item) => (
            <ListGroup.Item
              className={styles.listItem}
              key={item}
              onClick={() => onSelect(item)}
            >
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </ScrollableBlock>
    )}
    {error && (
      <Alert variant="danger">
        {ERROR_LOCALE[error as keyof typeof ERROR_LOCALE] || error}
      </Alert>
    )}
  </>
)
