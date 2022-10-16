import {render, fireEvent,screen} from '@testing-library/react';
import Update from './Update'
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from "react-router-dom"


let container;

beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    const utils = render(
        <Router>
            <Update />
        </Router>)
    container = utils.container
})
//test to to weather email is text input is disabled, user cannot change it
test('Email input is disabled', () =>{
    // eslint-diszable-next-line testing-library/no-node-access
    
    const email = screen.getByLabelText('Email')
    expect(email).tobeDisabled();
})