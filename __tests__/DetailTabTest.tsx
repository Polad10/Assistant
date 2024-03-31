import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import DetailTab from '../components/DetailTab'

describe('DetailTab', () => {
  it('renders selected tab correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <DetailTab name='calendar' type='feather' index={0} selectedIndex={0} />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('renders NOT selected tab correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <DetailTab name='cash-outline' type='ionicon' index={1} selectedIndex={0} />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
