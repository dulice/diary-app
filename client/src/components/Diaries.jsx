import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { BsFillPlusCircleFill} from 'react-icons/bs';
import { Link } from 'react-router-dom'
import Header from './header';
import { motion } from 'framer-motion';
import Diary from './Diary';
import { diariesButton, diariesCardVariant } from './Variant';

const Diaries = () => {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { data } = await axios.get('/api/diaries');
      setDiaries(data);
      setLoading(false);
    }
    fetchData();
  },[setLoading, setDiaries]);
  
  return (
    <div>
      <Header />
        <div className="max-w-6xl mx-auto px-2">
          <div className="">
            {loading ?<div>loading...</div>
            : (
              diaries.map((diary) => (
                <motion.div 
                  variants={diariesCardVariant}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  key={diary._id} className="h-44 w-full bg-gray-300 p-3 mt-3 rounded-sm">
                  <Diary diary={diary}/>
                </motion.div>
              ))
            )}
          </div>
          <Link to='/writediary'>
            <motion.button 
              variants={diariesButton}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileFocus="hover"
              className='fixed bottom-10 inset-x-1/2 translate-x-1/2'>
                <BsFillPlusCircleFill className='text-blue-500 text-5xl hover:text-blue-600 duration-500'/>
            </motion.button>
          </Link>
        </div>
    </div>
  )
}

export default Diaries