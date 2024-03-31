import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import Login from '../components/Login'

describe('Login', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <Login />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
