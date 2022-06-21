import React from 'react'
import { Link } from 'react-router-dom'

const Diary = ({diary}) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  return (
        <Link to={`/diary/${diary._id}`} key={diary._id}>
            <div className="flex justify-between items-center">
                <div className='mb-3'>
                <span className='text-3xl text-blue-600 font-medium inline-block mr-1'>{new Date(diary.date).getDate()}</span>
                <span>{months[new Date(diary.date).getMonth()]}</span>
                </div>
                <div className='text-3xl'>{diary.mood}</div>
            </div>
            <div className="flex">
                <div>
                <img src={diary.image} alt="" className='h-24 w-24 rounded-md mr-5 object-cover' />
                </div>
                <div className="">
                <p className="text-3xl font-medium">{diary.title}</p>
                <p className='text-gray-600'>{diary.description}</p>
                </div>
            </div>
        </Link>
  )
}

export default Diary