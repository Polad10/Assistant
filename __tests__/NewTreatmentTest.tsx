import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import NewTreatment from '../components/NewTreatment'

describe('NewTreatment', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <NewTreatment />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
