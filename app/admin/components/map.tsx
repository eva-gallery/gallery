'use client'
import React, { ReactNode } from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import { Map, MarkerLayer, Marker } from 'react-mapycz'

type Props = {
  gps: string;
};

const AdminMap: React.FC<Props> = ({ gps }) => {

  const [latStr, lngStr] = gps.split(", ");

  // Extrahovanie hodnôt zemepisnej šírky a dĺžky bez posledného znaku (N alebo E)
  const lat = parseFloat(latStr.slice(0, -1));
  const lng = parseFloat(lngStr.slice(0, -1));

  return (
    <>
      <Map center={{ lat: lat, lng: lng }}>


      </Map>
    </>
  );
};

export default AdminMap;
