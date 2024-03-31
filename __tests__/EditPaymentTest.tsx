import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import EditPayment from '../components/EditPayment'

describe('EditPayment', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <EditPayment />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
