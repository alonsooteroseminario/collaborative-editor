import AddDocumentBtn from '@/components/AddDocumentBtn';
import { DeleteModal } from '@/components/DeleteModal';
import Header from '@/components/Header'
import Notifications from '@/components/Notifications';
import { Button } from '@/components/ui/button'
import { getDocuments } from '@/lib/actions/room.actions';
import { dateConverter } from '@/lib/utils';
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import HomeClient from '@/components/HomeClient';

const Home = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');
  
  const roomDocuments = await getDocuments(clerkUser.emailAddresses[0].emailAddress);
  
  const userData = {
    id: clerkUser.id,
    email: clerkUser.emailAddresses[0].emailAddress,
  };

  return <HomeClient userData={userData} roomDocuments={roomDocuments} />;
};

export default Home;
