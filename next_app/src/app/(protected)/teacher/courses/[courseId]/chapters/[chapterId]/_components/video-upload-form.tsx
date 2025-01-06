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
import { Video } from "@prisma/client";
import axios from "axios";
import { PencilIcon, PlusCircleIcon, VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
interface VideoUploadFormProps {
  courseId: string;
  chapterId: string;
  initialData: {
    video: Video | null;
  };
}
interface FormData {
  file: FileList;
}

const VideoUploadForm = ({
  chapterId,
  initialData,
  courseId,
}: VideoUploadFormProps) => {
  const form = useForm<FormData>();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const onSubmit = async (data: FormData) => {
    try {
      const file = data.file?.[0];
      const response = await axios.post(
        `/api/chapters/${chapterId}/upload-video`,
        {
          fileType: file.type,
          courseId: courseId,
        },
      );
      console.log(response.data.url);
      const uploadResponse = await axios.put(response.data.url, data.file?.[0]);
      console.log(uploadResponse);
      if (uploadResponse.status == 200) {
        await axios.put(`/api/chapters/${chapterId}/upload-video`);
        toast.success("Chapter Video  updated");
        toggleEdit();
        router.refresh();
      } else {
        toast.error("Video upload failed");
      }
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="mt-4 flex flex-col space-y-4 rounded-md bg-slate-100 p-4">
      <div className="flex items-center justify-between">
        Chapter Video
        <Button variant={"outline"} onClick={toggleEdit}>
          {isEditing ? (
            <>Cancel</>
          ) : initialData.video == null ? (
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
        initialData.video == null ? (
          <div className="flex h-60 w-60 flex-col items-center justify-center rounded-md bg-slate-200">
            <VideoIcon className="h-10 w-10 text-slate-500" />
            <p className="text-xs text-slate-500">No video found</p>
          </div>
        ) : (
          <div className="relative aspect-video h-80 border">
            {
              //TODO: Replace with HLS PLAYER
            }
            {/* <video
              src={initialData.}
              className="h-full w-full object-contain"
              controls={true}
            ></video> */}
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
                        accept="video/mp4,video/x-m4v,video/*"
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
