import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import TreatmentItem from '../components/TreatmentItem'
import { mockModels } from '../__mocks__/MockModels'

describe('TreatmentItem', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <TreatmentItem pageName='Treatments' treatment={mockModels.treatment_1} />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
