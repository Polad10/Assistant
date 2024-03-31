import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import MainView from '../components/MainView'

describe('MainView', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <MainView>
            <></>
          </MainView>
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
