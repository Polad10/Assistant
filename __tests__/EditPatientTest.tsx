import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import EditPatient from '../components/EditPatient'

describe('EditPatient', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <EditPatient />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
