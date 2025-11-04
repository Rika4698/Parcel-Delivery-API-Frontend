import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Package,
    Truck,
    Shield,
    Users,
    Target,
    Heart,
    Award,
    Globe,
    Clock,
    CheckCircle,
    Star
} from 'lucide-react';

const About = () => {
    const values = [
        {
            icon: <Shield className="h-8 w-8  text-purple-600 dark:text-purple-400" />,
            title: "Security First",
            description: "We prioritize the safety and security of every package in our care, implementing advanced tracking and handling protocols."
        },
        {
            icon: <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
            title: "Reliability",
            description: "Consistent, on-time delivery is our promise. We maintain the highest standards of service reliability across all operations."
        },
        {
            icon: <Heart className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
            title: "Customer Care",
            description: "Every customer interaction matters. We provide personalized support and go the extra mile to exceed expectations."
        },
        {
            icon: <Award className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
            title: "Excellence",
            description: "We continuously improve our services and technology to deliver the best possible parcel delivery experience."
        }
    ];

    const team = [
        {
            name: "Sarah Johnson",
            role: "CEO & Founder",
            bio: "With over 15 years in logistics, Sarah founded Delivo to revolutionize package delivery.",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
            expertise: "Logistics Strategy"
        },
        {
            name: "Michael Chen",
            role: "CTO",
            bio: "Technology innovator leading our digital transformation and real-time tracking systems.",
            image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400&h=400&fit=crop",
            expertise: "Technology Innovation"
        },
        {
            name: "Emily Rodriguez",
            role: "Head of Operations",
            bio: "Operations expert ensuring smooth delivery processes and exceptional customer service.",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
            expertise: "Operations Management"
        },
        {
            name: "David Kim",
            role: "Head of Customer Success",
            bio: "Customer advocate focused on building lasting relationships and improving user experience.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            expertise: "Customer Experience"
        }
    ];
    const milestones = [
        {
            year: "2020",
            title: "Company Founded",
            description: "Delivo was established with a vision to transform package delivery."
        },
        {
            year: "2021",
            title: "First 10,000 Deliveries",
            description: "Reached our first major milestone with 10,000 successful package deliveries."
        },
        {
            year: "2022",
            title: "Technology Platform Launch",
            description: "Launched our advanced real-time tracking and management platform."
        },
        {
            year: "2023",
            title: "National Expansion",
            description: "Expanded services to cover 50+ cities across the country."
        },
        {
            year: "2024",
            title: "100,000+ Deliveries",
            description: "Celebrated over 100,000 successful deliveries with 99.9% success rate."
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-blue-50 to-purple-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 py-32 sm:py-40">
                <div className="container mx-auto px-4">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] bg-purple-500/20 dark:bg-purple-700/20  blur-2xl rounded-full"></div>
                        <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] bg-blue-300/30 dark:bg-blue-500/30 blur-2xl rounded-full"></div>
                    </div>
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        <div className="space-y-4">
                            <Badge variant="secondary" className="w-fit mx-auto animate-bounce border border-blue-600 dark:border-blue-400">

                                About Delivo
                            </Badge>
                            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-blue-500 to-cyan-600 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-300 leading-tight">
                                Your Packages,
                                <span> Our Priority</span>


                            </h1>
                            <p className="text-sm sm:text-lg md:text-xl font-semibold text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-16">
                                At <span className="text-blue-500 dark:text-blue-300 font-semibold underline">Delivo</span>, we make sure every parcel is handled with care. From doorstep pickup to secure delivery, our goal is to make sending and receiving packages simple, fast, and stress-free for everyone.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-100 dark:from-gray-800 dark:to-slate-900">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Our Mission</h2>
                                </div>
                                <p className="text-lg text-gray-500 dark:text-gray-400 font-semibold">
                                    To revolutionize package delivery by providing fast, secure, and reliable services
                                    that connect people and businesses across the nation. We strive to make every
                                    delivery experience seamless and stress-free.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Our Vision</h2>
                                </div>
                                <p className="text-lg text-gray-500 dark:text-gray-400 font-semibold">
                                    To become the most trusted and innovative parcel delivery service, setting new
                                    standards for speed, security, and customer satisfaction in the logistics industry.
                                </p>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-slate-700 dark:to-gray-800 rounded-3xl blur-3xl"></div>
                            <Card className="relative bg-blue-100/50 dark:bg-gray-900/50 backdrop-blur-sm border-2 border-blue-700/10  dark:border-blue-400/20">
                                <CardContent className="p-8">
                                    <div className="space-y-6">
                                        <div className="text-center space-y-4">
                                            <div className="mx-auto w-20 h-20 bg-blue-700/10 dark:bg-blue-400/10 rounded-full flex items-center justify-center">
                                                <Package className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-foreground">Why Choose Us?</h3>
                                        </div>

                                        <div className="space-y-4 font-medium text-lg">
                                            <div className="flex items-center gap-3  ">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <span className="text-foreground">Real-time tracking technology</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <span className="text-foreground">99.9% delivery success rate</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <span className="text-foreground">24/7 customer support</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <span className="text-foreground">Secure handling protocols</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                                <span className="text-foreground">Nationwide coverage</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gradient-to-tl from-purple-200 to-blue-50 dark:from-stone-800 dark:to-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            Our Core Values
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            These fundamental principles guide everything we do and shape our company culture
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <Card key={index} className="hover:shadow-lg border border-purple-200 dark:border-gray-600 transition-all duration-300 group  text-center hover:border hover:border-purple-500 dark:hover:border-purple-500">
                                <CardContent className="p-6 space-y-4 ">
                                    <div className="mx-auto w-16 h-16 bg-purple-700/10 dark:bg-purple-400/10  rounded-full flex items-center justify-center   group-hover:scale-110 transition-transform duration-300">
                                        {value.icon}
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-semibold text-foreground">{value.title}</h3>
                                        <p className="text-muted-foreground font-medium">{value.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gradient-to-bl from-blue-100 to-purple-100 dark:from-gray-800 dark:to-neutral-900">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            Meet Our Team
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            The passionate professionals behind Parcel Nexus's success
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <Card
                                key={index}
                                className="hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-blue-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg"
                            >
                                <CardContent className="p-6 text-center space-y-4">
                                    <div className="mx-auto w-32 h-32 rounded-full overflow-hidden shadow-lg border-4 border-blue-100 dark:border-gray-700">
                                        <img
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                            src={member.image}
                                            alt={member.name}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                                        <p className="text-blue-700 dark:text-blue-400 font-medium">{member.role}</p>
                                        <Badge variant="outline" className="text-sm font-medium border border-gray-300 dark:border-gray-600">{member.expertise}</Badge>
                                        <p className="text-muted-foreground text-base">{member.bio}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Company Timeline */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-100 dark:from-neutral-800 dark:to-gray-800">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            Our Journey
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Key milestones in our company's growth and development
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            {milestones.map((milestone, index) => (
                                <div key={index} className="flex items-start gap-6">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-purple-600 dark:bg-purple-400 rounded-full flex items-center justify-center">
                                            <span className="text-lg font-bold text-primary-foreground">{milestone.year}</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 pt-2">
                                        <h3 className="text-xl font-semibold text-foreground mb-2">{milestone.title}</h3>
                                        <p className="text-muted-foreground font-medium ">{milestone.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-l from-blue-100 to-purple-50 dark:from-stone-800 dark:to-gray-800">
                <div className="container mx-auto px-4">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                            Our Impact
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                            Numbers that reflect our commitment to excellence
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-blue-700/10 dark:bg-blue-400/10 rounded-full flex items-center justify-center">
                                <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">100,000+</p>
                                <p className="text-muted-foreground font-medium">Packages Delivered</p>
                            </div>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-blue-700/10 dark:bg-blue-400/10 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">99.9%</p>
                                <p className="text-muted-foreground font-medium">Success Rate</p>
                            </div>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-blue-700/10 dark:bg-blue-400/10 rounded-full flex items-center justify-center">
                                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">50,000+</p>
                                <p className="text-muted-foreground font-medium">Happy Customers</p>
                            </div>
                        </div>
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 bg-blue-700/10 dark:bg-blue-400/10 rounded-full flex items-center justify-center">
                                <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="space-y-2">
                                <p className="text-3xl sm:text-4xl font-bold text-blue-600 dark:text-blue-400">50+</p>
                                <p className="text-muted-foreground font-medium">Cities Covered</p>
                            </div>
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
                                Ready to Experience Excellence?
                            </h2>
                            <p className="text-lg text-gray-200 dark:text-gray-700 font-medium">
                                Join thousands of satisfied customers who trust Parcel Nexus for their delivery needs
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="/register"
                                className="inline-flex items-center justify-center px-8 py-6 text-lg font-medium rounded-md bg-background text-foreground hover:bg-background/90 transition-colors"
                            >
                                Get Started Today
                                <Star className="h-5 w-5 ml-2" />
                            </a>
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center px-8 py-6 text-lg font-medium rounded-md border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-purple-600  dark:hover:text-purple-400 transition-colors"
                            >
                                Contact Us
                                <Truck className="h-5 w-5 ml-2" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;