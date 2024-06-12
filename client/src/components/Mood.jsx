import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { moods } from "../data";

const Mood = ({loading, selecteMood, setSelectedMood}) => {

  return (
    <div className="text-3xl z-10">
      <Listbox
        disabled={loading}
        value={selecteMood}
        onChange={setSelectedMood}
      >
        <div className="relative">
          <Listbox.Button className="relative w-full rounded-sm">
            <span className="block cursor-pointer">{selecteMood.emoji}</span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute bg-slate-300 w-64 rounded-sm mt-3 dark:bg-gray-600">
              <span className="font-medium text-lg pl-3">
                How do you feel today?
              </span>
              {moods.map((mood) => (
                <Listbox.Option
                  key={mood.name}
                  value={mood}
                  className={({ active }) =>
                    `relative select-none py-2 pl-3 cursor-pointer ${
                      active ? "bg-blue-500" : "bg-slate-300 dark:bg-gray-600"
                    }`
                  }
                >
                  {({ selecteMood }) => (
                    <>
                      <span className="cursor-pointer">{mood.emoji}</span>
                      {selecteMood ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-red-500">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default Mood;
