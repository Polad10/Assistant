import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import TreatmentInfo from '../components/TreatmentInfo'
import { mockModels } from '../__mocks__/MockModels'

describe('TreatmentInfo', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <TreatmentInfo treatment={mockModels.treatment_1} />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
