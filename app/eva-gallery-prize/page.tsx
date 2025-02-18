import NavbarComponent from "@/app/web/components/NavbarComponent";
import Footer from "@/app/web/components/Footer";
import Prize from "@/app/web/components/Prize";  
import Image from 'next/image';

export default function PrizePage() {
  return (
    <>
      <NavbarComponent />
      <div className="container py-3 py-lg-4">
        <div className="row">
          <div className="col-12">
            <Prize />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
