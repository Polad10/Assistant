import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import TouchableInput from '../components/TouchableInput'

describe('TouchableInput', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <TouchableInput onPress={() => {}} />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
