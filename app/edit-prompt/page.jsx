"use client";
import {Suspense, useEffect, useState} from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/form';

const EditPrompt = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const [submitting, setsubmitting] = useState(false);
    const [post, setpost] = useState({
        prompt:'',
        tag:''
    });

    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(()=>{
      const getPromptDetails = async() => {
        if(!promptId) return;

        try {
          const response = await fetch(`/api/prompt/${promptId}`);
          const data = await response.json();
  
          setpost({
              prompt: data.prompt,
              tag: data.tag
          });
          
        } catch (error) {
           console.error('Failed to fetch prompt details:', error);
        } finally {
          setLoading(false); // Set loading to false after data is fetched
        }
      };
       
       getPromptDetails();
    }, [promptId]);

    const editingPrompt = async(e) =>{
        e.preventDefault();
        setsubmitting(true);

        if(!promptId) return alert('Prompt ID not found!');

        try {
          const response = await fetch(`/api/prompt/${promptId}`,{
            method: 'PATCH',
            body: JSON.stringify({
              prompt: post.prompt,
              tag: post.tag
            })
          })

          if(response.ok){
            console.log('Submitted');
            router.push('/');
          }
          
        } catch (error) {
          console.log(error);
        } finally {
          setsubmitting(false);
        }

    }

    if (loading) { // Conditional rendering based on loading state
      return <div>Loading...</div>;
    }
    
  return (
   <Suspense fallback={<div>Loading...</div>}>
    <Form 
      type="Update"
      post={post}
      setpost={setpost}
      submitting={submitting}
      handleSubmit={editingPrompt}
      
    />
   </Suspense>
  )
}

export default EditPrompt