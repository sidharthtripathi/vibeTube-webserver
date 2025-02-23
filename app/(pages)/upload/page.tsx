"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { server } from "@/lib/axios";
import axios from "axios";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
type FormType = {
  title: string;
  description: string;
};
export default function Upload() {
  const [vidFile, setVidFile] = useState<null | File>(null);
  const [vidUrl, setVidUrl] = useState<undefined | string>(undefined);
  const [thumbnail, setThumbnail] = useState<null | File>(null);
  const [thumbnailURL, setThumbnailUrl] = useState<undefined | string>(
    undefined
  );
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormType>();
  const [progress, setProgress] = useState(0);
  async function handlePublish({ title, description }: FormType) {
    // getting video presigned url
    const { preSignedUrl, rawVideoUrl, hlsVideoUrl, id } = (
      await server.get("/api/upload")
    ).data;
    // getting thumbnail presigned url
    const { thumbnailUrl, preSignedUrl: thumbnailPresignedUrl } = (
      await server.get("/api/upload/thumbnail")
    ).data;
    // upload video file to the presigned url
    await axios.put(preSignedUrl, vidFile, {
      onUploadProgress: (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total!) * 100);
          setProgress(progress);
        }
      },
    });

    // upload thumbnail to presigned url
    await axios.put(thumbnailPresignedUrl, thumbnail);

    // update video in DB
    await server.post("/api/upload", {
      title,
      description,
      rawVideoUrl,
      hlsVideoUrl,
      thumbnailUrl,
      id,
    });
    reset();
    setVidFile(null);
    setVidUrl(undefined);
    setThumbnail(null);
    setThumbnailUrl(undefined);
    toast({ title: "SUCEESS", description: "Video published" });
  }
  return (
    <section>
      <form onSubmit={handleSubmit(handlePublish)} className="space-y-2 w-1/2">
        <Label htmlFor="videofile">Select Video</Label>
        <Input
          required
          type="file"
          accept="video/*"
          disabled={isSubmitting}
          onChange={(e) => {
            if (e.target.files) {
              setVidFile(e.target.files[0]);
              setVidUrl(URL.createObjectURL(e.target.files[0]));
            }
          }}
        />
        {vidUrl && (
          <video
            src={vidUrl}
            controls
            className="aspect-video w-full rounded-md"
          />
        )}
        <Label htmlFor="thumbnailfile">Select thumbnail</Label>
        <Input
          required
          type="file"
          accept="image/*"
          disabled={isSubmitting}
          onChange={(e) => {
            if (e.target.files) {
              setThumbnail(e.target.files?.[0]);
              setThumbnailUrl(URL.createObjectURL(e.target.files?.[0] as File));
            }
          }}
        />
        {thumbnailURL && (
          <img src={thumbnailURL} className="aspect-video w-full rounded-md" />
        )}
        <Input
          {...register("title", { required: "title can't be empty" })}
          type="text"
          placeholder="video title"
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="text-xs text-destructive">{errors.title.message}</p>
        )}
        <Input
          {...register("description", {
            required: "description   can't be empty",
          })}
          type="text"
          placeholder="vidoe description"
          disabled={isSubmitting}
        />
        {errors.description && (
          <p className="text-xs text-destructive">
            {errors.description.message}
          </p>
        )}
        <Button type="submit">publish</Button>
      </form>
      {isSubmitting && <Progress className="my-4" value={progress} />}
    </section>
  );
}