import axios from "axios";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/header";
import Diary from "../components/Diary";
import { diariesCardVariant } from "../components/Variant";
import PlusBtn from "../components/PlusBtn";

const Diaries = ({ handleSetMode }) => {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const { data } = await axios.get("/api/diaries");
      setDiaries(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <Header handleSetMode={handleSetMode} />
      <div className="max-w-6xl mx-auto px-2 overflow-x-hidden pb-4">
        <div className="">
          {loading ? (
            <div>loading...</div>
          ) : (
            diaries.map((diary) => (
              <motion.div
                variants={diariesCardVariant}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                key={diary._id}
                className="h-44 w-full bg-gray-300 dark:bg-gray-800 p-3 mt-3 rounded-sm"
              >
                <Diary diary={diary} />
              </motion.div>
            ))
          )}
        </div>
        <PlusBtn />
      </div>
    </div>
  );
};

export default Diaries;
