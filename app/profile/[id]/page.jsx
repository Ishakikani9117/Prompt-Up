"use client";
import {useEffect, useState} from 'react';
import { useSearchParams } from 'next/navigation';
import Profile from '@components/profile';

const UserProfile = ({params}) => {
    const [UserPosts, setUserPosts] = useState([]);
    const searchParams = useSearchParams();
    const userName= searchParams.get('name');

    useEffect(()=>{
      const fetchUserPosts= async() =>{
        const res=await fetch(`/api/users/${params?.id}/posts`);
        const data= await res.json();

        setUserPosts(data);
      }

      if(params?.id) fetchUserPosts();
    },[params.id]);

  return (
    <Profile 
      name={userName}
      data={UserPosts}
      desc={`Explore ${userName}'s latest Prompt ideas below.`}
    />
  )
}

export default UserProfile