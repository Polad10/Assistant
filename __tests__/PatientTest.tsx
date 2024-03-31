import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import Patient from '../components/Patient'

describe('Patient', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <Patient />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
