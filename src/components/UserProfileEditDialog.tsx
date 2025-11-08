/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import type { IUser } from '@/types/user';
import { useUpdatePublicUserMutation } from '@/redux/features/user/user.api';
import { toast } from 'sonner';
import { useState } from 'react';
import SingleImageUploader from './SingleImageUploader';

interface userProps {
  user: IUser;
}

export function UserProfileEditDialog({ user }: userProps) {

  const [isUpdate,setIsUpdate] = useState(false)
  const [image, setImage] = useState(null);
  const form = useForm({
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
    },
  });

  const [updateProfile] = useUpdatePublicUserMutation();

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([key, value]) => value !== user[key as keyof IUser]
      )
    );

    if (Object.keys(filteredData).length === 0 && !image) {
      toast.info('No changes detected!');
      return;
    }

    const formData = new FormData();

    if (image) {
      formData.append('picture', image);
    }
    if (Object.keys(filteredData).length > 0) {
      formData.append('data', JSON.stringify(filteredData));
    }

    try {
      setIsUpdate(true);
      const res = await updateProfile({
        id: user._id,
        payload: formData,
      }).unwrap();

      setIsUpdate(false);
      setImage(null);

      if (res.success) {
        toast.success('Profile updated successfully!');
      }
    } catch (error: any) {
      if (error) {
        toast.error(error?.data?.errorSources[0]?.message);
      }

      setIsUpdate(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          
          className="absolute border py-1 px-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 border-gray-400 dark:border-gray-600 text-black dark:text-white active:scale-95 top-2 right-2 cursor-pointer rounded "
        >
          Edit
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] max-h-[500px] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <SingleImageUploader setImage={setImage} userProfile={user?.picture} />
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black dark:text-white'>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black dark:text-white'>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black dark:text-white'>Full Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <button className='py-1 px-2 border text-black dark:text-white shadow-sm font-medium bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-md'>Cancel</button>
              </DialogClose>
              <button type="submit" className='py-1 px-2 border text-white  dark:text-black shadow-sm font-medium bg-gray-800 dark:bg-gray-50 border-gray-700 dark:border-gray-200 rounded-md'>
                {isUpdate ? 'Saving...' : 'Save changes'}
              </button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
