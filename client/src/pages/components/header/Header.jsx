import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faCalendar, faCalendarDays, faCar, faCreditCard, faHouse, faMountainSun, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons'
import { DateRange } from 'react-date-range'
import "./header.css"
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import format from 'date-fns/format'
import {useNavigate} from 'react-router-dom'

function Header({type}) {
    const [destination, setDestination] = useState(""); 
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    /*Biến openOptions để mở và đóng phần chọn số người và phòng(hiện thị vs ẩn)
    The setOpenOptions function is used to open and close the number of people and rooms selection section
    The options variable is used to initialize the number of people and rooms selected
    the setOptions function is used to update the number of people and rooms selected
     */
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1
    })

    const navigate = useNavigate()// chuyển hướng người dùng đến bất kì component nào trên bất kì page nào

    // Hàm handleOption để thay đổi số người và phòng khi click vào nút + và -
    //setOptions là hàm để cập nhật lại số người và phòng nhận 1 tham số là 1 object prev là giá trị trước đó
    //..prev là giữ các giá trị của object trước đó, thay đổi giá trị của "name" bằng cách thực hiện phép toán "operation"
    const handleOption = (name, operation) =>{
        setOptions((prev) => {
            if(prev[name] === 0 && operation === "d") return prev;
            return{
                ...prev,
                [name]: operation === "i" ? prev[name] + 1 : prev[name] - 1
            }
        })
    }

    
    //Hàm handleSearch để lấy thông tin khi người dùng tìm kiếm chuyển đến trang /hotels
    
    const handleSearch = ()=>{
        navigate("/hotels", {state:{ destination, date, options}}) // gửi destination, date, options đến trang hotels
    }

    return (
        <div className='header'>
            <div className={type == 'list' ? 'headerContainer listMode' : 'headerContainer'}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faHouse} />
                        <span>Home</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <span>Booking</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCreditCard} />
                        <span>Payment</span>
                    </div>
                </div>
                {type!== "list" && 
                <>      {/* JSX fragment */}
                <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1><p className="headerDesc">Get reward for your travels- unlock instant savings of 10% or more with a free GTwelveBooking</p><button className="headerBtn">Sign in / Register</button><div className="headerSearch">
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendar} className='headerIcon' />
                        <input
                            type="text"
                            placeholder='Where are you going?'
                            className='headerSearchInput'
                            onChange={e=>setDestination(e.target.value)}
                            />
                            
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faCalendarDays} className='headerIcon' />
                        <span
                            onClick={() => setOpenDate(!openDate)}
                            className="headerSearchText">
                            {`${format(date[0].startDate, "MM/dd/yyyy")} to 
                            ${format(date[0].endDate, "MM/dd/yyyy")}`}
                        </span>
                        {openDate && (
                        <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className='date' 
                            minDate={new Date()} //không thể chọn ngày cũ hơn hôm nay
                        />
                        )}
                    </div>
                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className='headerIcon' />
                        <span
                            onClick={() => setOpenOptions(!openOptions)}
                            className="headerSearchText">
                            {`${options.adult} Adult, ${options.children} Children, ${options.room} Room`}
                        </span>
                        {openOptions && <div className="options">
                            <div className="optionItem">
                                <span className="optionText">Adult</span>
                                <div className="optionCounter">
                                    <button
                                        disabled={options.adult === 0}
                                        className="optionCounterButton" onClick={() => handleOption("adult", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.adult}</span>
                                    <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Children</span>
                                <div className="optionCounter">
                                    <button
                                        disabled={options.children === 0}
                                        className="optionCounterButton" onClick={() => handleOption("children", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.children}</span>
                                    <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Room</span>
                                <div className="optionCounter">
                                    <button
                                        disabled={options.room === 0}
                                        className="optionCounterButton" onClick={() => handleOption("room", "d")}>-</button>
                                    <span className="optionCounterNumber">{options.room}</span>
                                    <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                                </div>
                            </div>
                        </div>}
                    </div>
                    <div className="headerSearchItem">
                        <button className="headerBtn" onClick={handleSearch}>Search</button>
                    </div>
                </div></>}
            </div>
        </div>
    )
}

export default Header