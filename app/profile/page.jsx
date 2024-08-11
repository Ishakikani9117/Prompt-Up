"use client";

import {useEffect, useState} from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/profile';

const MyProfile = () => {
  const {data: session} = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async() => {
      const res= await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
    }

    if(session?.user.id) fetchPosts();
  }, []);


  const handleEdit = (post) => {
    router.push(`/edit-prompt?id=${post._id}`);
  }

  const handleDelete = async(post) => {
    const hasConfirmed = confirm("Please confirm if you want to delete this post."); // build in browser API
    if(hasConfirmed){
      try {
        await fetch(`/api/prompt/${post._id.toString()}`,{
          method: 'DELETE'
        });

        const newPostsList= posts.filter((p)=> p._id!=post._id);
        setPosts(newPostsList);

      } catch (error) {
        console.log(error);
      }
    }

  }
  return (
    <Profile 
      name="Isha"
      desc="Hello! Explore my latest Prompt ideas below."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile