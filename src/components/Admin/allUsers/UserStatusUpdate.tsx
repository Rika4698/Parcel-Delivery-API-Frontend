/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { toast } from 'sonner';
import { useUpdateUserMutation } from '@/redux/features/user/user.api';
import type { IUser } from '@/types/user';

const formSchema = z.object({
  isActive: z.enum(['ACTIVE', 'INACTIVE', 'BLOCKED']),
});

type FormValues = z.infer<typeof formSchema>;

export function UpdateUserStatusDialog({ user }: { user: IUser }) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isActive: user.isActive,
    },
  });
  

  const [updateUser] = useUpdateUserMutation();

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      await updateUser({ id: user._id, payload: data }).unwrap();
      toast.success(`User status changed to ${data.isActive}`);
      setOpen(false); 
    } catch (error: any) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className=' text-purple-600 font-medium dark:text-purple-400 cursor-pointer ' title='User Status'>Change</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Update User Status</DialogTitle>
              <DialogDescription>
                Change the status of the user. Click save when done.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 mt-4">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-gray-800 dark:text-gray-400'>Status</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        
                      >
                        <SelectTrigger className="w-full text-gray-800 dark:text-white">
                          <SelectValue  placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className='text-gray-800 dark:text-white' value="ACTIVE">Active</SelectItem>
                          <SelectItem value="INACTIVE">Inactive</SelectItem>
                          <SelectItem value="BLOCKED">Blocked</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="mt-6">
              <DialogClose asChild>
                <button className='p-3 bg-gray-300 dark:bg-gray-700 rounded-sm font-medium text-black dark:text-white'>Cancel</button>
              </DialogClose>
              <button type="submit" className='p-3 bg-purple-600 dark:bg-purple-500 rounded-sm font-medium text-white'>Save changes</button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
