const { NavLink } = ReactRouterDOM
const { useEffect, useState } = React

import { userService } from '../services/user.service.js'
import { UserMsg } from './user-msg.jsx'
import { LoginSignup } from './login-signup.jsx'

export function AppHeader() {
    const [user, setUser] = useState(userService.getLoggedinUser())

    useEffect(() => {
        // component did mount when dependancy array is empty
    }, [])

    function onChangeLoginStatus(user) {
        setUser(user)
    }

    function onLogout(){
        userService.logout()
        .then(setUser(null))
    }

    return (
        <header>
            <UserMsg />
            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/bug">Bugs</NavLink> |
                <NavLink to="/about">About</NavLink> |
                <NavLink to="/user">User</NavLink>
            </nav>
            {user ? (
                < section >
                    <h2>Hello {user.fullname}</h2>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup onChangeLoginStatus={onChangeLoginStatus} />
                </section>
            )}
            <h1>Bugs are Forever</h1>
        </header>
    )
}
