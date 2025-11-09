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
import { type FC } from 'react';
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

  // fee calculation
  const weight = form.watch('weight');
  const location = form.watch('location');
  const rate = location === 'dhaka' ? 60 : 120;
  const fee = weight * rate;

  const onSubmit: SubmitHandler<FieldValues> = async data => {
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
        onClose();
      }
    } catch (error: any) {
      toast.error(error.data.message)
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000051] bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
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
                  <FormLabel>Receiver Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
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
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter Receiver Address" {...field} />
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
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Phone Number"
                      {...field}
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
                  <FormLabel>Delivery Location</FormLabel>
                  <FormControl className='w-full'>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder="Select Location" />
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
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Weight"
                      {...field}
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
                  <FormLabel>Note (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter Note" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fee Preview */}
            <div className="text-right text-lg font-semibold text-gray-700 dark:text-gray-300">
              Delivery Fee: {fee} ৳
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button type="button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit">Add Parcel</button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
