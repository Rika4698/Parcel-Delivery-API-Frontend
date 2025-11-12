import { useEffect, useState, type ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import LoadingSpinner from '@/components/Public/HomePage/LoadingSpinner';





interface IProps {
  children: ReactNode;
}

function Shared({ children }: IProps) {
const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700); 
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  
  return (
    <div className="min-h-screen flex flex-col">
     
      <Navbar />
      <div className="">{children}</div>
      <Footer />
      
    </div>
  );
}

export default Shared;