// components/AvailabilitySchedule.tsx
"use client";
import React, { ChangeEvent } from "react";
import useScheduleStore from "../../store/scheduleStore";

const daysOfWeek = [
  "Saturday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",

  "Sunday",
] as const;

const AvailabilitySchedule: React.FC = () => {
  const {
    schedule,
    selectedDays,
    setSelectedDays,
    addTimeSlot,
    removeTimeSlot,
    updateTimeSlot,
  } = useScheduleStore();

  const toggleDaySelection = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day)); // Deselect day
    } else {
      setSelectedDays([...selectedDays, day]); // Select day
    }
  };

  const handleInputChange = (
    day: string,
    index: number,
    field: "start" | "end",
    event: ChangeEvent<HTMLInputElement>
  ) => {
    updateTimeSlot(day, index, field, event.target.value);
  };

  return (
    <div className="p-6 max-w-fit border-blue-500 flex justify-center flex-col items-center w-full mx-auto border-2 rounded-lg shadow-lg">
      {/* Day selector buttons */}
      <div className="flex w-full space-x-2 mb-4">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => {
          const dayName = daysOfWeek[index];
          return (
            <button
              key={index}
              onClick={() => toggleDaySelection(dayName)}
              className={`w-8 h-8 flex items-center justify-center rounded-full text-white ${
                selectedDays.includes(dayName) ? "bg-blue-700" : "bg-gray-300"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Display time slots for each selected day */}
      {selectedDays.map((day) => (
        <div key={day} className="mb-4 w-full">
          <h3 className="text-gray-700 font-semibold mb-1">{day}</h3>
          {schedule[day]?.map((slot, index) => (
            <div
              key={index}
              className="flex text-black items-center gap-x-5 mb-2 gap-y-2"
            >
              <input
                type="text"
                value={slot.start}
                onChange={(e) => handleInputChange(day, index, "start", e)}
                className="w-24 border border-gray-300 rounded p-1 text-center"
              />
              <span>to</span>
              <input
                type="text"
                value={slot.end}
                onChange={(e) => handleInputChange(day, index, "end", e)}
                className="w-24 border border-gray-300 rounded p-1 text-center"
              />
              <button
                onClick={() => addTimeSlot(day)}
                className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                +
              </button>
              {index > 0 && (
                <button
                  onClick={() => removeTimeSlot(day, index)}
                  className="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                >
                  -
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default AvailabilitySchedule;