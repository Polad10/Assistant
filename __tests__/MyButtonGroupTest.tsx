import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import MyButtonGroup from '../components/MyButtonGroup'

describe('MyButtonGroup', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <MyButtonGroup />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
