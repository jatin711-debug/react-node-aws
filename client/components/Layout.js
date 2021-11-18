import Head from 'next/head';
import Link from 'next/link';
import NProgress from 'nprogress';
import React from 'react';
import Router from 'next/router';
import 'nprogress/nprogress.css'
import {isAuth , logout} from '../helpers/auth'

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Layout = ({children}) =>{
    const head = () => (
        <React.Fragment>
            <link rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
                integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" 
                    crossOrigin="anonymous" />

            <link rel="stylesheet" href="/static/css/style.css" />
        </React.Fragment>
    )
    const nav = () => (
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link href="/">
                    <a className="nav-link text-light">Home</a>
                </Link>
            </li>

            <li className="nav-item">
                <Link href="/user/link/create">
                    <a className="nav-link text-light btn btn-primary">Submit A Link</a>
                </Link>
            </li>

            {!isAuth() && (
                <React.Fragment>
                    <li className="nav-item">
                        <Link href="/login">
                            <a className="nav-link text-light">Login</a>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/register">
                            <a className="nav-link text-light">Register</a>
                        </Link>
                    </li>
                </React.Fragment>
            )}

            {isAuth() && isAuth().role === 'admin' && (
                <li className="nav-item ml-auto">
                    <Link href="/admin">
                        <a className="nav-link text-light">{isAuth().name}</a>
                    </Link>
                </li>
            )}

            {isAuth() && isAuth().role === 'Subscriber' && (
                <li className="nav-item ml-auto">
                    <Link href="/user">
                        <a className="nav-link text-light">{isAuth().name}</a>
                    </Link>
                </li>
            )}

            {isAuth() && (
                <li className="nav-item">
                    <a onClick={logout} className="nav-link text-light">
                        Logout
                    </a>
                </li>
            )}
        </ul>
    );
    return <React.Fragment>{head()} {nav()} <div className="container pt-5 pb-5"> { children }</div></React.Fragment>;
}
export default Layout;