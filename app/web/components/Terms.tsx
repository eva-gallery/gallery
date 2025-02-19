import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Terms and Conditions for E.V.A. Gallery
        </h1>

        <div className="space-y-8">
          {/* 1. Definitions */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-gray-700">
                <span className="font-medium">E.V.A. Gallery</span> – The digital platform providing 3D virtual exhibitions, AI-powered art protection, and NFT minting services.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">User</span> – Any individual or entity that registers and interacts with the E.V.A. Gallery platform.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Artist</span> – A registered user who uploads, displays, and/or mints artworks on the platform.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Gallery (entity)</span> – A registered user who uploads, displays, and/or mints artworks on the platform.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Artwork</span> – Any image, digital file, or creative content uploaded by a user.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Gallery (digital environment)</span> – A unique virtual environment created by the user to showcase their uploaded artworks.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">NFT (Non-Fungible Token)</span> – A blockchain-based digital asset representing ownership of an artwork.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">AI Protection</span> – The artificial intelligence system used to safeguard intellectual property rights and detect unauthorized use of artworks.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">3D Gallery Designer</span> – A digital tool provided by E.V.A. Gallery that enables users to design unique 3D virtual environments.
              </li>
              <li className="text-gray-700">
                <span className="font-medium">Public Server</span> – The cloud-based infrastructure where E.V.A. Gallery hosts its platform and services.
              </li>
            </ul>
          </section>

          {/* 2. General Provisions */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">2. General Provisions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">2.1. Entire Agreement</h3>
                <p className="text-gray-700">These Terms & Conditions constitute the entire agreement between users and E.V.A. Gallery, superseding all prior agreements, communications, or understandings related to the platform&apos;s services.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">2.2. Severability</h3>
                <p className="text-gray-700">If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions shall remain in full effect.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">2.3. No Waiver</h3>
                <p className="text-gray-700">Failure by E.V.A. Gallery to enforce any right or provision shall not be deemed a waiver of such rights.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">2.4. Contact Information</h3>
                <p className="text-gray-700">For inquiries, users may contact support@evagallery.eu.</p>
              </div>
            </div>
          </section>

          {/* 3. User Accounts & Registration */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">3. User Accounts & Registration</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">3.1. Account Creation & Verification</h3>
                <p className="text-gray-700">To access E.V.A. Gallery, users must:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Be at least 18 years old or have parental consent.</li>
                  <li>Provide accurate personal and professional information upon registration.</li>
                  <li>Maintain a secure password and are responsible for safeguarding their credentials.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">3.2. Account Suspension & Termination</h3>
                <p className="text-gray-700">E.V.A. Gallery reserves the right to suspend or terminate accounts if:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>The user engages in fraudulent activity, copyright infringement, explicit content or platform abuse.</li>
                  <li>Misuse of AI protection, NFT minting, or crypto integration is detected.</li>
                  <li>The user created multiple identical accounts.</li>
                </ul>
                <p className="mt-2">Users may voluntarily delete their account at any time, with data erasure confirmed within 30 days.</p>
              </div>
            </div>
          </section>

          {/* 4. Copyright & Intellectual Property Rights */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Copyright & Intellectual Property Rights</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">4.1. Ownership</h3>
                <p className="text-gray-700">All uploaded artworks remain the intellectual property of the artist. By uploading content, the artist grants E.V.A. Gallery a non-exclusive, royalty-free, worldwide license to display and promote the artwork within the platform and its PR.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">4.2. License Revocation</h3>
                <p className="text-gray-700">Artists may revoke this license at any time by deleting their artwork from the platform. Upon deletion, all associated platform displays and promotional use shall cease within 30 days.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">4.3. Third-Party Usage</h3>
                <p className="text-gray-700">E.V.A. Gallery shall not license, sell, or otherwise commercialize user-uploaded content without explicit written consent from the artist.</p>
              </div>
            </div>
          </section>

          {/* 5. 3D Gallery Designer & Virtual Exhibitions */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">5. 3D Gallery Designer & Virtual Exhibitions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">5.1. Overview</h3>
                <p className="text-gray-700">E.V.A. Gallery provides artists with a 3D Gallery Designer, enabling them to design custom virtual environments where they can create digital exhibitions. This tool allows users to curate, arrange, and present their artworks in an interactive environment, enhancing the digital exhibition experience.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">5.2. User Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Users must ensure that uploaded content complies with intellectual property laws.</li>
                  <li>Exhibitions should adhere to platform guidelines, avoiding prohibited content (e.g., hate speech, illegal materials).</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">5.3. Technical Requirements & Limitations</h3>
                <p className="text-gray-700">The 3D Gallery Designer is optimized for modern browsers but may have performance limitations on older devices. Users are responsible for reviewing their exhibitions before publishing to ensure a seamless viewer experience.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">5.4. Modifications & Removal</h3>
                <p className="text-gray-700">E.V.A. Gallery reserves the right to modify, suspend, or remove any virtual exhibition that violates platform policies or is flagged for copyright infringement. Users will be notified in case of necessary modifications.</p>
              </div>
            </div>
          </section>

          {/* 6. NFT & Blockchain Compliance */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">6. NFT & Blockchain Compliance</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">6.1. NFT Ownership</h3>
                <p className="text-gray-700">An artist who mints NFTs on the E.V.A. Gallery platform retains full ownership rights. The platform does not act as an intermediary in secondary sales or transfers.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">6.2. Legal Compliance</h3>
                <p className="text-gray-700">Users minting or selling NFTs through E.V.A. Gallery is solely responsible for adhering to EU regulations on digital assets, including taxation and consumer rights under MiCA (Markets in Crypto-Assets Regulation).</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">6.3. Platform Liability</h3>
                <p className="text-gray-700">E.V.A. Gallery shall not be held liable for price fluctuations, third-party marketplace risks, or failed transactions involving minted NFTs.</p>
              </div>
            </div>
          </section>

          {/* 7. AI Protection & Data Processing */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">7. AI Protection & Data Processing</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">7.1. AI-Driven Protection</h3>
                <p className="text-gray-700">All uploaded artworks receive an automatic AI protection layer to prevent plagiarism and scraping to the extent of 98%. This protection does not alter the artwork but creates a unique identifier stored in the system.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">7.2. Data Processing & Privacy</h3>
                <p className="text-gray-700">No user-uploaded artwork is stored outside the artist&apos;s account without consent. AI analysis is conducted in compliance with GDPR, and users have the right to request deletion of associated data.</p>
              </div>
            </div>
          </section>

          {/* 8. Transactions: NFT Module & Crypto-Wallet Integration */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Transactions: NFT Module & Crypto-Wallet Integration</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">8.1. NFT Minting & Ownership</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Users retain full intellectual property rights over their minted NFTs.</li>
                  <li>NFTs created via E.V.A. Gallery are stored on the blockchain and linked to the user&apos;s connected crypto wallet.</li>
                  <li>Once minted, NFTs cannot be altered or deleted due to blockchain immutability. If a user wishes to destroy an NFT mint, they can opt to "burn" them.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">8.2. Crypto-Wallet Integration</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Users may connect an external Web3 wallet provided by Kusama to facilitate NFT transactions. E.V.A. Gallery does not charge additional fees.</li>
                  <li>E.V.A. Gallery does not store, manage, or recover lost wallet keys. Users are fully responsible for their crypto-wallet security.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">8.3. Financial & Legal Responsibilities</h3>
                <p className="text-gray-700">Users are responsible for mint fees, blockchain transaction costs, and tax obligations in compliance with their local regulations. E.V.A. Gallery does not facilitate fiat-to-crypto conversions and advises users to engage with third-party exchanges at their own risk.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">8.4. Fraud Prevention & AML Compliance</h3>
                <p className="text-gray-700">E.V.A. Gallery complies with EU Anti-Money Laundering (AML) regulations and reserves the right to investigate any suspicious transactions.</p>
              </div>
            </div>
          </section>

          {/* 9. Liability & Disclaimers */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">9. Liability & Disclaimers</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">9.1. Platform Availability & Technical Failures</h3>
                <p className="text-gray-700">E.V.A. Gallery aims to provide continuous access to its services but does not guarantee uninterrupted availability. Users acknowledge that occasional downtime, maintenance, or system failures may occur.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">9.2. Limitation of Liability</h3>
                <p className="text-gray-700">E.V.A. Gallery shall not be held liable for:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Lost profits, data loss, or platform unavailability due to system errors or external cyber threats.</li>
                  <li>Disputes arising from NFT transactions between users and third-party marketplaces.</li>
                  <li>Unauthorized use of artworks, though E.V.A. Gallery employs AI protection to minimize plagiarism risks.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">9.3. User Responsibilities</h3>
                <p className="text-gray-700">Users are responsible for maintaining backup copies of their content and ensuring compliance with applicable laws when engaging in financial transactions via the platform.</p>
              </div>
            </div>
          </section>

          {/* 10. Data Collection & Processing */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">10. Data Collection & Processing</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">10.1. Data Collection</h3>
                <p className="text-gray-700">E.V.A. Gallery collects and processes only essential personal data necessary for platform operation, including user profiles, uploaded content, and account credentials.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">10.2. User Rights Under GDPR</h3>
                <p className="text-gray-700">Users have the right to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Access: Request a copy of their personal data.</li>
                  <li>Rectification: Correct inaccurate or incomplete data.</li>
                  <li>Erasure (&quot;Right to Be Forgotten&quot;): Request deletion of their account and associated data.</li>
                  <li>Data Portability: Obtain their data in a structured format for transfer.</li>
                </ul>
                <p className="mt-2">Requests can be submitted to support@evagallery.eu, and will be processed within 30 days, in compliance with GDPR Article 12.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">10.3. Data Security & Storage</h3>
                <p className="text-gray-700">All personal data is stored on secure servers and is not shared with third parties unless required by law.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">10.4. AI & Automated Processing</h3>
                <p className="text-gray-700">E.V.A. Gallery utilizes AI for art protection and fraud detection.</p>
              </div>
            </div>
          </section>

          {/* 11. Account Suspension & Content Removal Policy */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">11. Account Suspension & Content Removal Policy</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">11.1. Grounds for Suspension</h3>
                <p className="text-gray-700">E.V.A. Gallery reserves the right to suspend or remove content that violates:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Copyright laws, GDPR, or blockchain regulations</li>
                  <li>Hate speech, violence, or explicit illegal content</li>
                  <li>Unauthorized commercial activities</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">11.2. User Appeal Process</h3>
                <p className="text-gray-700">Users whose content or accounts are removed may appeal within 7 days to support@evagallery.eu.</p>
              </div>
            </div>
          </section>

          {/* 12. Modifications to the Service */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">12. Modifications to the Service</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">12.1. Right to Modify or Discontinue Services</h3>
                <p className="text-gray-700">E.V.A. Gallery reserves the right to update, modify, or discontinue any feature, tool, or service at its sole discretion. Such changes may include improvements, security updates, or new functionalities aimed at enhancing the user experience.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">12.2. Notification of Changes</h3>
                <p className="text-gray-700">Where possible, users will be provided with reasonable advance notice of significant modifications via email, platform notifications, or the official website.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">12.3. User Responsibility</h3>
                <p className="text-gray-700">Continued use of E.V.A. Gallery after updates constitutes acceptance of the revised terms. Users are encouraged to review updates periodically.</p>
              </div>
            </div>
          </section>

          {/* 13. Governing Law & Dispute Resolution */}
          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">13. Governing Law & Dispute Resolution</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">13.1. Applicable Law</h3>
                <p className="text-gray-700">These Terms & Conditions shall be governed under the laws of Slovakia and EU regulations, including GDPR and MiCA compliance.</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-800 mb-2">13.2. Dispute Resolution</h3>
                <p className="text-gray-700">Disputes shall first be resolved through mediation. If no resolution is reached, cases will be handled by the courts of Bratislava, Slovakia.</p>
              </div>
            </div>
          </section>

          {/* Agreement Statement */}
          <p className="text-gray-700 mt-8 pt-8 border-t border-gray-200">
            By using the E.V.A. Gallery platform, you acknowledge that you have read, understood, and agree with these Terms and Conditions. For any questions or concerns, please contact support@evagallery.eu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
