/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send,
    Headphones,
    HelpCircle,
    CheckCircle,
    User,
    
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { toast } from 'sonner';
import { useContactMutation } from '@/redux/features/contact/contact.api';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const Contact = () => {

 const [isSubmitting, setIsSubmitting] = useState(false);
 
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });
  const [contactUs, {isLoading}] = useContactMutation();
  
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Sending message...');
    try {
      await contactUs(data).unwrap();
      toast.success('Message sent successfully!', { id: toastId });
      form.reset();
      
    } catch (error) {
      toast.error('Failed to send message. Please try again later.', { id: toastId });
      
    } finally {
      setIsSubmitting(false);
      
    }
    console.log(data);
  };



    const contactInfo = [
        {
            icon: <Phone className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
            title: "Phone",
            details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
            description: "Call us for immediate assistance"
        },
        {
            icon: <Mail className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
            title: "Email",
            details: ["support@delivo.com", "info@delivo.com"],
            description: "Send us an email anytime"
        },
        {
            icon: <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
            title: "Office",
            details: ["123 Delivery Street", "Logistics District, LD 123456"],
            description: "Visit our headquarters"
        },
        {
            icon: <Clock className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
            title: "Hours",
            details: ["Mon-Fri: 8:00 AM - 8:00 PM", "Sat-Sun: 9:00 AM - 6:00 PM"],
            description: "We're here when you need us"
        }
    ];

 
    const faqs = [
        {
            question: "How can I track my parcel?",
            answer: "You can track your parcel using the tracking number provided when you create a delivery request. Simply enter the tracking number on our tracking page."
        },
        {
            question: "What are your delivery times?",
            answer: "Standard delivery is 2-3 business days within the same city, 3-5 business days for inter-city delivery, and 5-7 business days for remote areas."
        },
        {
            question: "Do you offer insurance for packages?",
            answer: "Yes, we offer package insurance for valuable items. You can select insurance options when creating your delivery request."
        },
        {
            question: "Can I cancel my delivery request?",
            answer: "You can cancel your delivery request if the package hasn't been picked up yet. Once picked up, cancellation may incur additional charges."
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-blue-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 py-32 sm:py-40">

                <div className="container mx-auto px-4">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-blue-200/30 dark:bg-blue-600/30   blur-2xl rounded-full"></div>
                        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-purple-400/20 dark:bg-purple-800/20  blur-2xl rounded-full"></div>
                    </div>
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <div className="space-y-4">
                            <Badge variant="secondary" className="w-fit mx-auto animate-bounce border border-purple-600 dark:border-purple-400">

                                Get in Touch
                            </Badge>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-white  leading-tight">
                                We're Here to
                                <span className="text-purple-700 dark:text-purple-400"> Help</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mt-16 font-medium">
                                Have questions about our services? Need support with your delivery?
                                We're here to assist you every step of the way.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info Section */}
            <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-stone-800 dark:to-gray-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold text-foreground">Contact Information</h2>
                                <p className="text-muted-foreground font-medium">
                                    Reach out to us through any of these channels. We're here to help!
                                </p>
                            </div>

                            <div className="space-y-6">
                                {contactInfo.map((info, index) => (
                                    <Card key={index} className="hover:shadow-lg  transition-shadow duration-300 border border-purple-200 dark:border-gray-600   hover:border hover:border-purple-500 dark:hover:border-purple-500">
                                        <CardContent className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-purple-600/10  dark:bg-purple-400/10 rounded-full flex items-center justify-center">
                                                    {info.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-lg font-semibold text-foreground mb-2">{info.title}</h3>
                                                    <div className="space-y-1">
                                                        {info.details.map((detail, idx) => (
                                                            <p key={idx} className="text-foreground font-medium">{detail}</p>
                                                        ))}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mt-2">{info.description}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Quick Actions */}
                            <Card className="bg-purple-500/5 dark:bg-purple-800/5 border border-purple-600/20 dark:border-purple-300/20">
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <h3 className="text-lg font-semibold text-foreground">Need Immediate Help?</h3>
                                        <div className="space-y-3 ">
                                            <button className="w-full justify-start rounded-md flex  border border-purple-600/20 dark:border-purple-300/20 bg-purple-50 dark:bg-purple-400/5 hover:bg-purple-500 dark:hover:bg-purple-400 hover:text-black">
                                                <Headphones className="h-4 w-4 mr-2 my-2 ml-3" />
                                              <span className='mt-1'>Live Chat Support</span>  
                                            </button>
                                            <button className="w-full justify-start  rounded-md flex  border border-purple-600/20 dark:border-purple-300/20 bg-purple-50 dark:bg-purple-400/5 hover:bg-purple-500 dark:hover:bg-purple-400 hover:text-black">
                                                <HelpCircle className="h-4 w-4 mr-2 my-2 ml-3" />
                                              <span className='mt-1'>View Help Center</span>  
                                            </button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>



                        {/* Contact Form */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-3xl font-bold text-foreground">Send us a Message</h2>
                                <p className="text-muted-foreground font-medium">
                                    Fill out the form below and we'll get back to you as soon as possible.
                                </p>
                            </div>

                            <Card className='border border-purple-200 dark:border-gray-600   '>
                                <CardContent className="p-6">
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        {/* Full Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                Full Name *
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...field}
                    id="name"
                    type="text"
                    required
                    className="pl-10"
                    placeholder="Enter your full name"
                  />
                </div>
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
              <FormLabel className="text-sm font-medium text-foreground">
                Email Address *
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    required
                    className="pl-10"
                    placeholder="Enter your email"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Subject */}
      <FormField
        control={form.control}
        name="subject"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-foreground">
              Subject *
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                id="subject"
                type="text"
                required
                placeholder="What's this about?"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Message */}
      <FormField
        control={form.control}
        name="message"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-foreground">
              Message *
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                id="message"
                required
                placeholder="Tell us about your message..."
                className="min-h-[120px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || isSubmitting}
        className="w-full p-1 rounded-md flex justify-center border border-purple-600/20 dark:border-purple-300/20 bg-purple-600 dark:bg-purple-400 hover:bg-purple-500 dark:hover:bg-purple-500 text-white dark:text-black"
      >
        {isLoading || isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white dark:border-black mr-2"></div>
            Sending Message...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-5 my-2 ml-3" />
            <span className="mt-0.5">Send Message</span>
          </>
        )}
      </button>
    </form>
  </Form>
</CardContent>
                            </Card>
                        </div>


                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-stone-800">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Find quick answers to common questions about our services
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {faqs.map((faq, index) => (
                                <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border border-blue-200 dark:border-gray-600   hover:border hover:border-blue-500 dark:hover:border-blue-500">
                                    <CardContent className="p-6">
                                        <div className="space-y-3">
                                            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                                <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                {faq.question}
                                            </h3>
                                            <p className="text-muted-foreground">{faq.answer}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-400 to-purple-600 dark:from-blue-300  dark:to-purple-400">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground">
                                Still Have Questions?
                            </h2>
                            <p className="text-lg text-gray-200 dark:text-gray-700 font-medium">
                                Our customer support team is available 24/7 to assist you with any inquiries
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
 
  <button
    onClick={() => (window.location.href = 'tel:+15551234567')}
    className="flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium border border-gray-300 rounded-xl
               bg-white text-gray-800 hover:bg-gray-100 transition-colors duration-300
               dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 shadow-md"
  >
    <Phone className="h-5 w-5" />
    <span>Call Us Now</span>
  </button>


  <button
    onClick={() => (window.location.href = 'mailto:support@delivo.com')}
    className="flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium rounded-xl
               border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-purple-600  dark:hover:text-purple-400 transition-colors duration-300
                shadow-md"
  >
    <Mail className="h-5 w-5" />
    <span>Email Support</span>
  </button>
</div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;