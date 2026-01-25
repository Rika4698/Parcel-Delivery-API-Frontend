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
import { Separator } from '@/components/ui/separator';
import envData from '@/config/envData';
import { useLoginMutation, useUserInfoQuery } from '@/redux/features/auth/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const getRoleDefaultRoute = (role: string): string => {
  switch (role) {
    case 'ADMIN':
    case 'superAdmin':
      return '/admin/analytics';
    case 'SENDER':
      return '/sender/parcels';
    case 'RECEIVER':
      return '/receiver/incoming-parcels';
    default:
      return '/';
  }
};


const LogIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState<boolean>(false);
  // const pathname = useLocation()
  const {data} = useUserInfoQuery(undefined)
  const navigate = useNavigate();
 const location = useLocation();
  // Get the previous location from state (where user was before logout)
  const from = (location.state as any)?.from || null;
  
    // Redirect if user is already logged in
   useEffect(() => {
    if (data?.data && location.pathname === '/login') {
      const userRole = data.data.role;
      
      // If there's a previous location, go there, otherwise go to default dashboard
      if (from) {
        navigate(from, { replace: true });
      } else {
        const redirectPath = getRoleDefaultRoute(userRole);
        navigate(redirectPath, { replace: true });
      }
    }
  }, [data, location.pathname, navigate, from]);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const [LoginMutation] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    setIsLoading(true)
    
     try {
    const userinfo = {
      email: data.email,
      password: data.password,
    };

    const res = await LoginMutation(userinfo).unwrap();

    if (res.success) {
      toast.success('Login Successfully');
      // Redirect based on user role
        const userRole = res.data?.role;

        if (from) {
          navigate(from, { replace: true });
        } else {
          const redirectPath = getRoleDefaultRoute(userRole);
          navigate(redirectPath, { replace: true });
        }
    }
  } catch (error: any) {
    // Error from backend
    if (error?.data?.message) {
      toast.error(error.data.message);
    } else if (error?.message) {
      toast.error(error.message);
    } else {
      toast.error('Something went wrong. Please try again.');
    }
  } finally {
    setIsLoading(false);
  }
  };


  const handleClickLogin = (email: string, password: string) => {
    // Pre-fill login form for specific roles
    onSubmit({ email, password });
  };


  
  const toggleVisibility = () => setIsVisible(prevState => !prevState);

  return (
   <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-gray-900 overflow-x-hidden">
      {/*LEFT: FORM SECTION */}
      <div className="flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
           <p className="mt-6 text-xl font-bold tracking-tight text-gray-800 dark:text-white">
            Log in to Delivo
          </p>

          <button
            onClick={() => window.open(`${envData.baseUrl}/auth/google`)}
            className="mt-8 w-full  rounded-lg py-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-black"
          >
            <GoogleLogo />
            <span className='ml-3 font-semibold'>Continue with Google</span> 
          </button>

          <div className="my-7 w-full flex items-center justify-center overflow-hidden">
            <Separator />
            <span className="text-sm px-2 text-black
            dark:text-white">OR</span>
            <Separator />
          </div>

          <Form {...form}>
            <form
              className="w-full space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-black dark:text-gray-200'>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-black dark:text-gray-200'>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isVisible ? 'text' : 'password'}
                          placeholder="Password"
                          className="w-full"
                          {...field}
                        />
                        <button
                          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50  dark:text-gray-400  dark:hover:text-white"
                          type="button"
                          onClick={toggleVisibility}
                          aria-label={
                            isVisible ? 'Hide password' : 'Show password'
                          }
                          aria-pressed={isVisible}
                          aria-controls="password"
                        >
                          {isVisible ? (
                            <EyeOffIcon size={16} aria-hidden="true" />
                          ) : (
                            <EyeIcon size={16} aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <button type="submit" className="mt-4 w-full font-semibold rounded-lg p-2 bg-blue-600 dark:bg-blue-400 text-white dark:text-white">
                {isLoading ? 'Checking You...' : ' Continue with Email'}
              </button>
            </form>
          </Form>



          <div className="mt-5 space-y-5">
            <Link
              to="#"
              className="text-sm block underline text-gray-500 dark:text-gray-400 text-center"
            >
              Forgot your password?
            </Link>
            <p className="text-sm text-center text-gray-800 dark:text-white">
              Don&apos;t have an account?
              <Link
                to="/register"
                className="ml-1 underline text-gray-500 dark:text-gray-400 hover:text-blue-400 font-semibold"
              >
                Create Account
              </Link>
            </p>
          </div>

           <div className="mt-8 space-y-4">
          <button
            onClick={() => handleClickLogin("person@gmail.com", "12345678")}
          
            className="mt-4 w-full font-semibold rounded-lg p-2 bg-sky-700 dark:bg-sky-400 text-white dark:text-white border"
            
          >
            Demo Login as Admin
     
            
          </button>

          <button
            onClick={() => handleClickLogin("Samira12@gmail.com", "*Samira12")}
            
             className="mt-4 w-full font-semibold rounded-lg p-2 bg-purple-700 dark:bg-purple-500 text-white dark:text-black border"
           
          >
            Demo Login as Sender
            
          </button>
          <button
            onClick={() => handleClickLogin("Karim12@gmail.com", "*Karim12")}
           
              className="mt-4 w-full font-semibold rounded-lg p-2 bg-green-700 dark:bg-green-500 text-white dark:text-black border"
            
          >
            Demo Login as Receiver
            
         
          </button>
        </div>
        </div>
      </div>



      {/* RIGHT: IMAGE SECTION  */}
      <div className="hidden lg:block">
        <img
          src="https://i.ibb.co.com/67HnCQh6/caucasian-man-receiving-his-order-from-deliverywoman-latin-courier-delivering-order-holding-parcels.jpg"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
};

const GoogleLogo = () => (
  <svg
    width="1.2em"
    height="1.2em"
    id="icon-google"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block shrink-0 align-sub text-[inherit] size-lg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M15.6823 8.18368C15.6823 7.63986 15.6382 7.0931 15.5442 6.55811H7.99829V9.63876H12.3194C12.1401 10.6323 11.564 11.5113 10.7203 12.0698V14.0687H13.2983C14.8122 12.6753 15.6823 10.6176 15.6823 8.18368Z"
        fill="#4285F4"
      ></path>
      <path
        d="M7.99812 16C10.1558 16 11.9753 15.2915 13.3011 14.0687L10.7231 12.0698C10.0058 12.5578 9.07988 12.8341 8.00106 12.8341C5.91398 12.8341 4.14436 11.426 3.50942 9.53296H0.849121V11.5936C2.2072 14.295 4.97332 16 7.99812 16Z"
        fill="#34A853"
      ></path>
      <path
        d="M3.50665 9.53295C3.17154 8.53938 3.17154 7.4635 3.50665 6.46993V4.4093H0.849292C-0.285376 6.66982 -0.285376 9.33306 0.849292 11.5936L3.50665 9.53295Z"
        fill="#FBBC04"
      ></path>
      <path
        d="M7.99812 3.16589C9.13867 3.14825 10.241 3.57743 11.067 4.36523L13.3511 2.0812C11.9048 0.723121 9.98526 -0.0235266 7.99812 -1.02057e-05C4.97332 -1.02057e-05 2.2072 1.70493 0.849121 4.40932L3.50648 6.46995C4.13848 4.57394 5.91104 3.16589 7.99812 3.16589Z"
        fill="#EA4335"
      ></path>
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="15.6825" height="16" fill="white"></rect>
      </clipPath>
    </defs>
  </svg>
);

export default LogIn;
