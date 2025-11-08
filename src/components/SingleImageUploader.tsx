/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertCircleIcon, Camera, ImageUpIcon} from 'lucide-react';

import { useFileUpload } from '@/hooks/use-file-upload';
import { useEffect } from 'react';

export default function SingleImageUploader({
  setImage,
  userProfile,
}: {
  setImage: any;
  userProfile: any;
}) {
  const maxSizeMB = 5;
  const maxSize = maxSizeMB * 1024 * 1024; 

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      getInputProps,
    },
  ] = useFileUpload({
    accept: 'image/*',
    maxSize,
  });

  useEffect(() => {
    setImage(files[0]?.file);
  }, [files]);

  const previewUrl = files[0]?.preview || userProfile || null;

  return (
    <div className="flex flex-col gap-2">
      <h2 className='text-black dark:text-white'>Update Your Profile</h2>
      <div className="relative">
        {/* Drop area */}
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="  data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-36 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px] border-gray-300 dark:border-gray-600"
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload file"
          />
          {previewUrl ? (
            <div className=" inset-0 relative">
              <img
                src={previewUrl}
                alt={files[0]?.file?.name || 'Uploaded image'}
                className="w-36 h-36 rounded-full mx-auto mb-4 border-4 border-slate-200 dark:border-slate-600 shadow-md"
              />
              <span>
                <Camera className='absolute right-0 top-[60%] text-black dark:text-white' />
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-3 text-center">
              <div
                className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border text-gray-300 dark:text-gray-700"
                aria-hidden="true"
              >
                <ImageUpIcon className="size-4 opacity-60 text-black dark:text-white" />
              </div>
              <p className="mb-1.5 text-sm font-medium text-black dark:text-white">
                Drop your image here or click to browse
              </p>
              <p className="text-muted-foreground text-xs">
                Max size: {maxSizeMB}MB
              </p>
            </div>
          )}
        </div>
       
      </div>

      {errors.length > 0 && (
        <div
          className="text-destructive flex items-center gap-1 text-xs"
          role="alert"
        >
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
    </div>
  );
}
