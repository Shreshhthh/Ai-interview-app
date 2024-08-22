"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Button } from "../../../components/ui/button";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, MicOff, VideoOff } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "../../../utils/Gemini-ai-model";
import { db } from "../../../utils/db";
import { UserAnswer } from "../../../utils/schema";
import moment from "moment";
import { useUser } from "@clerk/nextjs";

const RecordAnswerSection = ({
  activeQuestion,
  interviewQuestions,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [jsonResponseState, setJsonResponseState] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    results.map((result) =>
      setUserAnswer((prevAns) => prevAns + result.transcript)
    );
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateUserAnswer();
    }
    // if (userAnswer?.length < 10) {
    //   setLoading(false);
    //   toast("Error while saving your response, Please try again");
    //   return;
    // }
  }, [userAnswer]);

  // const saveUserAnswer = async () => {

  // };

  const startStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const updateUserAnswer = async () => {
    console.log(userAnswer);

    setLoading(true);
    const feedbackPrompt =
      "Question: " +
      interviewQuestions[activeQuestion]?.question +
      " Answer: " +
      userAnswer +
      " Depends on question and user answer give interview question " +
      "please give us rating for answer and feedback as area of improvment if any " +
      "in just 3-5 lines to improve it" +
      "in JSON format only with two fields onlt i.e rating and feedback , I only want JSON response from you  which should only contain feedback and rating no need to write any thing before or after JSON response ";

    const result = await chatSession.sendMessage(feedbackPrompt);

    const mockJsonResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    // console.log("un parsed", mockJsonResponse);
    // setJsonResponseState(mockJsonResponse);

    const jsonParsedResponse = JSON.parse(mockJsonResponse);
    // console.log("parse", jsonParsedResponse);
    // console.log(jsonResponseState, "State");

    const response = await db.insert(UserAnswer).values({
      mockIdRef: interviewData.mockId,
      question: interviewQuestions[activeQuestion].question,
      correctAns: interviewQuestions[activeQuestion].answer,
      userAns: userAnswer,
      feedback: jsonParsedResponse?.feedback,
      rating: jsonParsedResponse?.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-yyyy"),
    });

    if (response) {
      toast("Your response has been recorded successfully");
      setUserAnswer("");
      setResults([]);
    }
    setResults([]);
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-[hsl(var(--muted))] rounded-lg p-5">
        {/* <Image
          src={"/webcam.png"}
          alt="webcam"
          priority
          width={200}
          height={200}
          className="absolute"
        /> */}
        <VideoOff className="absolute h-10 w-10" />
        <Webcam
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>
      <Button
        variant="outline"
        className="my-10 text-gree"
        onClick={startStopRecording}
      >
        {isRecording ? (
          <h2 className="flex text-red-500 gap-2 items-center font-bold">
            <MicOff />
            Stop Recording
          </h2>
        ) : (
          <h2 className="flex items-center gap-2 font-bold">
            <Mic />
            Start Recording
          </h2>
        )}
      </Button>
      {/* <Button onClick={() => console.log(userAnswer)}>User Answer</Button> */}
    </div>
  );
};

export default RecordAnswerSection;
