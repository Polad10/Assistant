import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import NewPatient from '../components/NewPatient'

describe('NewPatient', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <NewPatient />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
