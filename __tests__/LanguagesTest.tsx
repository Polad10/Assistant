import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import Languages from '../components/Languages'

describe('Languages', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <Languages />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
