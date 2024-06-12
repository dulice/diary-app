import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { AiOutlineArrowLeft, AiOutlineEdit, AiOutlineClose } from "react-icons/ai";
import { MdDelete, MdOutlineAddPhotoAlternate } from "react-icons/md";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DatePicker from "react-date-picker";
import { motion } from "framer-motion";
import { addButton, diariesCardVariant } from "../components/Variant";
import Mood from "../components/Mood";
import { moods } from "../data";
import moment from "moment";

const SingleDiary = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [diary, setDiary] = useState({});
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selecteMood, setSelectedMood] = useState(moods[0]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { data } = await axios.get(`/api/diaries/${id}`);
      setDiary(data);
      setImage(data.image?.photo);
      setDate(data.date);
      setDescription(data.description);
      // console.log(data);
      setLoading(false);
      setEdit(false);
    };
    fetchData();
  }, [id, updated]);

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

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (diary.image.photo !== image) {
        await axios.put(`/api/upload/`, { public_id: diary.image.public_id });
        const { data } = await axios.post("/api/upload", {
          image: image,
        });
        await axios.put(`/api/diaries/${id}`, {
          image: {
            photo: data.photo,
            public_id: data.public_id,
          },
          title: diary.title,
          description: description,
          mood: selecteMood.emoji,
          date: date,
        });
      } else {
        await axios.put(`/api/diaries/${id}`, {
          title: diary.title,
          description: description,
          mood: selecteMood.emoji,
          date: date,
        });
      }
      setEdit(false);
      setUpdated(true)
      toast.success("Update Successfully.");
      setLoading(false);
    } catch (err) {
      toast.error("Can not update the diary.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDiary((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete the diary?")) {
      try {
        await axios.delete(`/api/diaries/${id}`);
        toast.success("Delete Successfully.");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } catch (err) {
        toast.error("Can't delete the Diary.");
      }
    }
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen">
      <div className="max-w-6xl mx-auto px-2 ">
        {edit ? (
          <motion.form
            variants={diariesCardVariant}
            initial="hidden"
            animate="visible"
            onSubmit={handleEdit}
          >
            <div className="flex justify-between items-center py-2 mb-3">
              <div className="ml-3 mt-2 text-2xl">
                <motion.button
                  onClick={() => setEdit(false)}
                  variants={addButton}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <AiOutlineClose />
                </motion.button>
              </div>

              <div>
                <motion.button
                  variants={addButton}
                  initial="hidden"
                  animate="visible"
                  whileHover={loading ? "" : "hover"}
                  type="submit"
                  className="bg-blue-500 rounded-sm px-2 py-1 text-white"
                >
                  {loading ? "Updating..." : "Update"}
                </motion.button>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <Mood
                  loading={loading}
                  selecteMood={selecteMood}
                  setSelectedMood={setSelectedMood}
                />
                <DatePicker
                  value={date}
                  onChange={setDate}
                  disabled={loading}
                  className="dark:text-white"
                />
              </div>
              <div className="py-3">
                <input
                  value={diary.title}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  type="text"
                  name="title"
                  placeholder="Title"
                  className="rounded-sm px-2 py-1 border border-gray-300 focus:outline-gray-400 dark:bg-gray-800 w-full my-2"
                />

                <label htmlFor="image" className="text-3xl my-3">
                  <MdOutlineAddPhotoAlternate />
                  <img
                    src={file ? image : diary.image.photo}
                    alt=""
                    className="my-4"
                  />
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) => handleChangeImage(e)}
                  disabled={loading}
                  className="hidden"
                />
                <ReactQuill
                  value={description}
                  onChange={setDescription}
                  name="description"
                />
              </div>
            </div>
          </motion.form>
        ) : (
          <>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <motion.div
                variants={diariesCardVariant}
                initial="hidden"
                animate="visible"
                className="max-w-6xl px-2 mx-auto py-5"
              >
                <div className="flex justify-between items-center pt-5">
                  <Link to="/" className="ml-3 mt-2 text-2xl">
                    <motion.button
                      variants={addButton}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      <AiOutlineArrowLeft />
                    </motion.button>
                  </Link>
                  <div>
                    <motion.button
                      variants={addButton}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      onClick={() => setEdit(true)}
                    >
                      <AiOutlineEdit className="mr-5 -mb-1 text-2xl text-blue-600" />
                    </motion.button>
                    <motion.button
                      variants={addButton}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      onClick={handleDelete}
                    >
                      <MdDelete className="text-xl text-red-600" />
                    </motion.button>
                  </div>
                </div>
                <div>
                  <div className="mb-3">
                    <span className="text-3xl text-blue-600 font-medium inline-block mr-1">
                      {moment(diary.date).format("Do")}
                    </span>
                    <span>{moment(diary.date).format("MMM")}</span>
                  </div>
                  <div className="text-3xl flex items-center">
                    <span>{diary.mood}</span>
                  </div>
                  <p className="text-3xl font-medium mb-3">{diary.title}</p>
                  <img src={diary.image?.photo} alt="" />
                  <p
                    className="text-gray-600 my-3 dark:text-gray-300 text-xl"
                    dangerouslySetInnerHTML={{ __html: diary.description }}
                  ></p>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SingleDiary;
