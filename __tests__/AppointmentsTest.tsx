import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import Appointments from '../components/Appointments'

describe('Appointments', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <Appointments />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
