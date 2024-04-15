import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import ItemAction from '../components/ItemAction'

describe('ItemAction', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <ItemAction
            backgroundColor='red'
            iconName='checkmark-circle-outline'
            title='title'
            onPress={() => undefined}
          />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
