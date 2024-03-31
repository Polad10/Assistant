import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import PatientItem from '../components/PatientItem'
import { mockModels } from '../__mocks__/MockModels'

describe('PatientItem', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <PatientItem pageName='Patients' patient={mockModels.patient_1} />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
