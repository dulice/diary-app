import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import Header from '../components/header';
import Diary from '../components/Diary';
import { diariesCardVariant } from '../components/Variant';
import PlusBtn from '../components/PlusBtn';

const SearchResult = ({handleSetMode}) => {
    const {search} = useLocation();
    let searchInput = new URLSearchParams(search).get('q');
    const sortby = new URLSearchParams(search).get('sortby');
    // console.log(sortby);
    const [diaries, setDiaries] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const { data } = await axios.get(`/api/diaries/search?q=${searchInput}&sortby=${sortby}`);   
            setDiaries(data);
            setLoading(false);
          } catch (err) {
            console.log(err.message);
          }
        }
        fetchData();
    },[searchInput, sortby]);
  
  searchInput = new RegExp(searchInput, 'i');
  const searchQuery = diaries?.filter(diary => searchInput.test(diary.title) || searchInput.test(diary.description));

  return (
    <div className='dark:bg-gray-900 dark:text-white min-h-screen'>
      <Header handleSetMode={handleSetMode}/>
        <div className="max-w-6xl mx-auto px-2 ">
          <div className="">
            {loading ?<div>loading...</div>
            : (
              searchQuery.length !== 0
              ? (
                searchQuery.map((diary) => (
                  <motion.div 
                    variants={diariesCardVariant}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    key={diary._id} className="h-44 w-full bg-gray-300 p-3 mt-3 rounded-sm dark:bg-gray-800">
                    <Diary diary={diary}/>
                  </motion.div>
                ))
              ) : (
                <div className='bg-red-400 p-4 mt-4'>
                    No results found. <Link to="/" className='underline'>Go to homepage</Link>
                </div>
              )
            )}
          </div>
          <PlusBtn />
        </div>
    </div>
  )
}

export default SearchResult