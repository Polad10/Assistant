import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import PaymentList from '../components/PaymentList'
import { mockModels } from '../__mocks__/MockModels'

describe('PaymentList', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <PaymentList pageName='Patient' payments={[mockModels.payment_1, mockModels.payment_2]} />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
