import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import EditTreatment from '../components/EditTreatment'

describe('EditTreatment', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <EditTreatment />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
