import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineArrowLeft, AiOutlineEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { addButton, cardVariant } from './Variant';
import { toast } from 'react-toastify';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const SingleDiary = () => {
  const navigate = useNavigate();
    const [diary, setDiary] = useState({});
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [edit, setEdit] = useState(false);
    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const { data } = await axios.get(`/api/diaries/${id}`);
            setDiary(data);
            setTitle(data.title);
            setDescription(data.description);
            setLoading(false);
        }
        fetchData();
    },[id, setDiary, setTitle, setDescription]);

    const handleEdit = async () => {
      setLoading(true);
      try {
        await axios.put(`/api/diaries/${id}`, {
          title,
          description,
        });
        setEdit(false);
        toast.success("Update Successfully.");
        setLoading(false);
      } catch (err) {
        toast.error("Can not update the diary.");
      }
    }

    const handleDelete = async () => {
      if(window.confirm("Are you sure you want to delete the diary?")) {
        try {
          await axios.delete(`/api/diaries/${id}`);
          toast.success("Delete Successfully.");
          setTimeout(() => {
            navigate('/')
          }, 1000);
        } catch (err) {
          toast.error("Can't delete the Diary.")
        }
      }
    };

  return (
    <div className='dark:bg-gray-900 dark:text-white min-h-screen'>
      <div className='max-w-6xl mx-auto px-2 '>
          <div className="flex justify-between items-center pt-5">
              <Link to="/" className='ml-3 mt-2 text-2xl'>
                  <motion.button
                      variants={addButton}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                  ><AiOutlineArrowLeft/></motion.button>
              </Link>
              <div className="">
                  <motion.button
                      variants={addButton}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      onClick={() => setEdit(true)}
                  ><AiOutlineEdit className='mr-5 -mb-1 text-2xl text-blue-600'/></motion.button>
                  <motion.button
                      variants={addButton}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      onClick={handleDelete}
                  ><BsFillTrashFill className='text-xl text-red-600'/></motion.button>
              </div>
          </div>
          {   loading ? <div>Loading...</div>
              :
              <motion.div
                  variants={cardVariant}
                  initial="hidden"
                  animate="visible"
                  className="max-w-6xl px-2 mx-auto py-5">
                  <div className="flex justify-between items-center">
                      <div className='mb-3'>
                          <span className='text-3xl text-blue-600 font-medium inline-block mr-1'>{new Date(diary.date).getDate()}</span>
                          <span>{months[new Date(diary.date).getMonth()]}</span>
                      </div>
                      <div className='text-3xl flex items-center'>
                          <span>{diary.mood}</span>
                          
                      </div>
                  </div>
                  {edit ? (
                    
                      <input 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text" 
                        placeholder='Title' 
                        className='mb-3 font-medium text-xl focus:outline-none block dark:bg-gray-900'
                        required
                        autoFocus
                      />
                      ) : <p className="text-3xl font-medium mb-3">{title}</p>
                  }
                  <img src={diary.image} alt="" />
                  {edit ?
                    <div>
                      <textarea 
                        required
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        rows="10" placeholder='Write more here...' className='text-gray-600 w-full my-4 focus:outline-none dark:bg-gray-900 dark:text-gray-300'></textarea>

                      <div className='flex justify-end'>
                        {loading ? <button className='bg-blue-500 mb-5 rounded-sm px-2 py-1 text-white'>Updating</button>
                        :
                        <motion.button 
                          variants={addButton}
                          initial="hidden"
                          animate="visible"
                          whileHover="hover"
                          onClick={handleEdit}
                          type='submit' className="bg-blue-500 mb-5 rounded-sm px-2 py-1 text-white">Update</motion.button> 
                        }
                      </div>
                    </div>
                    : <p className='text-gray-600 my-3 dark:text-gray-300'>{description}</p>
                  }                
              </motion.div>
          }
      </div>
    </div>
  )
}

export default SingleDiary