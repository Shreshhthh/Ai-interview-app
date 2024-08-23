"use client";

import React, { useEffect, useState } from "react";
import { db } from "../../../utils/db";
import { AiInterview } from "../../../utils/schema";
import { desc, eq } from "drizzle-orm";
import InterviewItemCard from "../_components/InterviewItemCard";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";

const PreviousInterview = () => {
  const [prevInterview, setPrevInterview] = useState([]);

  const [loading, setLoading] = useState(true);

  const { user } = useUser();

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  // user?.primaryEmailAddress?.emailAddress
  const getInterviewList = async () => {
    setLoading(true);
    const result = await db
      .select()
      .from(AiInterview)
      .where(eq(AiInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(AiInterview.id));

    setPrevInterview(result);
    setLoading(false);
  };

  return loading ? (
    <div className="flex justify-center items-center">
      <Loader className="w-10 h-10 animate-spin" />
    </div>
  ) : (
    <div>
      <h2 className="text text-xl font-bold">Previous Interviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {prevInterview &&
          prevInterview.map((interview, index) => (
            <InterviewItemCard key={index} interview={interview} />
          ))}
      </div>
    </div>
  );
};

export default PreviousInterview;
