'use client';
import React, { Suspense } from 'react';
import FileUpload from '@/features/file_upload/page';
import { FastPageSkeleton } from '@/components/ui/fast-skeletons';

export default function FileUploadPage() {
  return (
    <Suspense fallback={<FastPageSkeleton />}>
      <FileUpload />
    </Suspense>
  );
}
