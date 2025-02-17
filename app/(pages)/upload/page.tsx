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

type FormValues = {
  title: string;
  description: string;
};

interface UploadResponse {
  preSignedUrl: string;
  rawVideoUrl: string;
  hlsVideoUrl: string;
  id: string;
}

interface ThumbnailResponse {
  thumbnailUrl: string;
  preSignedUrl: string;
}

type MediaFile = {
  file: File | null;
  url: string | null;
};

const initialMediaState: MediaFile = {
  file: null,
  url: null,
};

export default function Upload() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>();
  const [video, setVideo] = useState<MediaFile>(initialMediaState);
  const [thumbnail, setThumbnail] = useState<MediaFile>(initialMediaState);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (file: File | undefined, setMedia: React.Dispatch<React.SetStateAction<MediaFile>>) => {
    if (!file) return;
    setMedia({ file, url: URL.createObjectURL(file) });
  };

  const getPresignedUrls = async () => {
    const [videoResponse, thumbnailResponse] = await Promise.all([
      server.get<UploadResponse>("/api/upload"),
      server.get<ThumbnailResponse>("/api/upload/thumbnail")
    ]);
    
    return {
      video: videoResponse.data,
      thumbnail: thumbnailResponse.data
    };
  };

  const uploadToS3 = async (url: string, file: File, onProgress?: (progress: number) => void) => {
    await axios.put(url, file, {
      onUploadProgress: (e) => {
        if (e.lengthComputable && onProgress) {
          onProgress(Math.round((e.loaded / e.total!) * 100));
        }
      },
    });
  };

  const handlePublish = async ({ title, description }: FormValues) => {
    try {
      if (!video.file || !thumbnail.file) {
        toast({ variant: "destructive", title: "Error", description: "Please select both video and thumbnail" });
        return;
      }

      const { video: videoUrls, thumbnail: thumbnailUrls } = await getPresignedUrls();

      await uploadToS3(videoUrls.preSignedUrl, video.file, setUploadProgress);
      await uploadToS3(thumbnailUrls.preSignedUrl, thumbnail.file);

      await server.post("/api/upload", {
        title,
        description,
        rawVideoUrl: videoUrls.rawVideoUrl,
        hlsVideoUrl: videoUrls.hlsVideoUrl,
        thumbnailUrl: thumbnailUrls.thumbnailUrl,
        id: videoUrls.id,
      });

      resetForm();
      toast({ title: "Success", description: "Video published successfully" });
    } catch (error) {
      toast({ variant: "destructive", title: "Upload Failed", description: "An error occurred during upload" });
    }
  };

  const resetForm = () => {
    reset();
    setVideo(initialMediaState);
    setThumbnail(initialMediaState);
    setUploadProgress(0);
  };

  const FileUploadInput = ({
    label,
    accept,
    media,
    setMedia,
  }: {
    label: string;
    accept: string;
    media: MediaFile;
    setMedia: React.Dispatch<React.SetStateAction<MediaFile>>;
  }) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        required
        type="file"
        accept={accept}
        disabled={isSubmitting}
        onChange={(e) => handleFileChange(e.target.files?.[0], setMedia)}
      />
      {media.url && (
        media.file?.type.startsWith("video/") ? (
          <video src={media.url} controls className="aspect-video w-full rounded-md" />
        ) : (
          <img src={media.url} className="aspect-video w-full rounded-md" alt="Preview" />
        )
      )}
    </div>
  );

  return (
    <section className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit(handlePublish)} className="max-w-2xl space-y-4">
        <FileUploadInput
          label="Select Video"
          accept="video/*"
          media={video}
          setMedia={setVideo}
        />

        <FileUploadInput
          label="Select Thumbnail"
          accept="image/*"
          media={thumbnail}
          setMedia={setThumbnail}
        />

        <div className="space-y-2">
          <Input
            {...register("title", { required: "Title is required" })}
            placeholder="Video title"
            disabled={isSubmitting}
          />
          {errors.title && <FormError message={errors.title.message} />}
        </div>

        <div className="space-y-2">
          <Input
            {...register("description", { required: "Description is required" })}
            placeholder="Video description"
            disabled={isSubmitting}
          />
          {errors.description && <FormError message={errors.description.message} />}
        </div>

        {isSubmitting && <Progress value={uploadProgress} className="my-4" />}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Publishing..." : "Publish"}
        </Button>
      </form>
    </section>
  );
}

const FormError = ({ message }: { message?: string }) => (
  <p className="text-xs text-destructive">{message}</p>
);