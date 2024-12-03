import NavbarComponent from "@/app/web/components/NavbarComponent";
import Footer from "@/app/web/components/Footer";
import Image from 'next/image';


export default function ThreeDPage() {
  return (
    <>
      <NavbarComponent />
      
      <div className="container py-4">
        {/* First row with two columns */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="h-100 rounded">
            <div className="position-relative mb-3" style={{ height: '400px' }}>
                <Image
                  src="/images/3dgallery.jpg"
                  alt="3D Gallery"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className=" py-2 px-2 px-lg-4 h-100 rounded d-flex align-items-center">
                <div>
              <h2>3D Virtual Gallery</h2>
              <p>Artists and gallerists can design their own virtual gallery spaces using a specialized 3D Designer tool, enabling creative control over artwork presentation.</p>
              <p>
                        The E.V.A. Gallery project incorporates several innovative technological components. A web-based 3D Viewer allows visitors to browse artworks and exhibitions in an immersive environment, optimized for desktop browsers.
                      </p>
                      <p>To use the features</p>
                      <a href="/admin/user/login"><button className="btn btn-primary mb-2">
                      <span className="thq-body-small">Register now</span>
                    </button></a></div>
            </div>
          </div>
          
        </div>

        {/* Second row with responsive YouTube video */}
        <div className="row">
          <div className="col-12">
            <div className="ratio ratio-16x9">
              <iframe 
                src="https://www.youtube.com/embed/lsyDyHHdPRM" 
                title="EVA Gallery YouTube video"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}