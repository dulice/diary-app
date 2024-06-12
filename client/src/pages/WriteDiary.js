import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-date-picker";
import axios from "axios";
import { motion } from "framer-motion";
import { addButton, cardVariant } from "../components/Variant";
import Mood from "../components/Mood";
import { moods } from "../data";
import ReactQuill from "react-quill";

const WriteDiary = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [selecteMood, setSelectedMood] = useState(moods[0]);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      try {
        if (image) {
          const { data } = await axios.post("/api/upload", {
            image: image,
          });
          // console.log(data);
          await axios.post("/api/diaries", {
            mood: selecteMood.emoji,
            date,
            title,
            description,
            image: {
              photo: data.photo,
              public_id: data.public_id,
            },
          });
        } else {
          await axios.post("/api/diaries", {
            mood: selecteMood.emoji,
            date,
            title,
            description,
          });
        }
        setLoading(false);
        navigate("/");
      } catch (err) {
        setLoading(false);
        console.log(err.message);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err.message);
    }
  };
  return (
    <div className="pt-5 dark:bg-gray-900 dark:text-white min-h-screen">
      <form className="max-w-6xl mx-auto px-2" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center py-2 mb-3">
          <Link to="/" className="ml-3 mt-2 text-2xl">
            <motion.button
              variants={addButton}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <AiOutlineClose />
            </motion.button>
          </Link>

          <div>
            <motion.button
              variants={addButton}
              initial="hidden"
              animate="visible"
              whileHover={loading ? "" : "hover"}
              type="submit"
              className="bg-blue-500 rounded-sm px-2 py-1 text-white"
            >
              {loading ? "Saving..." : "Save"}
            </motion.button>
          </div>
        </div>
        <motion.div variants={cardVariant} initial="hidden" animate="visible">
          <div className="flex justify-between items-center">
            <Mood
              loading={loading}
              selecteMood={selecteMood}
              setSelectedMood={setSelectedMood}
            />
            <DatePicker value={date} onChange={setDate} disabled={loading} />
          </div>
          <div className="my-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={loading}
              required
              type="text"
              placeholder="Title"
              className="rounded-sm px-2 py-1 border border-gray-300 focus:outline-gray-400 dark:bg-gray-800 w-full my-2"
            />

            <label htmlFor="image" className="text-3xl my-3">
              <MdOutlineAddPhotoAlternate />
            </label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={(e) => handleChangeImage(e)}
              disabled={loading}
              className="hidden"
            />

            {file && <img src={image} alt="" className="my-4" />}
            <ReactQuill
              value={description}
              onChange={setDescription}
              className="h-40 mt-4"
            />
          </div>
        </motion.div>
      </form>
    </div>
  );
};

export default WriteDiary;
