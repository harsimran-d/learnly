"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ChapterAccessFormProps {
  chapterId: string;
  initialData: {
    isFree: boolean;
  };
}

const formSchema = z.object({
  isFree: z.boolean(),
});

const ChapterAccessForm = ({
  chapterId,
  initialData,
}: ChapterAccessFormProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isFree: initialData.isFree,
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/chapters/${chapterId}`, values);
      if (response.status !== 200) {
        throw new Error();
      }
      toast.success("Chapter Access  updated");
      toggleEdit();
      router.refresh();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong.");
    }
  };

  const toggleEdit = () => setIsEditing((current) => !current);

  return (
    <div className="mt-6 rounded-md border bg-slate-100 p-4">
      <div className="flex items-center justify-between font-medium">
        Chapter Access
        <Button variant="outline" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2" />
              Edit Access
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (initialData.isFree ? (
          <p className="mt-1 max-w-min rounded-md bg-green-200 px-2 py-1 text-sm text-green-700">
            Free
          </p>
        ) : (
          <p className="mt-1 max-w-min rounded-md bg-red-200 px-2 py-1 text-sm text-red-700">
            Paid
          </p>
        ))}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        disabled={isSubmitting}
                        onCheckedChange={field.onChange}
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Check this box to make it free to preview
                    </FormDescription>
                  </FormItem>
                );
              }}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ChapterAccessForm;
