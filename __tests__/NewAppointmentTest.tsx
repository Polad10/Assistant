import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import NewAppointment from '../components/NewAppointment'

describe('NewAppointment', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <NewAppointment />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
