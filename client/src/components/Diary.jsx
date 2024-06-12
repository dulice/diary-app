import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Diary = ({diary}) => {
  return (
        <Link to={`/diary/${diary._id}`} key={diary._id}>
            <div className="flex justify-between items-center">
                <div className='mb-3'>
                <span className='text-3xl text-blue-600 font-medium inline-block mr-1'>{moment(diary.date).format('Do')}</span>
                <span className='text-black dark:text-white'>{moment(diary.date).format('MMMM')}</span>
                </div>
                <div className='text-3xl'>{diary.mood}</div>
            </div>
            <div className="flex">
                {diary.image?.photo && <img src={diary.image?.photo} alt="" className='h-24 w-24 rounded-md mr-5 object-cover' />}
                <div className="">
                <p className="text-3xl font-medium text-black dark:text-white">{diary.title}</p>
                <div className='description' dangerouslySetInnerHTML={{__html: diary.description}}></div>
                </div>
            </div>
        </Link>
  )
}

export default Diary