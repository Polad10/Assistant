import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import Welcome from '../components/Welcome'

describe('Welcome', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <Welcome />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
