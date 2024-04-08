"use client";

import * as z from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from '@/actions/login';

export const LoginForm = () => {
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [isPending, startTransition] = useTransition();

   const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         phone: "",
         password: "",
      },
   });

   const onSubmit = (values: z.infer<typeof LoginSchema>) => {
      console.log(values)
      setError("");
      setSuccess("");

      startTransition(() => {
         login(values)
            .then((data) => {
               if (data?.error) {
                  form.reset();
                  setError(data.error);
               }

               // if (data?.success) {
               //   form.reset();
               //   setSuccess(data.success);
               // }

            })
            .catch(() => setError("Something went wrong"));
      });
   };

   return (
      <CardWrapper>
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-6"
            >
               <div className="space-y-4">

                  <FormField
                     control={form.control}
                     name="phone"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Phone</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isPending}
                                 placeholder="john.doe@example.com"
                                 type="text"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Password</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isPending}
                                 placeholder="******"
                                 type="password"
                              />
                           </FormControl>
                           <Button
                              size="sm"
                              variant="link"
                              asChild
                              className="px-0 font-normal"
                           >
                              <Link href="/auth/reset">
                                 Parol esdan chiqdimi?
                              </Link>
                           </Button>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <FormError message={error} />
               <FormSuccess message={success} />
               <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full"
               >
                  Kirish
               </Button>
            </form>
         </Form>
      </CardWrapper>
   );
};