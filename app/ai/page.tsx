import NavbarComponent from "@/app/web/components/NavbarComponent";
import Footer from "@/app/web/components/Footer";
import Image from 'next/image';


export default function ThreeDPage() {
  return (
    <>
      <NavbarComponent />
      
      <div className="container py-3 py-lg-4">
        {/* First row with two columns */}
        <div className="row mb-4 mb-lg-2">
        <div className="col-md-6">
            <div className="py-2 px-2 px-lg-0 h-100 rounded d-flex align-items-center">
                <div>
              <h2>AI Art Protection</h2>  
              <p>To prevent art theft, we use Nightshade and Glaze, state-of-the-art art protection techniques that imperceptibly alter your artwork and prevent AI from learning your unique art identity and style. EVA Gallery employs an embedding space lookup for plagiarism protection to compare artworks against a database of existing pieces. Using our powerful AI-powered search, you can find the exact art pieces that match your taste. </p>
                      <p>To use the features</p>
                      <a href="/admin/user/login"><button className="btn btn-primary mb-4">
                      <span className="thq-body-small">Register now</span>
                    </button></a></div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="h-100 rounded">
            <div className="position-relative mb-3" style={{ height: '400px' }}>
                <Image
                  src="/images/ai-one.jpg"
                  alt="AI Art Protection"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="rounded"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
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
