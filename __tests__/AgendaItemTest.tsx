import renderer from 'react-test-renderer'
import AgendaItem from '../components/AgendaItem'
import { mockModels } from '../__mocks__/MockModels'
import MockProviders from '../__mocks__/MockProviders'

describe('AgendaItem', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <AgendaItem appointment={mockModels.appointment_1} />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
