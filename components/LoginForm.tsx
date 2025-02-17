"use client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import z from "zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { server } from "@/lib/axios";
import { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
type LoginForm = z.infer<typeof loginSchema>;
export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });
  async function handleLogin({ username, password }: LoginForm) {
    try {
      await server.post("/api/login", { username, password });
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        // error msg here
        toast({ title: error.response?.statusText, variant: "destructive" });
      }
    }
  }
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="username"
            {...register("username")}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="flex items-center rounded-md py-1 px-2 focus-within:outline border">
            <input
              className="border-0 bg-transparent flex-grow focus:outline-none border-none"
              id="password"
              type="password"
              placeholder="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-xs text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <Button disabled={isSubmitting} type="submit">
          Login
        </Button>
      </div>
    </form>
  );
}
