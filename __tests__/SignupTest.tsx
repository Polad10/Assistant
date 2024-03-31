import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import Signup from '../components/Signup'

describe('Signup', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <Signup />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
