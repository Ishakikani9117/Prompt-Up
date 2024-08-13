import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the EditPrompt component to ensure it's treated as a client component
const EditPrompt = dynamic(() => import('@components/editPrompt'), { ssr: false });

const EditPromptPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPrompt />
    </Suspense>
  );
}

export default EditPromptPage;
