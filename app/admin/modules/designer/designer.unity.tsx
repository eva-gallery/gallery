'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Unity, useUnityContext } from 'react-unity-webgl';

interface PropsSelect {
    token: string;
    data: any;
}

export const UnityDesignSelect: React.FC<PropsSelect> = ({ token, data }) => {
    const { unityProvider, isLoaded, sendMessage } = useUnityContext({
        loaderUrl: '/3dplanner/Build/3dplanner.loader.js',
        dataUrl: '/3dplanner/Build/3dplanner.data',
        frameworkUrl: '/3dplanner/Build/3dplanner.framework.js',
        codeUrl: '/3dplanner/Build/3dplanner.wasm',
    });

    const [uuid, setUuid] = useState<string>(data.length > 0 ? data[0].id : '');
    const [selectedRoomId, setSelectedRoomId] = useState<string>(data.length > 0 ? data[0].id : '');

    //const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const url = "https://cdn.evagallery.eu";

    // Odošle správy Unity
    useEffect(() => {
        if (isLoaded && token && uuid) {
            sendMessage('Generator', 'ReceiveBackendURL', url);
            sendMessage('Generator', 'ReceiveUUID', uuid);
            sendMessage('Generator', 'Admin', "false");
            sendMessage('Generator', 'ReceiveToken', token);

        }
    }, [isLoaded, token, uuid, sendMessage, url]);



    const handleRoomSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRoomId(event.target.value);
    };

    const handleLoadButtonClick = () => {
        setUuid(selectedRoomId);
        if (isLoaded) {
            sendMessage('Generator', 'ReceiveUUID', selectedRoomId);
        }
    };

    return (
        <>
            <h3 className='text-center mt-5'>3D Viewer</h3>
            <InputGroup className="mb-3">
                <InputGroup.Text>
                    <strong>Scene</strong>
                </InputGroup.Text>

                <Form.Select
                    className="form-control"
                    id="roomSelect"
                    value={selectedRoomId}
                    onChange={handleRoomSelectChange}
                >
                    {data.map((room: { id: string; name: string; exhibition: { name: string } }) => (
                        <option key={room.id} value={room.id}>
                            {room.name} - {room["exhibition"].name}
                        </option>
                    ))}
                </Form.Select>

                <Button variant="primary" onClick={handleLoadButtonClick}>
                    View
                </Button>
            </InputGroup>


            <Unity unityProvider={unityProvider} tabIndex={-1} style={{ width: '100%', height: '100%' }} />

        </>
    );
};



interface Props {
    token: string;
    uuid: string;
}

export const UnityDesign: React.FC<Props> = ({ token, uuid: initialUuid }) => {


    const { unityProvider, isLoaded, sendMessage } = useUnityContext({
        loaderUrl: '/3dplanner/Build/3dplanner.loader.js',
        dataUrl: '/3dplanner/Build/3dplanner.data',
        frameworkUrl: '/3dplanner/Build/3dplanner.framework.js',
        codeUrl: '/3dplanner/Build/3dplanner.wasm',
    });

    //const url = process.env.NEXT_PUBLIC_BACKEND_URL;
    const url = "https://cdn.evagallery.eu";

    useEffect(() => {
        if (isLoaded && token && initialUuid) {
            sendMessage('Generator', 'ReceiveBackendURL', url);
            sendMessage('Generator', 'ReceiveUUID', initialUuid);
            sendMessage('Generator', 'Admin', "true");
            sendMessage('Generator', 'ReceiveToken', token);

        }
    }, [isLoaded, token, initialUuid, sendMessage, url]);


    return (
        <>
            <h3 className='text-center mt-5'>3D Designer</h3>
            <Unity unityProvider={unityProvider} tabIndex={-1} style={{ width: '100%', height: '100%' }} />

        </>
    );
};