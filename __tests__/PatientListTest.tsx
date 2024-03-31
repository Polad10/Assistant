import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import PatientList from '../components/PatientList'
import { mockModels } from '../__mocks__/MockModels'

describe('PatientList', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <PatientList pageName='Patients' patients={[mockModels.patient_1, mockModels.patient_2]} />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
