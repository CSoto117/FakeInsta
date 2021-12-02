import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Navbar';

const Layout = ({props}) => (
    <>
        <Navbar props={props} />
        <div>
            <Outlet />
        </div>
    </>
);

export default Layout;