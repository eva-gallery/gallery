'use client';

import React, { useEffect, useState } from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

interface ExhibitionUnityViewerProps {
  roomId: string;
}

const ExhibitionUnityViewer: React.FC<ExhibitionUnityViewerProps> = ({ roomId }) => {
  const [errorState, setErrorState] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Unity context
  const { unityProvider, isLoaded, addEventListener, removeEventListener, sendMessage } = useUnityContext({
    loaderUrl: '/3dplanner/Build/3dplanner.loader.js',
    dataUrl: '/3dplanner/Build/3dplanner.data',
    frameworkUrl: '/3dplanner/Build/3dplanner.framework.js',
    codeUrl: '/3dplanner/Build/3dplanner.wasm',
  });

  // Backend URL
  const url = "https://cdn.evagallery.eu";

  // Error handler for Unity
  const handleUnityError = (message: string) => {
    console.error("Unity Error:", message);
    setErrorState("An error occurred while loading the 3D view. Please try again later.");
  };

  // Add event listeners for Unity errors
  useEffect(() => {
    addEventListener("error", handleUnityError);
    
    return () => {
      removeEventListener("error", handleUnityError);
    };
  }, [addEventListener, removeEventListener]);

  // Send messages to Unity once loaded, with error handling
  useEffect(() => {
    if (isLoaded && roomId && !isInitialized) {
      try {
        console.log("Initializing Unity with roomId:", roomId);
        
        // Send required parameters to Unity
        sendMessage('Generator', 'ReceiveBackendURL', url);
        sendMessage('Generator', 'ReceiveUUID', roomId);
        sendMessage('Generator', 'ReceiveToken', ""); // Empty token for public view
        sendMessage('Generator', 'Admin', "false"); // Set to false for public view
        
        setIsInitialized(true);
      } catch (error) {
        console.error("Failed to initialize Unity:", error);
        setErrorState("Failed to initialize 3D view.");
      }
    }
  }, [isLoaded, roomId, url, sendMessage, isInitialized]);

  if (errorState) {
    return (
      <div className="error-container p-4 text-center" style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#f8d7da',
        color: '#721c24',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '4px'
      }}>
        <div className="error-icon mb-3">⚠️</div>
        <h5>3D View Error</h5>
        <p>{errorState}</p>
        <button 
          className="btn btn-outline-danger mt-2"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="unity-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
      {!isLoaded && (
        <div className="loading-overlay" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f8f9fa',
          zIndex: 10
        }}>
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading 3D Environment...</p>
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
