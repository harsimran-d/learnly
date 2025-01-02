"use client";

import {
  Form,
  FormControl,
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
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/format";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface PriceFormProps {
  courseId: string;
  initialData: {
    price: number | undefined;
  };
}

const formSchema = z.object({
  price: z.coerce
    .number()
    .step(0.01, "Not correct price")
    .nonnegative("Price cannot be negative"),
});

const PriceForm = ({ courseId, initialData }: PriceFormProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      price: initialData.price ?? undefined,
    },
  });

  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.patch(`/api/courses/${courseId}`, values);
      if (response.status !== 200) {
        throw new Error();
      }
      toast.success("Course Price updated");
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
        Course Price
        <Button variant="outline" onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="mr-2" />
              Edit Price
            </>
          )}
        </Button>
      </div>
      {!isEditing ? (
        initialData.price == undefined ? (
          <p className="text-sm italic">No Price</p>
        ) : (
          <p className="mt-2 text-sm">{formatPrice(initialData.price)}</p>
        )
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        type="number"
                        step="0.01"
                        placeholder="Set a price for your course"
                        {...field}
                        className="bg-white"
                      />
                    </FormControl>
                    <FormMessage />
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

export default PriceForm;
