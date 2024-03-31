import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import MySearchBar from '../components/MySearchBar'

describe('MySearchBar', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <MySearchBar placeholder='placeholder' searchEventName='searchEventName' />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
