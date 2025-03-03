'use client'

import React from 'react';

const Prize = () => {
  // Define winners with all necessary data to avoid client-side fetching
  const winners = [
    {
      place: '1st place',
      name: 'George Digalakis',
      slug: 'george-digalakis/george-digalakis/hopes-and-dreams',
      artistSlug: 'george-digalakis/george-digalakis',
      countryCode: 'GR',
      artworkName: 'Hopes and Dreams'
    },
    {
      place: '2nd place',
      name: 'Andreas Varro',
      slug: 'andreas-varro/andreas-varro/homo-sapiens',
      artistSlug: 'andreas-varro/andreas-varro',
      countryCode: 'SE',
      artworkName: 'Homo Sapiens'
    },
    {
      place: '3rd place',
      name: 'Natalia Philippou',
      slug: 'nataly-philippou/natalia-philippou/bend',
      artistSlug: 'nataly-philippou/natalia-philippou',
      countryCode: 'CY',
      artworkName: 'Bend'
    }
  ];

  const backendUrl = 'https://evagallery.b-cdn.net';

  return (
    <div className="py-5 px-4 mx-auto" style={{ maxWidth: '1200px' }}>
      <div className="blue-stripe w-100 mb-4" style={{ height: '8px', backgroundColor: '#0d3c81' }}></div>
      <div className="text-center mb-4">
        <h1 className="display-6 fw-bold mb-4" style={{ color: '#0d3c81' }}>INTRODUCING THE WINNERS OF THE 1ST EVA GALLERY PRIZE!</h1>
      </div>
      <div className="blue-stripe w-100 mb-5" style={{ height: '8px', backgroundColor: '#0d3c81' }}></div>
      
      <div className="text-center mb-5">
        <div className="lead mb-5 max-w-4xl mx-auto">
          <p>
            The first EVA Gallery Prize ceremony took place on the 28th of February, 2025,
            where the platform&apos;s top-scoring artists were celebrated in an international
            virtual event. The jury consisting of representatives from NGI Search and
            members of the EVA Gallery team took a vote, and selected the top 3 winning
            artists of the first-ever EVA Gallery Prize!<br></br> Congratulations to all artists who
            participated, it was a very close call.
          </p>
        </div>
        <h2 className="h3 mb-4">The winners are:</h2>
      </div>

      <div className="row g-4">
        {winners.map((winner, index) => (
          <div key={index} className="col-md-4 mb-5">
            <div className="text-center prize-card">
              <div className="mb-4">
                <a href={`/artists/${winner.artistSlug}`}>
                  <div className="position-relative overflow-hidden rounded shadow" style={{ paddingBottom: '133%', backgroundColor: '#f8f9fa' }}>
                    <img
                      src={`${backendUrl}/public/artwork/thumbnail?slug=${encodeURIComponent(winner.slug)}`}
                      alt={winner.artworkName}
                      className="position-absolute w-100 h-100"
                      style={{ top: 0, left: 0, objectFit: 'cover' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/images/placeholder.png';
                      }}
                    />
                  </div>
                </a>
              </div>
              <div className="mb-2">
                <a href={`/artists/${winner.artistSlug}`} className="text-decoration-none">
                  <h3 className="h4 mb-2">
                    {winner.name} <span className={`fi fi-${winner.countryCode.toLowerCase()} ms-2`}></span>
                  </h3>
                </a>
                <p className="text-muted">{winner.artworkName}</p>
              </div>
              <div className="mt-4">
                <h2 className="display-6 fw-bold" style={{ color: '#0d3c81' }}>{winner.place}</h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .prize-card {
          transition: transform 0.3s ease;
        }
        
        .prize-card:hover {
          transform: translateY(-10px);
        }
        
        .position-absolute {
          position: absolute;
        }
        
        .w-100 {
          width: 100%;
        }
        
        .h-100 {
          height: 100%;
        }
        a {
          color: #0d3c81;
        }
      `}</style>
    </div>
  );
};

export default Prize;
