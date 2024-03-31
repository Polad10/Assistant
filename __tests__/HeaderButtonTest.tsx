import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import HeaderButton from '../components/HeaderButton'

describe('HeaderButton', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <HeaderButton title='Title' />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
