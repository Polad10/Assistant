import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import MyKeyboardAvoidingView from '../components/MyKeyboardAvoidingView'

describe('MyKeyboardAvoidingView', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <MyKeyboardAvoidingView />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
