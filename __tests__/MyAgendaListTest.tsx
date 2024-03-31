import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import MyAgendaList from '../components/MyAgendaList'
import { mockModels } from '../__mocks__/MockModels'

const sections = [
  { title: '2024-01-01', data: [mockModels.appointment_1] },
  { title: '2024-01-02', data: [mockModels.appointment_2] },
]

describe('MyAgendaList', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <MyAgendaList pageName='Appointments' sections={sections} />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
