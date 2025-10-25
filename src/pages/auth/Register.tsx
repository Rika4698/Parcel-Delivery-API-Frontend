/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import envData from "@/config/envData";
import {
  useRegisterMutation,
  useUserInfoQuery,
} from "@/redux/features/auth/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import {
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

// ✅ Form validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const Register = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useUserInfoQuery(undefined);

  if (data?.data) {
    navigate("/");
  }

  const [isVisible, setIsVisible] = useState(false);
  const [role, setRole] = useState<"SENDER" | "RECEIVER">("SENDER");

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const [registerUser] = useRegisterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    setIsLoading(true);
    try {
      const payload = { ...formData, role };
      const res = await registerUser(payload).unwrap();
      setIsLoading(false);
      if (res.success) {
        toast.success("Account Created Successfully");
        navigate("/login");
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white dark:bg-gray-900 overflow-x-hidden">
      {/* ===== LEFT: FORM SECTION ===== */}
      <div className="flex items-center justify-center px-6 py-12 lg:px-12">
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
          <p className="mt-6 text-xl font-bold tracking-tight text-gray-800 dark:text-white">
            Register in to Delivo
          </p>

          {/* Google Sign-in */}
           <button
                      onClick={() => window.open(`${envData.baseUrl}/auth/google`)}
                      className="mt-8 w-full  rounded-lg py-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-black"
                    >
                      <GoogleLogo />
                      <span className='ml-3 font-semibold'>Continue with Google</span> 
                    </button>

          {/* Divider */}
        <div className="my-7 w-full flex items-center justify-center overflow-hidden">
            <Separator />
            <span className="text-sm px-2 text-black
            dark:text-white">OR</span>
            <Separator />
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              className="w-full space-y-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-black dark:text-gray-200'>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Your Name"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-black dark:text-gray-200'>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='text-black dark:text-gray-200'>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={isVisible ? "text" : "password"}
                          placeholder="Enter password"
                          {...field}
                          className="w-full"
                        />
                        <button
                          type="button"
                          onClick={toggleVisibility}
                          className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                        >
                          {isVisible ? (
                            <EyeOffIcon size={18} />
                          ) : (
                            <EyeIcon size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                  Register as
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-black dark:text-gray-200">
                    <input
                      type="radio"
                      name="role"
                      value="SENDER"
                      checked={role === "SENDER"}
                      onChange={() => setRole("SENDER")}
                      className="accent-indigo-500"
                    />
                    Sender
                  </label>
                  <label className="flex items-center gap-2 text-black dark:text-gray-200">
                    <input
                      type="radio"
                      name="role"
                      value="RECEIVER"
                      checked={role === "RECEIVER"}
                      onChange={() => setRole("RECEIVER")}
                      className="accent-indigo-500"
                    />
                    Receiver
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-4 w-full font-semibold rounded-lg p-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-black"
              >
                {isLoading ? "Creating Account..." : "Continue with Email"}
              </button>
            </form>
          </Form>

          <div className="mt-6 text-center space-y-3">
            <Link
              to="#"
              className="text-sm block underline text-muted-foreground text-center"
            >
              Forgot your password?
            </Link>
            <p className="text-sm text-gray-700 dark:text-gray-100">
              Already have an account?
              <Link
                to="/login"
                className="ml-1 underline text-gray-500 dark:text-gray-400 hover:text-blue-400 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* ===== RIGHT: IMAGE SECTION ===== */}
      <div className="hidden lg:block">
        <img
          src="https://i.ibb.co/YByRGLk9/profile-view-attractive-young-delivery-guy-with-some-packages-waiting-door-open.jpg"
          alt="Delivery guy"
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
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="inline-block"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M15.6823 8.18368C15.6823 7.63986 15.6382 7.0931 15.5442 6.55811H7.99829V9.63876H12.3194C12.1401 10.6323 11.564 11.5113 10.7203 12.0698V14.0687H13.2983C14.8122 12.6753 15.6823 10.6176 15.6823 8.18368Z"
        fill="#4285F4"
      />
      <path
        d="M7.99812 16C10.1558 16 11.9753 15.2915 13.3011 14.0687L10.7231 12.0698C10.0058 12.5578 9.07988 12.8341 8.00106 12.8341C5.91398 12.8341 4.14436 11.426 3.50942 9.53296H0.849121V11.5936C2.2072 14.295 4.97332 16 7.99812 16Z"
        fill="#34A853"
      />
      <path
        d="M3.50665 9.53295C3.17154 8.53938 3.17154 7.4635 3.50665 6.46993V4.4093H0.849292C-0.285376 6.66982 -0.285376 9.33306 0.849292 11.5936L3.50665 9.53295Z"
        fill="#FBBC04"
      />
      <path
        d="M7.99812 3.16589C9.13867 3.14825 10.241 3.57743 11.067 4.36523L13.3511 2.0812C11.9048 0.723121 9.98526 -0.0235266 7.99812 -1.02057e-05C4.97332 -1.02057e-05 2.2072 1.70493 0.849121 4.40932L3.50648 6.46995C4.13848 4.57394 5.91104 3.16589 7.99812 3.16589Z"
        fill="#EA4335"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="15.6825" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export default Register;
