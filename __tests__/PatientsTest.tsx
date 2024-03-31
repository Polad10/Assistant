import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import Patients from '../components/Patients'

describe('Patients', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <Patients />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
