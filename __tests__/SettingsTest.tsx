import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import Settings from '../components/Settings'

describe('Settings', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <Settings />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
