import {render, fireEvent,screen} from '@testing-library/react';
import Register from './Register'
import '@testing-library/jest-dom'
import { createUser } from '../data/repository';
import { BrowserRouter as Router } from "react-router-dom"


let container;

beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    const utils = render(
        <Router>
            <Register />
        </Router>)
    container = utils.container
})
//testing to see if inputs fields are wokring when someone registers
test('checking of input input fields', async() => {
    // eslint-disable-next-line testing-library/no-node-access
    let form = container.querySelector('form')
    const email = screen.getByLabelText('Email')
    const password = screen.getByLabelText('Password must be at least 6 characters')
    const confirm = screen.getByLabelText('Confirm password')
    const first = screen.getByLabelText('First name')
    const last = screen.getByLabelText('Last name')
    const button = screen.getByDisplayValue('Register')

    fireEvent.change(email,{target: {value: 'qwe@rmit'}});
    fireEvent.change(password, {target: {value : '123456'}});
    fireEvent.change(first, {target: {value: 'Ricky'}});
    fireEvent.change(last, {target: {value: 'Truong'}})
    fireEvent.change(confirm, {target: {value: '123456'}})

    expect(email.value).toBe('qwe@rmit')
    expect(password.value).toBe('123456')
    expect(confirm.value).toBe('123456')
    expect(first.value).toBe('Ricky')
    expect(last.value).toBe('Truong')
    fireEvent.click(button)
})
