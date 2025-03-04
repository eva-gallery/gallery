'use client';

import React, { useEffect } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

interface ExhibitionUnityViewerProps {
  roomId: string;
}

const ExhibitionUnityViewer: React.FC<ExhibitionUnityViewerProps> = ({ roomId }) => {
  const { unityProvider, isLoaded, sendMessage } = useUnityContext({
    loaderUrl: '/3dplanner/Build/3dplanner.loader.js',
    dataUrl: '/3dplanner/Build/3dplanner.data',
    frameworkUrl: '/3dplanner/Build/3dplanner.framework.js',
    codeUrl: '/3dplanner/Build/3dplanner.wasm',
  });

  // Backend URL
  const url = "https://cdn.evagallery.eu";

  // Send messages to Unity once loaded
  useEffect(() => {
    if (isLoaded && roomId) {
      sendMessage('Generator', 'ReceiveBackendURL', url);
      sendMessage('Generator', 'ReceiveUUID', roomId);
      sendMessage('Generator', 'Admin', "false"); // Set to false for public view
    }
  }, [isLoaded, roomId, sendMessage, url]);

  return (
    <div className="unity-container" style={{ width: '100%', height: '100%' }}>
      {!isLoaded && (
        <div className="loading-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f8f9fa'
        }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      
      <Unity 
        unityProvider={unityProvider} 
        tabIndex={-1} 
        style={{ 
          width: '100%', 
          height: '100%', 
          background: '#f8f9fa',
          visibility: isLoaded ? 'visible' : 'hidden'
        }} 
      />
    </div>
  );
};

export default ExhibitionUnityViewer;
