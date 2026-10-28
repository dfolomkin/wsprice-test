import Alert from 'react-bootstrap/Alert'
import Table from 'react-bootstrap/Table'

import { Good } from '../shared/types'
import { ERROR_LOCALE } from '../shared/constants'
import { ScrollableBlock } from './ScrollableBlock'

interface DataTableProps {
  data: Good[]
  error: string
}

export const DataTable: React.FC<DataTableProps> = ({ data, error }) => (
  <>
    {data.length > 0 && (
      <ScrollableBlock height={500}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: '50%' }}>Название</th>
              <th style={{ width: '30%' }}>Производитель</th>
              <th style={{ width: '10%' }}>Стоимость</th>
              <th style={{ width: '10%' }}>Остаток</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ name, brand, price, count }) => (
              <tr key={name}>
                <td>{name}</td>
                <td>{brand}</td>
                <td>{price}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollableBlock>
    )}
    {error && (
      <Alert variant="danger">
        {ERROR_LOCALE[error as keyof typeof ERROR_LOCALE] || error}
      </Alert>
    )}
  </>
)
