/* eslint-disable testing-library/no-node-access */
import {render, fireEvent,screen} from '@testing-library/react';
import MyProfile from "./MyProfile";
import '@testing-library/jest-dom'
import { findUser} from '../data/repository';
import { BrowserRouter as Router } from "react-router-dom"


let container;
let user;
beforeAll(() => {
    user = findUser('mbloger')
})

beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    const utils = render (
        <Router>
            <MyProfile />
        </Router>)
container = utils.container   
})

test('Profile display right information', () => {
    const first = container.getElementById('first')
    const last  = container.getElementById('last')
    expect(first).toContain(user.first_name)
    expect(last).toContain(user.last_name)

})