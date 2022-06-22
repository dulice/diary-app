import React, { Fragment, useState } from 'react'
import { AiFillPicture } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import axios from 'axios';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/solid';
import { motion } from 'framer-motion';
import { addButton, cardVariant } from './Variant';
import { AiOutlineClose } from 'react-icons/ai'

const moods = [
    {name: "Normal", emoji: "😃"},
    {name: "Happy", emoji: "😊"},
    {name: "In Love", emoji: "🥰"},
    {name: "Sad", emoji: "😔"},
    {name: "Angry", emoji: "😡"},
]

const WriteDiary = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');
    const [date, setDate] = useState(new Date());
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [selecteMood, setSelectedMood] = useState(moods[0]);

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImage(reader.result);
        }
    }

    const handleChangeImage = (e) => {
        const file = e.target.files[0];
        setFile(file);
        previewFile(file);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const {data} = await axios.post('/api/upload', {
                image: image
            });
            // console.log(data);
            try {
                await axios.post('/api/diaries', {
                    mood: selecteMood.emoji,
                    date,
                    title,
                    description,
                    image: data,
                });
                // console.log(data);
                setLoading(false);
                navigate('/'); 
            } catch (err) {
                setLoading(false);
                console.log(err.message);
            }   
            setLoading(false);                  
        } catch (err) {
            setLoading(false);
            console.log(err.message);
        }     
    }
  return (
    <div className='pt-5 dark:bg-gray-900 dark:text-white min-h-screen'>
        {loading 
        ? (
            <form className="max-w-6xl mx-auto px-2" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center py-2 mb-3">
                <Link to="/" className='ml-3 mt-2 text-2xl'>
                    <motion.button
                        variants={addButton}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                    ><AiOutlineClose/></motion.button>
                </Link>
                <div>
                    <button className="bg-blue-400 rounded-sm px-2 py-1 text-white">Saving...</button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div className='text-3xl'>
                    <Listbox disabled value={selecteMood} onChange={setSelectedMood}>
                        <div className="relative">
                            <Listbox.Button className="relative w-full rounded-sm">
                                <span className="block cursor-pointer">{selecteMood.emoji}</span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-200"
                                leaveFrom='opacity-100'
                                leaveTo='opacity-0'
                            >
                                <Listbox.Options className="absolute bg-slate-300 w-64 rounded-sm mt-3">
                                    <span className='font-medium text-lg pl-3 dark:bg-gray-600'>How do you feel today?</span>
                                    {moods.map((mood) => (
                                        <Listbox.Option
                                            key={mood.name}
                                            value={mood}
                                            className={({ active }) =>
                                                `relative select-none py-2 pl-3 cursor-pointer ${
                                                active ? 'bg-blue-500' : 'bg-slate-300 dark:bg-gray-600'
                                                }`
                                            }                                       
                                        >
                                            
                                        {({selecteMood}) => (
                                            <>
                                                <span className='cursor-pointer'>
                                                    {mood.emoji}
                                                </span>
                                                {selecteMood ? (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-500">
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ): null}
                                            </>
                                        )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
                <DatePicker disabled value={date} onChange={setDate} className="dark:text-white"/>
                
            </div>
            <div className='my-3'>
                <input 
                    disabled
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text" 
                    placeholder='Title' 
                    className='font-medium text-xl focus:outline-none block text-gray-600 dark:bg-gray-900 dark:text-gray-400'
                    required
                />

                <label htmlFor="image" className='text-3xl text-gray-500'><AiFillPicture/></label>
                <input disabled type="file" id="image" name="image" onChange={e => handleChangeImage(e)} className="hidden" />

                {file && <img src={image} alt="" className='my-4' />}
                <textarea 
                    disabled
                    required
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    rows="10" placeholder='Write more here...' className='text-gray-600 w-full my-4 focus:outline-none dark:bg-gray-900 dark:text-gray-400'></textarea>
            </div>
        </form>
        )
        : (
            
        <form className="max-w-6xl mx-auto px-2" onSubmit={handleSubmit}>
            <div className="flex justify-between items-center py-2 mb-3">
                <Link to="/" className='ml-3 mt-2 text-2xl'>
                    <motion.button
                        variants={addButton}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                    ><AiOutlineClose/></motion.button>
                </Link>
                
                <div>
                    <motion.button 
                        variants={addButton}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        type='submit' className="bg-blue-500 rounded-sm px-2 py-1 text-white">Save</motion.button>                   
                </div>
            </div>
            <motion.div
                variants={cardVariant}
                initial="hidden"
                animate="visible"
            >
                <div className="flex justify-between items-center">
                    <div className='text-3xl'>
                        <Listbox value={selecteMood} onChange={setSelectedMood}>
                            <div className="relative">
                                <Listbox.Button className="relative w-full rounded-sm">
                                    <span className="block cursor-pointer">{selecteMood.emoji}</span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-200"
                                    leaveFrom='opacity-100'
                                    leaveTo='opacity-0'
                                >
                                    <Listbox.Options className="absolute bg-slate-300 w-64 rounded-sm mt-3 dark:bg-gray-600">
                                        <span className='font-medium text-lg pl-3'>How do you feel today?</span>
                                        {moods.map((mood) => (
                                            <Listbox.Option
                                                key={mood.name}
                                                value={mood}
                                                className={({ active }) =>
                                                    `relative select-none py-2 pl-3 cursor-pointer ${
                                                    active ? 'bg-blue-500' : 'bg-slate-300 dark:bg-gray-600'
                                                    }`
                                                }                                       
                                            >
                                                
                                            {({selecteMood}) => (
                                                <>
                                                    <span className='cursor-pointer'>
                                                        {mood.emoji}
                                                    </span>
                                                    {selecteMood ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-500">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ): null}
                                                </>
                                            )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                    <DatePicker value={date} onChange={setDate} className="dark:text-white"/>
                    
                </div>
                <div className='my-3'>
                    <input 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text" 
                        placeholder='Title' 
                        className='font-medium text-xl focus:outline-none block dark:bg-gray-900'
                    />

                    <label htmlFor="image" className='text-3xl my-3'><AiFillPicture/></label>
                    <input type="file" id="image" name="image" onChange={e => handleChangeImage(e)} className="hidden" />

                    {file && <img src={image} alt="" className='my-4' />}
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                        rows="10" placeholder='Write more here...' className='w-full my-4 focus:outline-none dark:bg-gray-900'></textarea>
                </div>
            </motion.div>
        </form>
        )}
    </div>
  )
}

export default WriteDiary