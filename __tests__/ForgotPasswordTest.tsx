import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import ForgotPassword from '../components/ForgotPassword'

describe('ForgotPassword', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <ForgotPassword />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
