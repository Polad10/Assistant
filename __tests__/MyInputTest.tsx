import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import MyInput from '../components/MyInput'

describe('MyInput', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <MyInput />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
