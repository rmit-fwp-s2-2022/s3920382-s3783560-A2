import {render, fireEvent,screen} from '@testing-library/react';
import Login from './Login'
import '@testing-library/jest-dom'

import { BrowserRouter as Router } from "react-router-dom"

let container;

beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    const utils = render(
        <Router>
            <Login />
        </Router>)
    container = utils.container
})

test('Input in login form functional', () => {


    // eslint-disable-next-line testing-library/no-node-access
    let form = container.querySelector('form')

    //grabbing label of login page
    const email = screen.getByLabelText('Email')
    const password = screen.getByLabelText('Password')

    // eslint-disable-next-line testing-library/no-node-access
    
    //input and inpute testing
    fireEvent.change(email,{target: {value:'qwe@rmit'}});
    fireEvent.change(password, {target: {value : '123456'}})
    expect(email.value).toBe('qwe@rmit')
    expect(password.value).toBe('123456')
})
