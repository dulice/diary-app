import React from 'react'
import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [searchInput, setSearchInput] = useState('');
    const [sortby, setSortby] = useState('newest');

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchInput}`);
        setSearchInput('');
    }

    const handleInputValue = (e) => {
        setSortby(e.target.value);
        navigate(`/search?sortby=${sortby}`);
    }
  return (
    <div className='bg-gray-700 p-2'>
        <div className="max-w-6xl mx-auto px-2">
            <div className="flex justify-between items-center">
                <div>
                    <p className='font-mono font-bold text-white'>MyDiary</p>
                </div>
                <form onSubmit={handleSearch} className="flex justify-end items-center">
                    <div className="flex justify-end items-center">
                        <input 
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            type="text" placeholder='Search...' className='rounded-sm px-2 py-1 border border-blue-500 focus:outline-blue-500' />
                        <button type='submit' className='bg-white p-2 border hover:border-blue-500 rounded-sm'><FiSearch/></button>
                    </div>
                    <div>
                        <select value={sortby} onChange={handleInputValue} name="time" id="time" className='ml-4 px-2 py-1 rounded-sm font-medium focus:outline-none duration-500'>
                            <option value="newest">Oldest First</option>
                            <option value="oldest">Newest First</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Header