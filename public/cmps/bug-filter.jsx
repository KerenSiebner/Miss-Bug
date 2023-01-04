const { useState, useEffect } = React

import { bugService } from "../services/bug.service.js"

export function BugFilter({ onSetFilter }) {
    const [filterBugs, setfilterBugs] = useState(bugService.getDefaultFilter())

    useEffect(() => {
        // update father cmp that filters change very type
        setfilterBugs(filterBugs)
    }, [filterBugs])
    
    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setfilterBugs((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterBugs)
    }

    return <div>

        <form onSubmit={onSubmitFilter}>
            <label htmlFor="title">title:</label>
            <input type="text"
                id="title"
                name="title"
                placeholder="By title"
                value={filterBugs.title}
                onChange={handleChange}
            />
            <label htmlFor="minSeverity">Min severity:</label>
            <input type="range"
                id="minSeverity"
                name="minSeverity"
                min="0"
                max="10"
                value={filterBugs.minSeverity}
                onChange={handleChange}
            />
            <label htmlFor="pageIdx">Page:</label>
            <input type="number"
                id="pageIdx"
                name="pageIdx"
                placeholder="0"
                value={filterBugs.pageIdx}
                onChange={handleChange}
            />
            <button>Filter</button>
        </form>
    </div>
}