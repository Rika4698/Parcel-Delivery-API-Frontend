import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';




interface IProps {
  children: ReactNode;
}

function Shared({ children }: IProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="">{children}</div>
      <Footer />
      {/* <ScrollToTop /> */}
    </div>
  );
}

export default Shared;