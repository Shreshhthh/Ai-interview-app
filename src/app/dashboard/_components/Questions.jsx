import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const Questions = ({
  interviewQuestions,
  activeQuestion,
  setActiveQuestion,
}) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support text-to-speech functionality.");
    }
  };

  return (
    interviewQuestions && (
      <div className="p-5 border rounded-lg my-10 shadow-md">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {interviewQuestions &&
            interviewQuestions.map((questions, index) => (
              <h2
                key={index}
                className={`shadow-sm p-2 rounded-full  text-center sm:text-xs md:text-sm cursor-pointer ${
                  activeQuestion === index
                    ? `bg-gray-700 text-white `
                    : `bg-gray-100 text-black`
                }`}
                onClick={() => setActiveQuestion(index)}
              >
                Question {index + 1}
              </h2>
            ))}
        </div>
        <h2 className="my-5 text-md md:text-lg">
          {interviewQuestions[activeQuestion]?.question}
        </h2>
        <Volume2
          onClick={() =>
            textToSpeech(interviewQuestions[activeQuestion]?.question)
          }
          className="cursor-pointer"
        />
        <div className="border rounded-lg p-5 bg-gray-100 mt-10">
          <h2 className="flex gap-2 items-center">
            <Lightbulb /> <strong>Note:</strong>
          </h2>
          <h2 className=" my-2 text-sm">
            Click on Record Answer when you want to answer the question. At the
            end of interview we will give you the feedback along with correct
            answer for each of questions and answers to compare it.
          </h2>
        </div>
      </div>
    )
  );
};

export default Questions;
