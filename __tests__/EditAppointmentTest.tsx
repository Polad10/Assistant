import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import EditAppointment from '../components/EditAppointment'

describe('EditAppointment', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <EditAppointment />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
