'use client';
import React, { Suspense } from 'react';
import DataInput from '@/features/data-input/page';
import { FastPageSkeleton } from '@/components/ui/fast-skeletons';

export default function DataInputPage() {
  return (
    <Suspense fallback={<FastPageSkeleton />}>
      <DataInput />
    </Suspense>
  );
}