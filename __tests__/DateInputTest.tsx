import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import DateInput from '../components/DateInput'

describe('DateInput', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <DateInput />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
