import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import ItemActionDelete from '../components/ItemActions/ItemActionDelete'

describe('ItemActionDelete', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <ItemActionDelete onPress={() => undefined} />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
