import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import TreatmentList from '../components/TreatmentList'
import { mockModels } from '../__mocks__/MockModels'

describe('TreatmentList', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <TreatmentList pageName='Treatments' treatments={[mockModels.treatment_1, mockModels.treatment_2]} />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
