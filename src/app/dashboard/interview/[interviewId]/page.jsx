"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../utils/db";
import { AiInterview } from "../../../../utils/schema";
import { eq } from "drizzle-orm";
import { Video, VideoOff } from "lucide-react";
import Webcam from "react-webcam";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";
import webcam from "../../../../../public/webcam.png";

const InterviewPage = ({ params }) => {
  const [interviewData, setInterviewData] = useState([]);

  const [webcam, setWebcam] = useState(false);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const response = await db
      .select()
      .from(AiInterview)
      .where(eq(AiInterview.mockId, params.interviewId));
    setInterviewData(response[0]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto py-12 md:py-24 px-4 md:px-6">
      <div className="grid gap-8 md:gap-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Let's Get Started
          </h1>
          <p className="mt-2 text-muted-foreground md:text-xl">
            Prepare for your next interview with our AI-powered mock interview.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <div>
            <h2 className="text-xl font-bold">Job Role</h2>
            <p className="mt-2 text-muted-foreground">
              {interviewData.jobPosition}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Job Description</h2>
            <p className="mt-2 text-muted-foreground">
              {interviewData.jobDesc}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Years of Experience</h2>
            <p className="mt-2 text-muted-foreground">
              {interviewData.jobExperience} years
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold">Interview Procedure</h2>
            <p className="mt-2 text-muted-foreground">
              1. Enable your webcam and microphone.
              <br />
              2. Click the "Start Interview" button to begin.
              <br />
              3. Answer the questions to the best of your ability.
              <br />
              4. Receive feedback and insights after the interview.
            </p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          <div className="bg-muted rounded-lg p-4 md:p-6">
            <h2 className="text-xl font-bold">Webcam and Microphone</h2>
            <div className="mt-4 aspect-video rounded-lg overflow-hidden">
              {webcam ? (
                <Webcam
                  onUserMedia={() => setWebcam(true)}
                  onUserMediaError={() => setWebcam(false)}
                />
              ) : (
                <img
                  src="/webcam.png"
                  width="640"
                  height="360"
                  alt="Webcam preview"
                  className="w-full h-full object-cover"
                  style={{ aspectRatio: "640/360", objectFit: "cover" }}
                />
              )}
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {webcam ? (
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => setWebcam(false)}
                >
                  <VideoOff className="h-5 w-5" />
                  Disable Webcam and Microphone
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => setWebcam(true)}
                >
                  <Video className="h-5 w-5" />
                  Enable Webcam and Microphone
                </Button>
              )}
            </div>
          </div>
          <div className="bg-muted rounded-lg p-4 md:p-6 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold">Start Interview</h2>
            <p className="mt-2 text-muted-foreground">
              Click the button below to begin your mock interview.
            </p>
            <Link
              href={"/dashboard/interview/" + params.interviewId + "/start"}
            >
              <Button className="mt-4">Start Interview</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

function CameraIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

function MicIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

export default InterviewPage;

{
  /* <div className="my-10 ">
      <h2 className="font-bold text-gray-700 text-5xl">Lets Get Started!</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        <div className="flex flex-col my-5 gap-5 ">
          <div className="flex flex-col my-5 gap-5 rounded-lg p-5 border">
            <h2 className="text-lg text-gray-700">
              <strong className="text-gray-700 font-bold">
                Job Role / Position:{" "}
              </strong>
              {interviewData.jobPosition}
            </h2>
            <h2 className="text-lg text-gray-700">
              <strong className="font-bold">
                Job Description / Tech-stack:{" "}
              </strong>
              {interviewData.jobDesc}
            </h2>
            <h2 className="text-lg text-gray-700 ">
              <strong className="text-gray-700 font-bold">
                Years of Experience:{" "}
              </strong>
              {interviewData.jobExperience}
            </h2>
          </div>
          <div className="p-5 rounded-lg border-yellow-400 bg-yellow-200">
            <h2 className="flex text-yellow-500 gap-1 items-center">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint
              quos cum, corporis ipsum aut at voluptates saepe harum illo,
              assumenda quas nobis ex adipisci reiciendis fugit impedit ducimus
              ad eum.lorem20 Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Perspiciatis, repellat. Fuga accusantium dignissimos
              reiciendis suscipit eum, porro molestias doloribus aspernatur
              minima libero ex, atque quam similique deserunt nulla consectetur
              nostrum?
            </h2>
          </div>
        </div>
        <div>
          {webcam ? (
            <div className="flex flex-col justify-center">
              <Webcam
                style={{ height: 300, width: 300 }}
                onUserMedia={() => setWebcam(true)}
                onUserMediaError={() => setWebcam(false)}
              />
              <Button onClick={() => setWebcam(false)} className="bg-gray-700">
                Disable Web Cam and Microphone
              </Button>
            </div>
          ) : (
            <div className="flex flex-col justify-center">
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-[#275248] text-gray-700 rounded-lg border-[9px]" />
              <Button onClick={() => setWebcam(true)} className="bg-gray-700">
                Enable Web Cam and Microphone
              </Button>
            </div>
          )}
          <div className="flex justify-end items-end">
            <Link
              href={"/dashboard/interview/" + params.interviewId + "/start"}
            >
              <Button className="bg-blue-500 mt-6 hover:bg-blue-600">
                Start Interview
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div> */
}
