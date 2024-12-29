"use client";

import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import * as z from "zod";
import { CreateCourseSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { FormError } from "../form/form-error";
import { FormSuccess } from "../form/form-success";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export const CreateCourseForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CreateCourseSchema>>({
    resolver: zodResolver(CreateCourseSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof CreateCourseSchema>) => {
    setError("");
    setSuccess("");
    toast({
      title: "Creating course...",
    });
    try {
      const result = await axios.post("/api/courses", values);
      console.log(result);
      if (result.status == 201) {
        toast({
          title: "Course created",
        });
        router.push("/teacher/courses/edit/" + result.data.id);
      } else {
        setError("Failed to create course");
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data?.error) {
          setError(e.response.data.error);
          return;
        }
      }
      console.log(e);
      setError("Something went wrong");
    }
  };
  return (
    <div className="mx-auto mt-3 flex h-full max-w-5xl items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-lg font-bold">Create New Course</CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Course Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. 'Flutter Development'"
                          type="text"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        What will you teach in this course?
                      </FormDescription>
                    </FormItem>
                  );
                }}
              />
              <FormError message={error} />
              <FormSuccess message={success} />
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  disabled={isSubmitting}
                  variant="outline"
                  onClick={() => router.push("/teacher/courses")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
