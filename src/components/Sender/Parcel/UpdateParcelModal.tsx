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
import { useUpdateParcelMutation } from '@/redux/features/parcel/parcel.api';
import { X } from 'lucide-react';
import { useEffect, useRef, type FC } from 'react';
import { useForm,  type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { toast } from 'sonner';
import type { Parcel } from '@/types/parcel';

interface UpdateParcelModalProps {
  isOpen: boolean;
  onClose: () => void;
  parcel: Parcel | null;
  onUpdate?: (parcelId: string, payload: any) => void;
  isUpdate?: boolean;
}

// Schema - only updatable fields
const formSchema = z.object({
  receiverEmail: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  phone: z.string().min(1, 'Phone is required'),
  weight: z.number().min(1, 'Weight must be at least 1kg'),
  note: z.string().optional(),
  location: z.enum(['dhaka', 'outside']),
});

type FormSchema = z.infer<typeof formSchema>;

export const UpdateParcelModal: FC<UpdateParcelModalProps> = ({
  isOpen,
  onClose,
  parcel,
  onUpdate,
  isUpdate = false,
}) => {
 const [updateParcel, { isLoading: isApiLoading }] = useUpdateParcelMutation();
  const modalRef = useRef<HTMLDivElement>(null);
  
  
  const isLoading = isUpdate || isApiLoading;

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiverEmail: '',
      address: '',
      phone: '',
      weight: 1,
      note: '',
      location: 'dhaka',
    },
  });

  //  when parcel changes
  useEffect(() => {
    if (parcel && isOpen) {
      //based on fee
      const weight = parcel.parcelDetails.weight;
      const fee = parcel.fee || 0;
      const rate = weight > 0 ? fee / weight : 60;
      const location = rate <= 60 ? 'dhaka' : 'outside';

      form.reset({
        receiverEmail: parcel.receiverEmail,
        address: parcel.parcelDetails.address,
        phone: parcel.parcelDetails.phone,
        weight: parcel.parcelDetails.weight,
        note: parcel.parcelDetails.note || '',
        location,
      });
    }
  }, [parcel, isOpen, form]);

  // Fee 
  const weight = form.watch('weight');
  const location = form.watch('location');
  const rate = location === 'dhaka' ? 60 : 120;
  const fee = weight * rate;

  const onSubmit: SubmitHandler<FormSchema> = async data => {
    if (!parcel) return;

    const calculatedRate = data.location === 'dhaka' ? 60 : 120;
    const calculatedFee = data.weight * calculatedRate;

    if (calculatedFee <= 0) {
      toast.error('Delivery fee must be greater than 0');
      return;
    }

    const payload = {
      receiverEmail: data.receiverEmail,
      parcelDetails: {
        address: data.address,
        phone: data.phone,
        weight: data.weight,
        note: data.note || '',
      },
      fee: calculatedFee,
    };

    // console.log('Update Payload:', payload);
    // console.log('Parcel ID:', parcel._id);


    if (onUpdate) {
      try {
        await onUpdate(parcel._id, payload);
        
      } catch (error) {
        console.error('Update failed:', error);
      }
      return;
    }

    
    try {
      const res = await updateParcel({
        id: parcel._id,
        payload: payload,
      }).unwrap();

      // console.log('API Response:', res);

      if (res.success) {
        toast.success('Parcel Updated Successfully');
        form.reset();
        onClose();
      }
    } catch (error: any) {
      // console.error('API Error:', error);
      toast.error(error?.data?.message || 'Failed to update parcel');
    }
  };

 



  if (!isOpen || !parcel) return null;


  return (
    <div className="fixed inset-0 bg-[#00000051] bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300 dark:border-gray-700">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Update Parcel
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Tracking ID: {parcel.trackingId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
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
              name="receiverEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-black dark:text-white">
                    Receiver Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                      className="text-black dark:text-white"
                    />
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
                  <FormLabel className="text-black dark:text-white">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="text-black dark:text-white"
                      placeholder="Enter Receiver Address"
                      {...field}
                    />
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
                  <FormLabel className="text-black dark:text-white">
                    Phone
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter Phone Number"
                      {...field}
                      className="text-black dark:text-white"
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
                  <FormLabel className="text-black dark:text-white">
                    Delivery Location
                  </FormLabel>
                  <FormControl className="w-full">
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full text-black dark:text-white">
                        <SelectValue placeholder="Select Location" />
                      </SelectTrigger>
                      <SelectContent 
                        className="w-full"
                        position="popper"
                        sideOffset={5}
                      >
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
                  <FormLabel className="text-black dark:text-white">
                    Weight (kg)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Weight"
                      {...field}
                      value={field.value ?? ''}
                      onChange={e => field.onChange(e.target.valueAsNumber)}
                      className="text-black dark:text-white"
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
                  <FormLabel className="text-black dark:text-white">
                    Note (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="text-black dark:text-white"
                      placeholder="Enter Note"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Fee  */}
            <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Delivery Fee:
                </span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {fee} TK
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 rounded-md border bg-gray-200 dark:bg-stone-800 border-gray-400 dark:border-gray-700 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-stone-700 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 rounded-md border bg-indigo-600 dark:bg-indigo-500 border-indigo-700 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Updating...
                  </>
                ) : (
                  'Update Parcel'
                )}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};