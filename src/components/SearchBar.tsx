import debounce from 'lodash/debounce'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'

interface SearchBarProps {
  onChange: (v: string) => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {
  const debouncedChange = debounce(onChange, 1000)

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <InputGroup>
        <InputGroup.Text>Поиск</InputGroup.Text>
        <FormControl
          type="search"
          placeholder="Введите номер детали"
          aria-label="Поиск"
          onChange={(e) => debouncedChange(e.target.value)}
        />
      </InputGroup>
    </Form>
  )
}
