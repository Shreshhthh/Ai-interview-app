"use client";
import React, { useEffect, useState } from "react";
import { AiInterview } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import Questions from "../../../_components/Questions";
import RecordAnswerSection from "../../../_components/RecordAnswerSection";
import { db } from "../../../../../utils/db";
import { Button } from "../../../../../components/ui/button";
import Link from "next/link";

const StartInterview = ({ params }) => {
  const [interviewData, setInterviewData] = useState();
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);

  useEffect(() => {
    getInterviewDetails();
  }, []);

  const getInterviewDetails = async () => {
    const response = await db
      .select()
      .from(AiInterview)
      .where(eq(AiInterview.mockId, params.interviewId));

    //console.log(interviewResponse);

    const mockResponse = JSON.parse(response[0].jsonMockResponse);
    //console.log(mockResponse);

    setInterviewQuestions(mockResponse);
    setInterviewData(response[0]);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <Questions
          interviewQuestions={interviewQuestions}
          activeQuestion={activeQuestion}
          setActiveQuestion={setActiveQuestion}
        />
        <RecordAnswerSection
          interviewQuestions={interviewQuestions}
          activeQuestion={activeQuestion}
          interviewData={interviewData}
        />
      </div>
      <div className="flex justify-end mb-5 gap-10">
        {activeQuestion > 0 && (
          <Button
            variant="outline"
            onClick={() => setActiveQuestion(activeQuestion - 1)}
          >
            Previous Question
          </Button>
        )}
        {activeQuestion !== interviewQuestions?.length - 1 && (
          <Button onClick={() => setActiveQuestion(activeQuestion + 1)}>
            Next Question
          </Button>
        )}
        <Link
          href={"/dashboard/interview/" + interviewData?.mockId + "/feedback"}
        >
          {activeQuestion == interviewQuestions?.length - 1 && (
            <Button variant="destructive">End Interview</Button>
          )}
        </Link>
      </div>
    </div>
  );
};

export default StartInterview;
