"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import axios from "axios";
import { ImageIcon, PencilIcon, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
interface VideoUploadFormProps {
  chapterId: string;
  initialData: {
    videoUrl: string;
  };
}
interface FormData {
  file: FileList;
}

const VideoUploadForm = ({ chapterId, initialData }: VideoUploadFormProps) => {
  const form = useForm<FormData>();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const onSubmit = async (data: FormData) => {
    const file = data.file?.[0];
    const response = await axios.post(
      `/api/chapters/${chapterId}/upload-video`,
      {
        fileType: file.type,
      },
    );
    console.log(response.data.url);
    const uploadResponse = await axios.put(response.data.url, data.file?.[0]);
    console.log(uploadResponse);
    if (uploadResponse.status == 200) {
      await axios.put(`/api/chapters/${chapterId}/upload-video`, {
        finalName: response.data.finalName,
      });
      toast.success("Chapter Video  updated");
      toggleEdit();
      router.refresh();
    } else {
      toast.error("Video upload failed");
    }
  };
  return (
    <div className="mt-4 flex flex-col space-y-4 rounded-md bg-slate-100 p-4">
      <div className="flex items-center justify-between">
        Chapter Video
        <Button variant={"outline"} onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : initialData.videoUrl == "" ? (
            <>
              <PlusCircleIcon />
              Add Video
            </>
          ) : (
            <>
              <PencilIcon /> Edit Video
            </>
          )}
        </Button>
      </div>

      {!isEditing ? (
        initialData.videoUrl == "" ? (
          <div className="flex h-60 w-60 items-center justify-center rounded-md bg-slate-200">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative h-60 w-60 border">
            <Image
              src={initialData.videoUrl}
              alt="Chapter Video"
              fill
              className="object-contain"
            />
          </div>
        )
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="file"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="file"
                        onChange={(e) => field.onChange(e.target.files)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button type="submit" variant={"outline"}>
              Upload
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
};

export default VideoUploadForm;
