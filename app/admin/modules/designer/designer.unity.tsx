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
    const [isFocused, setIsFocused] = useState(false); // Sledovanie focusu
    const webglRef = useRef<HTMLDivElement>(null);
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;

    // Odošle správy Unity
    useEffect(() => {
        if (isLoaded && token && uuid) {
            sendMessage('Generator', 'ReceiveBackendURL', url);
            sendMessage('Generator', 'ReceiveUUID', uuid);
            sendMessage('Generator', 'ReceiveToken', token);
        }
    }, [isLoaded, token, uuid, sendMessage, url]);

    // Sledovanie kláves
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isFocused) {
                event.preventDefault(); // Blokuje default správanie
                sendMessage('Generator', 'ReceiveKeyPress', event.key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isFocused, sendMessage]);

    const handleMouseEnter = () => setIsFocused(true);
    const handleMouseLeave = () => setIsFocused(false);

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
            <InputGroup className="mb-3 mt-5">
                <InputGroup.Text>
                    <strong>Designer</strong>
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
                    Load
                </Button>
            </InputGroup>

            <div
                ref={webglRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ width: '100%', height: '100%' }}
            >
                <Unity unityProvider={unityProvider} tabIndex={1} style={{ width: '100%', height: '100%' }} />
            </div>
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

    const [uuid, setUuid] = useState<string>(initialUuid); // Použi initialUuid ako predvolenú hodnotu
    const [isFocused, setIsFocused] = useState(false); // Sledovanie focusu na Unity
    const unityRef = useRef<HTMLDivElement>(null); // Ref na Unity div
    const url = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        if (isLoaded && token && uuid) {
            sendMessage('Generator', 'ReceiveBackendURL', url);
            sendMessage('Generator', 'ReceiveUUID', uuid);
            sendMessage('Generator', 'ReceiveToken', token);
        }
    }, [isLoaded, token, uuid, sendMessage, url]);

    // Sledovanie klávesových vstupov
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (isFocused) {
                event.preventDefault(); // Blokuje default správanie
                sendMessage('Generator', 'ReceiveKeyPress', event.key);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isFocused, sendMessage]);

    // Funkcie pre focus a blur
    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <>
            <div
                ref={unityRef}
                tabIndex={0} // Umožní focusovať tento div
                onFocus={handleFocus} // Nastaví isFocused na true pri focusovaní
                onBlur={handleBlur} // Nastaví isFocused na false pri opustení focusu
                style={{ width: '100%', height: '100%' }}
            >
                <Unity unityProvider={unityProvider} tabIndex={1} style={{ width: '100%', height: '100%' }} />
            </div>
        </>
    );
};