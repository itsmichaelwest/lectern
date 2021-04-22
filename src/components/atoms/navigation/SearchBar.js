import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Design from '../../../Design'
import searchVideo from '../../../functions/searchVideo'

export default function SearchBar() { 
    const [query, setQuery] = useState('')
    let history = useHistory();

    function handleChange(event) {
        setQuery(event.target.value)
    }

    function handleSearch(event) {
        event.preventDefault()
        searchVideo(query, (res) => {
            setQuery('')
            history.push({
                pathname: '/search',
                search: `?find=${query}`,
                state: { 
                    query: query,
                    results: res
                }
            })
        })
    }

    return (
        <form
            className="flex-grow mr-2"
            onSubmit={handleSearch}>
            <input 
                type="text" 
                placeholder="Search videos and channels"
                value={query}
                onChange={handleChange}
                className={Design.Input + " w-full"} />
        </form>
    )
}