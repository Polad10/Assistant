import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import Treatments from '../components/Treatments'

describe('Treatments', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <Treatments />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
