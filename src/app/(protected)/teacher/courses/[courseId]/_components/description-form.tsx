"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface DescriptionFormProps {
  courseId: string;
  initialData: {
    description: string;
  };
}

const formSchema = z.object({
  description: z.string().nonempty({
    message: "Description is required",
  }),
});

const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: initialData.description,
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const toggleEdit = () => setIsEditing((current) => !current);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/courses/${courseId}`, values);
      if (response.status !== 200) {
        throw new Error();
      }
      toast.success("Course Description updated");
      toggleEdit();
      router.refresh();
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        <div>Course Description</div>
        {isEditing ? (
          <>
            <Button variant="outline" onClick={toggleEdit}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={toggleEdit}>
              <PencilIcon />
              Edit Description
            </Button>
          </>
        )}
      </div>
      {!isEditing ? (
        initialData.description == "" ? (
          <p className="text-sm italic">No description provided</p>
        ) : (
          <p className="mt-2 text-sm">{initialData.description}</p>
        )
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        disabled={isSubmitting}
                        placeholder="e.g. In this course..."
                        {...field}
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button disabled={isSubmitting || !isValid} type="submit">
              Save
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default DescriptionForm;
