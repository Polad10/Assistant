import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import StatusChip from '../components/StatusChip'

describe('StatusChip', () => {
  it('renders selected status chip correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <StatusChip color='red' pressable={true} selected={true} title='title' onPress={() => undefined} />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders unselected status chip correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <StatusChip color='red' pressable={true} selected={false} title='title' onPress={() => undefined} />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
