"use client";
import React, { useState } from "react";

const stepFormData = [
  { labelName: "form1", components: <div>Form 1 selected</div> },
  { labelName: "form2", components: <div>Form 2 selected</div> },
  { labelName: "form3", components: <div>Form 3 selected</div> },
  { labelName: "form4", components: <div>Form 4 selected</div> },
];

const StepForm = () => {
  const [currentForm, setCurrentForm] = useState(0);

  const stepForward = () => {
    if (currentForm < stepFormData.length - 1) {
      setCurrentForm((prev) => prev + 1);
    }
  };
  const stepBack = () => {
    if (currentForm > 0) {
      setCurrentForm((prev) => prev - 1);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Step Form</h1>

      {/* Step indicators */}
      <div className="flex items-center gap-12 mb-10 relative">
        {stepFormData.map((_, index) => (
          <div key={index} className="relative flex items-center">
            <div
              className={`w-12 h-12 rounded-full flex justify-center items-center font-medium shadow-md transition-colors duration-300 ${
                currentForm >= index
                  ? "bg-green-600 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {index + 1}
            </div>
            {/* connecting line except last */}
            {index !== stepFormData.length - 1 && (
              <div
                className={`absolute left-12 top-1/2 -translate-y-1/2 h-1 w-12 transition-colors duration-300 ${
                  currentForm > index ? "bg-green-600" : "bg-gray-300"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      {/* Current form content */}
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md mb-8">
        {stepFormData[currentForm].components}
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-4">
        {currentForm > 0 && (
          <button
            onClick={stepBack}
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Back
          </button>
        )}
        <button
          onClick={stepForward}
          className="px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
        >
          {currentForm === stepFormData.length - 1 ? "Continue" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default StepForm;
