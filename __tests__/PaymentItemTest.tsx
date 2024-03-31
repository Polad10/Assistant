import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import PaymentItem from '../components/PaymentItem'
import { mockModels } from '../__mocks__/MockModels'

describe('PaymentItem', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <PaymentItem pageName='Patient' payment={mockModels.payment_1} />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
