"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../utils/db";
import { UserAnswer } from "../../../../../utils/schema";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../../../components/ui/collapsible";
import { ChevronsUpDown, Loader } from "lucide-react";
import { Button } from "../../../../../components/ui/button";
import { useRouter } from "next/navigation";

const Feedback = ({ params }) => {
  useEffect(() => {
    getFeedback();
  }, []);

  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const getFeedback = async () => {
    setLoading(true);
    const response = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    setFeedbackList(response);
    setLoading(false);
  };

  return loading ? (
    <div className=" animate-spin flex justify-center items-center w-100 h-full mt-48 mb-48">
      <Loader className="h-10 w-10" />
    </div>
  ) : (
    <div className="p-10">
      {feedbackList.length == 0 ? (
        <h2 className="font-bold text-xl text-red-500 py-2">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold py-2">Congratulations!</h2>
          <h2 className="font-bold text-2xl py-1">
            Here is your interview feedback{" "}
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below interview question with correct answer, your answer and
            feedback for improvement
          </h2>

          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-[hsl(var(--muted))] my-2 text-left rounded flex justify-between gap-3 w-full">
                  {item.question} <ChevronsUpDown className="h-5 w-5 gap-7" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className=" p-2 border rounded-lg">
                      <strong>Rating: </strong>
                      {item.rating}
                    </h2>
                    <h2 className=" p-2 border rounded-lg text-sm">
                      <strong>Your Answer: </strong>
                      {item.userAns}
                    </h2>
                    <h2 className=" p-2 border rounded-lg text-sm">
                      <strong>Correct Answer: </strong>
                      {item.correctAns}
                    </h2>
                    <h2 className=" p-2 border rounded-lg text-sm">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button
        variant="outline"
        onClick={() => router.replace("/dashboard")}
        className="mt-5"
      >
        Go Home
      </Button>
    </div>
  );
};

export default Feedback;
