/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAddParcelMutation } from '@/redux/features/parcel/parcel.api';
import { X } from 'lucide-react';
import { useEffect, useRef, type FC } from 'react';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import z from 'zod';
import { toast } from 'sonner';

interface CreateParcelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Schema
const formSchema = z.object({
  email: z.string().email(),
  address: z.string(),
  phone: z.string(),
  weight: z.coerce.number().min(1, 'Weight must be at least 1kg'),
  note: z.string().optional(),
  location: z.enum(['dhaka', 'outside']),
});

export const CreateParcelModal: FC<CreateParcelModalProps> = ({
  isOpen,
  onClose,
}) => {
 const form = useForm<z.infer<typeof formSchema>>({
  defaultValues: {
    email: '',
    address: '',
    phone: '',
    weight: 1,
    note: '',
    location: "dhaka"
  },
});


  const [addParcel] = useAddParcelMutation();
  const modalRef = useRef<HTMLDivElement>(null);
  // fee calculation
  const weight = form.watch('weight');
  const location = form.watch('location');
  const rate = location === 'dhaka' ? 60 : 120;
  const fee = weight * rate;

  const onSubmit: SubmitHandler<FieldValues> = async data => {

     const rate = location === 'dhaka' ? 60 : 120;
  const fee = data.weight * rate;

  if (fee <= 0) {
    toast.error("Delivery fee must be greater than 0");
    return;
  }
    try {
      const payload = {
        receiverEmail: data.email,
        parcelDetails: {
          address: data.address,
          phone: data.phone,
          weight: data.weight,
          note: data.note,
        },
        fee,
      };

      const res = await addParcel(payload).unwrap();
      if (res.success) {
        toast.success('Parcel Created Successfully');
        form.reset(); 
      onClose();  
      }
    } catch (error: any) {
      toast.error(error.data.message)
    }
  };

  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000051] bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Create New Parcel
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>

        <Form {...form}>
          <form
            className="w-full space-y-4 p-4 max-h-[500px] overflow-hidden overflow-y-scroll"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black dark:text-white'>Receiver Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black dark:text-white'>Address</FormLabel>
                  <FormControl>
                    <Textarea className='text-black dark:text-white' placeholder="Enter Receiver Address" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black dark:text-white'>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Phone Number"
                      {...field} required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location Select */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black dark:text-white'>Delivery Location</FormLabel>
                  <FormControl className='w-full'>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value} required
                
                    >
                      <SelectTrigger className='w-full text-black dark:text-white'>
                        <SelectValue  placeholder="Select Location" />
                      </SelectTrigger>
                      <SelectContent className='w-full'>
                        <SelectItem value="dhaka">Inside Dhaka</SelectItem>
                        <SelectItem value="outside">Outside Dhaka</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Weight */}
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black dark:text-white'>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Weight"
                      {...field} required
                      value={field.value ?? ''}
                      onChange={e => field.onChange(e.target.valueAsNumber)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Note */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-black dark:text-white'>Note (Optional)</FormLabel>
                  <FormControl>
                    <Textarea className='text-black dark:text-white' placeholder="Enter Note" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fee Preview */}
            <div className="text-right text-lg font-semibold text-gray-700 dark:text-gray-300">
              Delivery Fee: {fee} TK
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button type="button" onClick={onClose} className='p-2 rounded-md border bg-gray-200 dark:bg-stone-800 border-gray-400 dark:border-gray-700 text-black dark:text-white'>
                Cancel
              </button>
              <button type="submit" className='p-2 rounded-md border bg-blue-600 dark:bg-blue-500 border-blue-700 text-white '>Add Parcel</button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
