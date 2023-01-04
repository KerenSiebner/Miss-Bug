const { useState, useEffect } = React
const { Link, useParams } = ReactRouterDOM

import { userService } from '../services/user.service.js'
import { bugService } from '../services/bug.service.js'

export function UserDetails() {

    const [userBugs, setUserBugs] = useState([])
    // useEffect(() => {
    //     getUserBugs()
    // }, [])

    let user = userService.getLoggedinUser()

    function getUserBugs() {
        bugService.getByCreator(user._id).then(bugs => {
            setUserBugs(bugs)
        })
        // console.log('bugs', bugs)
    }

    if (!user) return <h1>loadings....</h1>
    return user && <div>
        <h2>User Details </h2>
        <h3>Welcome <span>{user.fullname}</span>!</h3>
        <p>Username:<span>{user.username}</span></p>
        <p>Password:<span>{user.password}</span></p>
        <p>ID: <span>{user._id}</span></p>
        <Link to="/bug">Back to List</Link>
        <ul className="bug-list">
            <button onClick={getUserBugs}>Users bugs</button>
            {userBugs.map(bug =>
                <li className="bug-preview" key={bug._id}>
                    <p>{bug.title}</p>
                    {/* <BugPreview bug={bug} /> */}
                    {/* <div>
                        <button onClick={() => { onRemoveBug(bug._id) }}>x</button>
                        <button onClick={() => { onEditBug(bug) }}>Edit</button>
                    </div> */}
                    {/* <Link to={`/bug/${bug._id}`}>Details</Link> */}

                </li>)}
        </ul>
    </div>

}

