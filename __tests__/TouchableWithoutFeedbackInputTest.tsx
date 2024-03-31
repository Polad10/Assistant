import renderer from 'react-test-renderer'
import MockProviders from '../__mocks__/MockProviders'
import TouchableWithoutFeedbackInput from '../components/TouchableWithoutFeedbackInput'

describe('TouchableWithoutFeedbackInput', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <TouchableWithoutFeedbackInput />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
