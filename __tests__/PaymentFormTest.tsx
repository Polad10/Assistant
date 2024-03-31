import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import PaymentForm from '../components/PaymentForm'

describe('PaymentForm', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <PaymentForm pageName='NewPayment' />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
