'use client';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Unity, useUnityContext } from 'react-unity-webgl';

export default function DesignerPage() {

  const receiveUUID = "953e85fe-44a9-480e-8624-56348efd9874";

  const { unityProvider, isLoaded, sendMessage } = useUnityContext({
    loaderUrl: '/3dplanner/Build/3dplanner.loader.js',
    dataUrl: '/3dplanner/Build/3dplanner.data',
    frameworkUrl: '/3dplanner/Build/3dplanner.framework.js',
    codeUrl: '/3dplanner/Build/3dplanner.wasm',
  });

  const url = "https://cdn.evagallery.eu";

  useEffect(() => {
    if (isLoaded && receiveUUID) {
      sendMessage('Generator', 'ReceiveBackendURL', url);
      sendMessage('Generator', 'ReceiveUUID', receiveUUID);
      sendMessage('Generator', 'Admin', "false");
      sendMessage('Generator', 'ReceiveToken', "");
    }
  }, [isLoaded, receiveUUID, sendMessage, url]);


  return (
    <>
      <Container>
        <h3 className='text-center mt-5'>3D Designer</h3>
        <Unity unityProvider={unityProvider} tabIndex={-1} style={{ width: '100%', height: '100%' }} />
      </Container>
    </>
  );

}