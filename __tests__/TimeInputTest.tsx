import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import TimeInput from '../components/TimeInput'

describe('TimeInput', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <TimeInput />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
