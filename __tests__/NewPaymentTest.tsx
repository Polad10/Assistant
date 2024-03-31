import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import NewPayment from '../components/NewPayment'

describe('NewPayment', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <NewPayment />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
