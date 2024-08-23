import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="grid w-full min-h-[100dvh] grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center bg-primary p-6 lg:p-10">
        <SignIn />
      </div>
      <div className="hidden bg-muted lg:block">
        <div className="flex h-full items-center justify-center p-6 lg:p-10">
          <div className="mx-auto max-w-md space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Prepare for your next AI interview
            </h2>
            <p className="text-muted-foreground">
              Our AI-powered mock interview platform helps you practice and
              improve your interview skills. Get personalized feedback and
              insights to ace your next interview.
            </p>
            <img
              src="/placeholder.svg"
              width="550"
              height="400"
              alt="Hero"
              className="mx-auto aspect-[11/8] rounded-xl object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
