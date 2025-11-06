

export default function TestimonialsSection() {
    const testimonials = [
              {
                quote:
                  'The service is incredibly fast and reliable. My packages always arrive on time and in perfect condition. The tracking feature is a huge plus!',
                name: 'Anika Rahman',
                role: 'Online Seller',
                avatar:
                  'https://images.pexels.com/photos/4342352/pexels-photo-4342352.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              },
              {
                quote:
                  'As a frequent receiver of parcels, I appreciate the professionalism of their delivery staff. They are always courteous and punctual.',
                name: 'Kamal Hossain',
                role: 'Receiver',
                avatar:
                  'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              },
              {
                quote:
                  'Booking a delivery is so simple with their app. It saves me a lot of time and effort. Highly recommended for any business!',
                name: 'Fatima Begum',
                role: 'Small Business Owner',
                avatar:
                  'https://images.pexels.com/photos/4498509/pexels-photo-4498509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
              },
            ]

  return (
     <div >

            <section className="py-20 bg-gradient-to-br from-blue-100 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-gray-800 dark:to-slate-900">
                <div className="w-11/12 max-w-7xl mx-auto">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            What Our Customers Say
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                            Don't just take our word for it - hear from our satisfied customers
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-blue-50 dark:bg-gray-600/50 border border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700 hover:scale-105 transition-all duration-300 p-8 rounded-xl shadow-lg flex flex-col"
              >
                <p className="text-gray-600 dark:text-gray-300 mb-6 italic flex-grow">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center">
                  <img
                    className="w-14 h-14 rounded-full mr-4 object-cover"
                    src={testimonial.avatar}
                    alt={testimonial.name}
                  />
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-indigo-700 dark:text-indigo-400 font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
                    </div>
                </div>
            </section>

        
        </div>
  );
}
