import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import MyFAB from '../components/MyFAB'

describe('MyFab', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <MyFAB />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
