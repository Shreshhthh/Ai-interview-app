"use client"
import Link from "next/link"
import {
  Card,

} from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import Header from "./dashboard/_components/Header"
import Footer from '../components/footer'


export default function Home() {
  

    return(
      <div className="flex flex-col min-h-[100dvh]">
        
<Header/>
      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
          <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
            <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
              <div>
                <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Ace Your Next Interview with Interview AI
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Get personalized feedback, practice questions, and performance tracking to help you land your dream
                  job.
                </p>
                <div className="mt-6">
                  <Link
                    href="/login"
                    className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Try Interview AI
                  </Link>
                </div>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <img
                  src="/hero.png"
                  width="550"
                  height="550"
                  alt="Hero"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32" id="features">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Unlock Your Interview Potential</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI-powered platform provides the tools you need to prepare for your next interview and land your
                  dream job.
                </p>
              </div>
            </div>
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Personalized Feedback</h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed feedback on your responses to help you improve your interview skills.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Practice Questions</h3>
                <p className="text-sm text-muted-foreground">
                  Access a vast library of practice questions to prepare for common interview topics.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Performance Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your progress and see how you're improving over time.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Customized Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Get personalized suggestions on areas to focus on based on your performance.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Interview Simulation</h3>
                <p className="text-sm text-muted-foreground">
                  Practice your interview skills in a realistic, simulated environment.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-lg font-bold">Collaboration Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Share your progress with mentors or friends and get additional feedback.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Users Say</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from real people who have used Interview AI to land their dream jobs.
              </p>
            </div>
            <div className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              <Card className="bg-background p-6 shadow-sm">
                <div className="flex flex-col items-start space-y-4">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">John Doe</h4>
                      <p className="text-xs text-muted-foreground">Software Engineer</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "Interview AI helped me prepare for my interview in a way\n that was tailored to my specific needs.
                    The personalized\n feedback and practice questions were invaluable."
                  </p>
                </div>
              </Card>
              <Card className="bg-background p-6 shadow-sm">
                <div className="flex flex-col items-start space-y-4">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">Sarah Anderson</h4>
                      <p className="text-xs text-muted-foreground">Product Manager</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "I was able to boost my confidence and perform much better\n in my interview thanks to the insights
                    and feedback\n provided by Interview AI."
                  </p>
                </div>
              </Card>
              <Card className="bg-background p-6 shadow-sm">
                <div className="flex flex-col items-start space-y-4">
                  <div className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>MR</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-sm font-semibold">Michael Roberts</h4>
                      <p className="text-xs text-muted-foreground">Data Analyst</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "I was able to land my dream job after using Interview AI\n to practice and improve my interview
                    skills. Highly\n recommended!"
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
 
    </div>
    )

}

function LaptopIcon(props) {
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
      <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45L4 16" />
    </svg>
  )
}