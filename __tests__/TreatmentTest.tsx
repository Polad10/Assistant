import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import Treatment from '../components/Treatment'

describe('Treatment', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <Treatment />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
