import {render} from '@testing-library/react';
import Home from './Home'
import '@testing-library/jest-dom'

let container
beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    const utils = render(<Home />)
    container = utils.container;
})

test ('Render Homepage test', () => {
    expect(container).toBeInTheDocument();
})