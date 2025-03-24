"use client";

import { Button } from "@/components/ui/button";
import { 
    Card,
    CardHeader,
    CardDescription,
    CardContent,
    CardTitle
 } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
    return (
        <div className="h-full flex items-center justify-center bg-[#1b0918]">
            <Card className="md:h-auto w-[80%] sm:w-[420px] p-4 sm:p-8">
                <CardHeader>
                    <CardTitle className="text-center">
                        Sign in
                    </CardTitle>
                    <CardDescription className="text-sm text-center text-accent-foreground">
                        Use email or service, to sign in
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-2 sm:px-6">
                    <form action="" className="space-y-3">
                        <Input
                            type="email"
                            disabled={false}
                            placeholder="Email"
                            value={""}
                            onChange={() => { }}
                            required
                        />
                        <Input
                            type="password"
                            disabled={false}
                            placeholder="Password"
                            value={""}
                            onChange={() => { }}
                            required
                        />
                        <Button
                            className="w-full"
                            size="lg"
                            disabled={false}
                        >
                            Continue
                        </Button>
                    </form>
                    <Separator />
                    <div className="flex my-2 justify-evenly mx-auto items-center">
                        <Button
                            disabled={false}
                            onClick={() => { }}
                            variant="outline"
                            size="lg"
                            className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
                        >
                            <FcGoogle className="size-8 left-2.5 top-2.5" />
                        </Button>
                        <Button
                            disabled={false}
                            onClick={() => { }}
                            variant="outline"
                            size="lg"
                            className="bg-slate-300 hover:bg-slate-400 hover:scale-110"
                        >
                            <FaGithub className="size-8 left-2.5 top-2.5" />
                        </Button>
                    </div>
                    <p className="text-center text-sm mt-2 text-muted-foreground">
                        Create new account
                        <Link className="text-sky-700 ml-4 hover:underline cursor-pointer" href="sign-up">Sign up</Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export default SignIn;