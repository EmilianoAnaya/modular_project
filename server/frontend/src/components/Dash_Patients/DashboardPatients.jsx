import { useState } from 'react'

import './DashboardPatients.css'
import Section from '../Section/Section'
import Separator from '../Separator/Separator'
import GridPatient from './GridPatient'
import AddPatient from './AddPatient'

function DashboardPatients(){
    const [currentPage, setCurrentPage] = useState("GridPatient")
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)

    const togglePage = () => {
        currentPage === "GridPatient" ? setCurrentPage("AddPatient") : setCurrentPage("GridPatient")
    }

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            alert('Please enter a search term')
            return
        }

        setIsSearching(true)
        try {
            const response = await fetch(`http://localhost:5000/api/patients/search?q=${encodeURIComponent(searchTerm.trim())}`)
            const data = await response.json()

            if (response.ok) {
                setSearchResults(data.patients)
                if (data.patients.length === 0) {
                    alert('No patients found')
                }
            } else {
                alert('Search failed: ' + data.error)
                setSearchResults([])
            }
        } catch (error) {
            console.error('Error searching patients:', error)
            alert('Unable to connect to server')
            setSearchResults([])
        } finally {
            setIsSearching(false)
        }
    }

    const handleSearchInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <>
            <Section headingText={"Search Patients"}>
                <div id='dash-search-container'>
                    <input
                        placeholder='Patient Name'
                        type='text'
                        id='dash-search-input'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={handleSearchInputKeyPress}
                    />
                    <button
                        className='basic-button'
                        onClick={handleSearch}
                        disabled={isSearching}
                    >
                        {isSearching ? 'Searching...' : 'Search'}
                    </button>
                    <button className='basic-button icon-button' onClick={() => togglePage()}>
                        <img src={`/assets/${currentPage === "GridPatient" ? "user-plus.svg" : "chevron-left.svg"}`} />
                    </button>
                </div>
            </Section>
            <Separator />
            {currentPage === "GridPatient" ? <GridPatient searchResults={searchResults} /> : <AddPatient />}
        </>
    )
}

export default DashboardPatients
