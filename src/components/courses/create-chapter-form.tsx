"use client";

import { CreateChapterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { FormError } from "../form/form-error";
import { FormSuccess } from "../form/form-success";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Input } from "../ui/input";

export const CreateChapterForm = ({ courseId }: { courseId: string }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof CreateChapterSchema>>({
    resolver: zodResolver(CreateChapterSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof CreateChapterSchema>) => {
    setError("");
    setSuccess("");
    try {
      const result = await axios.post(
        `/api/courses/${courseId}/chapter`,
        values,
      );
      if (result.status == 201) {
        toast.success("Chapter created", {
          cancel: {
            label: "X",
            onClick: () => console.log("toast canceled"),
          },
        });
        router.push(`/teacher/courses/${courseId}`);
      } else {
        setError("Failed to create chapter");
      }
    } catch (e) {
      if (e instanceof AxiosError) {
        if (e.response?.data?.error) {
          setError(e.response.data.error);
          return;
        }
      }
      console.error(e);
      setError("Something went wrong");
    }
  };
  return (
    <div className="mx-auto mt-3 flex h-full max-w-5xl items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-lg font-bold">
          Create New Chapter
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Chapter Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. 'Installing Flutter'"
                          type="text"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormDescription>
                        What will this chapter cover?
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
                  onClick={() => router.push(`/teacher/courses/${courseId}`)}
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
