import React from 'react'
import renderer from 'react-test-renderer'
import CreateButton from '../components/CreateButton'
import MockProviders from '../__mocks__/MockProviders'

describe('CreateButton', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MockProviders>
          <CreateButton />
        </MockProviders>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })
})
