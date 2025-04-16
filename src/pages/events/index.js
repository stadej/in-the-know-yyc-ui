import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import Image from 'next/image';
import Banner from '../../components/Banner';
import EventsFilter from '../../components/EventsFilter';
import CardHorizontal from '../../components/CardHorizontal';

import "../../app/styles/pages/events.css";

import { getFilteredEvents } from '../../api/events';

// SEO: Pages metadata
import pagesMetaData from "../../utils/pagesMetaData";
import PagesMetaData from "../../components/PagesMetaData";
import moment from "moment/moment";


export default function AllEvents({ eventsList, searchParams, metadata }) {

  const [events, setEvents] = useState(eventsList);
  const [filteredEvents, setFilteredEvents] = useState(eventsList);
  const [params, setParams] = useState(searchParams);
  const [moreEventsAvailable, setMoreEventsAvailable] = useState(true);

  // CSR RENDERING (ALL THE EVENTS ON INFINITE SCROLL)
  const fetchMoreEvents = async () => {
    console.log(params);

    if (moreEventsAvailable) {
      try {
        const newEvents = await getFilteredEvents(params);
        setEvents((prevEvents) => [...prevEvents, ...newEvents.data.content]);
        setParams(newEvents.params);
        setMoreEventsAvailable((newEvents.data.totalPages > newEvents.data.number));
      } catch (error) {
        console.error('Error fetching events in fetchMoreEvents CSR:', error);
      }
    }
  };

  const handleSearch = async (searchText) => {
    const dateNow = new Date();
    const dateTimeNow = moment(dateNow).format('YYYY-MM-DDTHH:mm:ss');

    setParams({
      sortField: 'eventDate',
      sortDirection: 'asc',
      size: 10,
      startDate: dateTimeNow,
      searchText: searchText
    });

    setEvents([]);
    setMoreEventsAvailable(true);

    await fetchMoreEvents();
  }

  const handleFilter = (filteredEvents) => {
    setFilteredEvents(filteredEvents);
  };

  return (
    <>
      <PagesMetaData metadata={metadata} />
      <Banner />
      <div id="events-vertical-container">
        <EventsFilter params={params} events={events} handleFilter={handleFilter}/>
        <div id="events-horizontal-container">
          <InfiniteScroll
            dataLength={events.length}
            next={fetchMoreEvents}
            hasMore={moreEventsAvailable}
            loader={<div id='loadingSpinner'><Image src="/images/icons/loading.gif" alt="" width={200} height={200} /></div>}
            endMessage={<p className='endMessage'>There are no more events matching these filters</p>}
          >
            {filteredEvents.map((eventContent, index) => (
              <CardHorizontal key={`event_id_${eventContent.id}-${index}`} content={eventContent} />
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}

// SSR RENDERING (ONLY FIRST BATCH OF EVENTS)
export async function getServerSideProps(context) {
  const metadata = await pagesMetaData('events')
  const dateNow = new Date();
  const dateTimeNow = moment(dateNow).format('YYYY-MM-DDTHH:mm:ss');
  const params = {...context.query, startDate: dateTimeNow};
  console.log(params);
  const events = await getFilteredEvents(params);
  return { props: { eventsList: events.data.content, searchParams: events.params, metadata } };
}


