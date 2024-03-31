import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import AppointmentForm from '../components/AppointmentForm'

describe('AppointmentForm', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <AppointmentForm pageName='NewAppointment' />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
