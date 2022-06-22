import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addButton } from './Variant';
import { FiSearch } from 'react-icons/fi';
import { RiArrowUpDownFill } from 'react-icons/ri'
import { MdLightMode } from 'react-icons/md'

const Header = ({handleSetMode}) => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [sortby, setSortby] = useState('newest');
    const [showSearchInput, setShowSearchInput] = useState(false);
    const [showSort, setShowSort] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchInput}`);
        setSearchInput('');
    }

    const handleSearchPhone = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchInput}`);
        setSearchInput('');
        setShowSearchInput(false);
    }

    const handleInputValue = (e) => {
        setSortby(e.target.value);
        setShowSort(false)
        navigate(`/search?sortby=${sortby}`);
    };

  return (
    <div className='bg-gray-700 p-2 overflow-x-hidden dark:text-white'>
        <div className="max-w-6xl mx-auto px-2">
            <div className="hidden md:flex justify-between items-center">
                <div>
                    <p className='font-mono font-bold text-white'>MyDiary</p>
                </div>
                <form onSubmit={handleSearch} className="flex justify-end items-center">
                    <div className="flex justify-end items-center">
                        <input 
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            type="text" placeholder='Search...' className='rounded-sm px-2 py-1 border border-blue-500 focus:outline-blue-500 dark:bg-gray-800' />
                        <button type='submit' className='bg-white dark:bg-gray-800 p-2 border hover:border-blue-500 rounded-sm dark:text-white'><FiSearch/></button>
                    </div>
                    <div>
                        <select value={sortby} onChange={handleInputValue} name="time" id="time" className='ml-4 px-2 py-1 rounded-sm font-medium focus:outline-none duration-500 dark:bg-gray-800 dark:text-white'>
                            <option value="newest">Oldest First</option>
                            <option value="oldest">Newest First</option>
                        </select>
                    </div>
                    <motion.button 
                        variants={addButton}
                        whileHover="hover"
                        onClick={() => handleSetMode()}
                        type='button'
                        className='bg-white p-2 border hover:border-blue-500 rounded-sm ml-3 dark:bg-gray-800 dark:text-white'><MdLightMode/></motion.button>
                </form>
            </div>

            <div className="flex md:hidden justify-between items-center">
                <div>
                    <p className='font-mono font-bold text-white'>MyDiary</p>
                </div>
                <div>
                    <button onClick={() => setShowSearchInput(!showSearchInput)} className=' bg-white p-2 border hover:border-blue-500 rounded-sm dark:bg-gray-900'><FiSearch/></button>
                    <button onClick={() => setShowSort(!showSort)} className='bg-white p-2 border hover:border-blue-500 rounded-sm ml-3 dark:bg-gray-900'><RiArrowUpDownFill/></button>
                        <motion.button 
                        variants={addButton}
                        whileHover="hover"
                        onClick={() => handleSetMode()}
                        type='button'
                        className='bg-white p-2 border hover:border-blue-500 rounded-sm ml-3 dark:bg-gray-800'><MdLightMode/></motion.button>
                </div>
            </div>
            <form onSubmit={handleSearchPhone} className="flex justify-end items-center">
                { showSearchInput && 
                    <div className="duration-500 flex justify-end items-center absolute top-14 right-14 z-10">
                    
                        <input
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            type="text" placeholder='Search...' className='rounded-sm px-2 py-1 border border-blue-500 focus:outline-blue-500 dark:bg-gray-900' />
                        <button type='submit' className='bg-white p-2 border hover:border-blue-500 rounded-sm dark:bg-gray-900'><FiSearch/></button>
                    
                    </div>
                }
                
                {showSort &&
                    <div className='absolute top-14 right-16 '>
                        <select value={sortby} onChange={handleInputValue} name="time" id="time" className='ml-4 px-2 py-1 rounded-sm font-medium focus:outline-none duration-500 dark:bg-gray-900'>
                            <option value="newest">Oldest First</option>
                            <option value="oldest">Newest First</option>
                        </select>
                    </div>
                }    
            </form>
            
        </div>
    </div>
  )
}

export default Header