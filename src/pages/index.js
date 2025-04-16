import Hero from '../components/Hero';
import LatestEvents from '../components/LatestEvents';
import Comments from '../components/Comments';
import Community from '../components/Community';
//import Sponsors from '../components/Sponsors';

// FETCHING NEXT 6 EVENTS EVENTS
import { getNextEvents } from '../api/events';
import { useRouter } from 'next/navigation';

// SEO: Pages metadata
import pagesMetaData from "../utils/pagesMetaData";
import PagesMetaData from "../components/PagesMetaData";

import { useEffect } from 'react';


export default function Home({ latestEvents, metadata }) {

  const router = useRouter();
  useEffect(() => {
    router.push('/events');
  }, [router]);

  return (
    <>
      <PagesMetaData metadata={metadata} />
      <Hero />
      <LatestEvents latestEvents={latestEvents} />
      <Comments />
      <Community />
      {/* <Sponsors /> */}
    </>
  );
}


export async function getServerSideProps() {
  const metadata = await pagesMetaData('home')
  const latestEvents = await getNextEvents();

  return { props: { latestEvents, metadata } };

}