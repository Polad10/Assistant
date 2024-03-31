import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import PatientForm from '../components/PatientForm'

describe('PatientForm', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <PatientForm pageName='NewPatient' />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
