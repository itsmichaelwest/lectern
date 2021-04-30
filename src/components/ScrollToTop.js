import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Small helper to scroll the page to the top on every navigation change,
// avoids being loaded into the middle of a page.
export default function ScrollToTop() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}