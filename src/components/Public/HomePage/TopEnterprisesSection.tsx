

type Brand = {
  name: string;
  logo: string;
};

export function TopEnterprisesSection() {
  const brands: Brand[] = [
    { name: "Aarong",    logo: "/src/assets/arong.png" },
    { name: "Bata",      logo: "/src/assets/bata.jpg" },
    { name: "Daraz",     logo: "/src/assets/daraz.png" },
    { name: "Rokomari",  logo: "/src/assets/rokomari.png" },
    { name: "Sailor",    logo: "/src/assets/sailor.png" },
    { name: "Shajgoj",    logo: "/src/assets/shajgoj.png" },
    { name: "Apex",      logo: "/src/assets/apex.png" },
    { name: "Ribana",    logo: "/src/assets/ribana.png" },
  ];

  const sliderBrands = [...brands, ...brands];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-purple-100 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 overflow-hidden">

      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 text-indigo-600 dark:text-indigo-300 mb-4">
            Our Partners
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold  mb-3 text-foreground">
            Trusted by Leading Brands
          </h2>
          <p className="text-muted-foreground text-lg font-medium ">
            Bangladesh's top businesses trust us for reliable delivery
          </p>
        </div>

        {/* Slider wrapper with fade edges */}
        <div className="relative overflow-hidden">

          {/* Left fade */}
          <div className="fade-left absolute left-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none" />
          {/* Right fade */}
          <div className="fade-right absolute right-0 top-0 bottom-0 w-20 md:w-32 z-10 pointer-events-none" />

          <div className="flex animate-marquee gap-5 w-max py-3">
            {sliderBrands.map((brand, index) => (
              <div
                key={index}
                className="brand-card h-20 w-36 sm:h-24 sm:w-44  rounded-2xl flex items-center justify-center shadow-sm border border-gray-50 dark:border-gray-700 cursor-pointer flex-shrink-0 px-4"
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-12 max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat strip */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16">
          {[
            { value: "500+", label: "Enterprise Clients" },
            { value: "99.8%", label: "On-time Delivery" },
            { value: "64", label: "Districts Covered" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}