
import { Button } from "@/components/ui/button"
import { MountainIcon } from "@/components/ui/MountainIcon"

export default function Component() {
  return (
    <div className="flex items-center justify-center bg-background">
      <div className="w-full max-w-md rounded-lg bg-card p-6 shadow-lg">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
            <MountainIcon className="h-10 w-10 text-primary-foreground" />
          </div>
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold">Join with MetaTube Today</h2>
            <p className="text-muted-foreground">Sign in to your account or create a new one to get started.</p>
          </div>
          <Button className="flex w-full items-center justify-center gap-3 px-6 py-3 rounded-md">
            <ChromeIcon className="h-6 w-6" />
            <span className="font-medium">Continue with Google</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

function ChromeIcon(props : any) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  )
}