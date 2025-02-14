import NavbarComponent from "@/app/web/components/NavbarComponent";
import Footer from "@/app/web/components/Footer";
import TermsAndConditions from "@/app/web/components/Terms";
import Image from 'next/image';

export default function TermsPage() {
  return (
    <>
      <NavbarComponent />
      
      <div className="container py-3 py-lg-4">

        <div className="row">
          <div className="col-12">
              <TermsAndConditions />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
