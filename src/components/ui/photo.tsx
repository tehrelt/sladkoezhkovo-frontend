'use client';
import React from 'react';
import { Dialog, DialogTrigger } from './dialog';
import Image from 'next/image';
import { DialogContent } from '@radix-ui/react-dialog';

type Props = {
  src: string;
  width: number;
  height: number;
  alt: string;
  full?: string;
};

const Photo = ({ src, width, height, alt, full }: Props) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Image src={src} width={width} height={height} alt={alt} />
        </DialogTrigger>
        <DialogContent>
          <img src={full ?? src} alt={alt} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Photo;
