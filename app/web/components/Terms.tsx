import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Terms and Conditions for E.V.A. Gallery
        </h1>

        <div className="space-y-8">
          {/* 1. Definitions */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">1. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-700">
                <span className="font-medium">E.V.A. Gallery:</span> European Visual Arts Gallery, is an open source research project of Euforion NGO and its research technology partner FIIT STU Faculty of Information Technologies of the Slovak Technical University in Bratislava, funded by the NGI search consortium (Next Generation Internet) and the European Union and was chosen among 11 best projects of the year 2024.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">User:</span> Any artist, art collector, or gallery using the E.V.A. Gallery platform.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Art Lover:</span> Any potential buyer of artworks on the E.V.A. Gallery platform.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Platform:</span> The website and services provided by E.V.A. Gallery.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Artwork:</span> Any artistic creation offered on the E.V.A. Gallery platform.
              </li>
            </ul>
          </section>

          {/* 2. General Provisions */}
          <section className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">2. General Provisions</h2>
            <div className="space-y-2">
              <p className="text-gray-700 mb-1">2.1. These terms and conditions apply to all users of the E.V.A. Gallery platform.</p>
              <p className="text-gray-700 mb-1">2.2. E.V.A. Gallery acts as an intermediary between artists and art lovers.</p>
              <p className="text-gray-700">2.3. Users retain full responsibility for the content they upload and the quality of their artworks.</p>
            </div>
          </section>

          {/* 3. User Accounts and Content */}
          <section className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">3. User Accounts and Content</h2>
            <div className="space-y-2">
              <p className="text-gray-700 mb-1">3.1. Users must provide accurate information when creating an account.</p>
              <p className="text-gray-700 mb-1">3.2. Users are responsible for maintaining the confidentiality of their login details.</p>
              <p className="text-gray-700">3.3. E.V.A. Gallery reserves the right to remove any content that violates these terms or applicable laws.</p>
            </div>
          </section>

          {/* 4. Intellectual Property */}
          <section className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">4. Intellectual Property</h2>
            <div className="space-y-2">
              <p className="text-gray-700 mb-1">4.1. Artists retain full ownership and copyright of their uploaded works.</p>
              <p className="text-gray-700">4.2. By uploading content, users grant E.V.A. Gallery a non-exclusive license to display and promote their work within the platform.</p>
            </div>
          </section>

          {/* 5. 3D Gallery and NFTs */}
          <section className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">5. 3D Gallery and NFTs</h2>
            <div className="space-y-2">
              <p className="text-gray-700 mb-1">5.1. E.V.A. Gallery provides tools for creating 3D galleries and NFTs, but is not responsible for the content created using these tools.</p>
              <p className="text-gray-700">5.2. Users are responsible for complying with relevant laws and regulations when creating and selling NFTs.</p>
            </div>
          </section>

          {/* 6. Transactions */}
          <section className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">6. Transactions</h2>
            <div className="space-y-2">
              <p className="text-gray-700 mb-1">6.1. E.V.A. Gallery facilitates transactions between artists and art lovers but is not a party to these transactions.</p>
              <p className="text-gray-700">6.2. E.V.A. Gallery does not charge commission on sold artworks, only transaction costs as charged by payment providers.</p>
            </div>
          </section>

          {/* 7. Right of Withdrawal for Consumers */}
          <section className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">7. Right of Withdrawal for Consumers</h2>
            <div className="space-y-2">
              <p className="text-gray-700 mb-1">7.1. Consumers have the right to withdraw from a purchase within 14 days of receiving the artwork, subject to certain exceptions.</p>
              <p className="text-gray-700">7.2. The cost of returning the artwork in case of withdrawal is payed by the consumer.</p>
            </div>
          </section>

          {/* 8. Liability and Indemnification */}
          <section className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">8. Liability and Indemnification</h2>
            <div className="space-y-2">
              <p className="text-gray-700 mb-1">8.1. E.V.A. Gallery is not liable for any damages resulting from the use of the platform or transactions between users.</p>
              <p className="text-gray-700">8.2. Users agree to indemnify E.V.A. Gallery against any claims arising from their use of the platform or violation of these terms.</p>
            </div>
          </section>

          {/* 9. Privacy and Data Protection */}
          <section className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">9. Privacy and Data Protection</h2>
            <div className="space-y-2">
              <p className="text-gray-700 mb-1">9.1. E.V.A. Gallery collects only the minimum necessary user data for platform functionality.</p>
              <p className="text-gray-700 mb-1">9.2. E.V.A. Gallery does not collect cookie data.</p>
              <p className="text-gray-700">9.3. Users&apos; email addresses may be added to E.V.A. Gallery&apos;s mailing list, with the option to opt out at any time.</p>
            </div>
          </section>

          {/* 10. Modifications to the Service */}
          <section className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">10. Modifications to the Service</h2>
            <div className="space-y-2">
              <p className="text-gray-700 mb-1">10.1. E.V.A. Gallery reserves the right to modify or discontinue the service at any time.</p>
              <p className="text-gray-700">10.2. E.V.A. Gallery may update these terms and conditions, with continued use of the platform constituting acceptance of the new terms.</p>
            </div>
          </section>

          {/* 11. Governing Law and Dispute Resolution */}
          <section className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">11. Governing Law and Dispute Resolution</h2>
            <div className="space-y-2">
              <p className="text-gray-700 mb-1">11.1. These terms are governed by the laws of the European Union.</p>
              <p className="text-gray-700">11.2. Any disputes will be resolved through mutual consultation or, if necessary, through the competent court in E.V.A. Gallery&apos;s jurisdiction.</p>
            </div>
          </section>

          {/* Agreement Statement */}
          <p className="text-gray-700 mt-8 pt-8 border-t border-gray-200 mb-4">
            By using the E.V.A. Gallery platform, you acknowledge that you have read, understood, and agree with these Terms and Conditions.
          </p>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
