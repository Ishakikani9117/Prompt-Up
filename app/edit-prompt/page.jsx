"use client";
import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/Form';

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: '', tag: '' });
  const [loading, setLoading] = useState(true); // Loading state with useState

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) return;

      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();

        setPost({
          prompt: data.prompt,
          tag: data.tag
        });
      } catch (error) {
        console.error('Failed to fetch prompt details:', error);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    getPromptDetails();
  }, [promptId]);

  const editingPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert('Prompt ID not found!');

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        })
      });

      if (response.ok) {
        console.log('Submitted');
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  // Use useState's loading logic for initial loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form
        type="Update"
        post={post}
        setpost={setPost}
        submitting={submitting}
        handleSubmit={editingPrompt}
      />
    </Suspense>
  );
};

export default EditPrompt;