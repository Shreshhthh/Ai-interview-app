import { SignUp } from "@clerk/nextjs";
import { Button } from "../../../../components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="grid lg:grid-cols-2 min-h-[80vh]">
      <div className="bg-primary flex flex-col justify-center items-start gap-6 px-8 py-12 lg:px-16 lg:py-20">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary-foreground">
            Ace Your Next Interview
          </h1>
          <p className="text-lg text-primary-foreground">
            Practice with our AI-powered mock interviews and get personalized
            feedback to improve your skills.
          </p>
        </div>
        <Link href={"/sign-in"}>
          <Button
            variant="outline"
            className="text-black hover:bg-primary/20 hover:text-white"
          >
            Login
          </Button>
        </Link>
      </div>
      <div className="flex items-center justify-center p-8 lg:p-12">
        <SignUp />
      </div>
    </div>
  );
}
