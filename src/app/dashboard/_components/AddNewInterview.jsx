"use client";
import React, { use, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { chatSession } from "../../../utils/Gemini-ai-model";
import { Loader2 } from "lucide-react";
import { db } from "../../../utils/db";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import { AiInterview } from "../../../utils/schema";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const [jobPosition, setJobPosition] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);

  const [jsonParse, setJsonParse] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const inputPrompt =
      "Job role: " +
      jobPosition +
      ", job description:" +
      jobDesc +
      ", Years of job experience:" +
      jobExperience +
      "Depend on give information give 5 interview questions and answered in json format, Give question and answered field in json  format only don't write anything else other than question and answer in json format neither at starting nor at the end start directly with question and answer in json format";

    const result = await chatSession.sendMessage(inputPrompt);

    const mockInterviewResponse = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");

    setJsonParse(mockInterviewResponse);

    if (mockInterviewResponse) {
      const res = await db
        .insert(AiInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResponse: mockInterviewResponse,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-yyyy"),
        })
        .returning({ id: AiInterview.mockId });

      if (res) {
        setOpenDialog(false);
      }

      setLoading(false);
      router.push("/dashboard/interview/" + res[0].id);
    }
  };

  return (
    <div>
      <div
        className="p-10 border lg:rounded-xl bg-[hsl(var(--muted))] hover:scale-105 hover:shadow-sm cursor-pointer transition-all mt-5"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="font-bold text-lg text-center ">+ Add New</h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Tell us more about your job interviewing
            </DialogTitle>
            <DialogDescription>
              <div>
                <h2 className="mt-2">
                  Add details about your job position/role, job description, and
                  years of experience
                </h2>
                <form onSubmit={onSubmit}>
                  <div className="mt-5 my-2">
                    <label>Job Role</label>
                    <Input
                      placeholder="E.g Full stack developer"
                      className="mt-1"
                      required
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="mt-5 my-2">
                    <label>Job Description / Tech Stack in Short</label>
                    <Textarea
                      placeholder="E.g React, Next, MERN"
                      className="mt-1"
                      required
                      onChange={(event) => setJobDesc(event.target.value)}
                    />
                  </div>
                  <div className="mt-5 my-2">
                    <label>Number years of Experience</label>
                    <Input
                      placeholder="E.g 8"
                      className="mt-1"
                      type="number"
                      required
                      onChange={(event) => setJobExperience(event.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-5 mt-5">
                    <Button type="submit">
                      {loading ? (
                        <>
                          {" "}
                          <Loader2 className="animate-spin gap-1" /> Generating
                          from AI{" "}
                        </>
                      ) : (
                        "Start Interview"
                      )}
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
