import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import TreatmentForm from '../components/TreatmentForm'

describe('TreatmentForm', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <TreatmentForm pageName='NewTreatment' />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
