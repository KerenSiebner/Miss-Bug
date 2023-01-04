const { Link } = ReactRouterDOM

import { BugPreview } from "./bug-preview.jsx"
import { userService } from "../services/user.service.js"

export function BugList({ bugs, onRemoveBug, onEditBug }) {
    let user = userService.getLoggedinUser()


    return <ul className="bug-list">
        {bugs.map(bug =>
            <li className="bug-preview" key={bug._id}>
                <BugPreview bug={bug} />
                {bug.creator._id === user._id || user.username ==='admin' &&
                    <div>
                        <button onClick={() => { onRemoveBug(bug._id) }}>x</button>
                        <button onClick={() => { onEditBug(bug) }}>Edit</button>
                    </div>}
                <Link to={`/bug/${bug._id}`}>Details</Link>

            </li>)}
    </ul>
}