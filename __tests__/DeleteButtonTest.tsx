import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import DeleteButton from '../components/DeleteButton'

describe('DeleteButton', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <DeleteButton />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
