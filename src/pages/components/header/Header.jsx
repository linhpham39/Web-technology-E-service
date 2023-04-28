import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendar, faCalendarDays, faCar, faMountainSun, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range'
import "./header.css"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import format from 'date-fns/format'

function Header() {
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })

    return (
        <div className='header'>
            <div className="headerContainer">
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faMountainSun} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>
                <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
                <p className="headerDesc">Get reward for your travels- unlock instant savings of 10% or more with a free LinkBooking</p>
                <button className="headerBtn">Sign in / Register</button>
                <div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendar} className='headerIcon' />
                        <input
                            type="text"
                            placeholder='Where are you going?'
                            className='headerSearchInput' />
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                        <span
                            onClick={() => setOpenDate(!openDate)}
                            className="headerSearchText">
                            {`${format(date[0].startDate, "MM/dd/yyyy")} to 
                            ${format(date[0].endDate, "MM/dd/yyyy")}`}
                        </span>
                        {openDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className='date'
                        />}
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                        <span className="headerSearchText">
                            {`${options.adult} Adult, ${options.children} Children, ${options.room} Room`}
                        </span>
                        <div className="options">
                            <div className="optionItem">
                                <span className="optionText">Adult</span>
                                <button className="optionCounterButtun">-</button>
                                <span className="optionCounterNumber">1</span>
                                <button className="optionCounterButton">+</button>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Children</span>
                                <button className="optionCounterButtun">-</button>
                                <span className="optionCounterNumber">0</span>
                                <button className="optionCounterButton">+</button>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Room</span>
                                <button className="optionCounterButtun">-</button>
                                <span className="optionCounterNumber">1</span>
                                <button className="optionCounterButton">+</button>
                            </div>
                        </div>
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerBtn">Search</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header