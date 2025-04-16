import Link from "next/link";
import Image from "next/image";
import "../../app/styles/components/eventInfo.css";
import { getEventById } from '../../api/events';
import moment from "moment/moment";

// SEO: Pages metadata
import pagesMetaData from "../../utils/pagesMetaData";
import PagesMetaData from "../../components/PagesMetaData";


export default function EventInfo({ eventInformation, metadata }) {
    const dateTime = moment(eventInformation.eventDate + 'Z');
    const endTime = eventInformation.eventEndTime ? moment(eventInformation.eventEndTime+'Z'): "";

    // const eventImage = '/images/events/evt2.png';

    return (
        <>
            <PagesMetaData metadata={metadata} />
            <section className="eventInformation">
                <div className="row-1">
                    <Link href={'/events'}>
                        <Image src={'/images/icons/back-arrow.svg'} width={'15'} height={'15'} alt='' />
                    </Link>
                    <h1>{eventInformation.eventName}</h1>
                </div>
                <div className="row-3">
                    <h2>About Event</h2>

                    <h3>Event Host/Facilitator</h3>
                    <p>{eventInformation.organizationName}</p>

                    <h3>Event Description</h3>
                    <p>{eventInformation.eventDescription}</p>

                    <ul>
                        <li>
                            <h3>Event Type</h3>
                            <p>{eventInformation.eventType}</p>
                        </li>
                        <li>
                            <h3>Industry</h3>
                            <p>{eventInformation.industry}</p>
                        </li>
                    </ul>
                    <h3>Link to event page</h3>
                    <Link className="attend" href={eventInformation.eventLink || '#'} target="_blank"> {eventInformation.eventLink || 'no link provided for this event'} </Link>

                    <label className="date">{dateTime.format('MMMM D, YYYY')}</label>
                    {endTime === "" && (
                        <label className="time">{dateTime.format('h:mm a z')}</label>
                    )}
                    {endTime !== "" && (
                        <label className="time">{dateTime.format('h:mm') + ' - ' + endTime.format('h:mm a z')}</label>
                    )}
                    <label className="location">{(eventInformation.onlineEvent) ? 'Online' : eventInformation.location}</label>

                    <label className="admission"><b>Admission:</b> {(eventInformation.freeEvent) ? 'Free' : `$ ${eventInformation.eventCost.toFixed(2)}`}</label>


                </div>
            </section>
        </>
    );
}

export async function getServerSideProps(context) {
    const { id } = context.params;

    const eventInformation = await getEventById(id);

    const eventMetaData = {
        id: id,
        title: eventInformation.eventName,
        description: eventInformation.eventDescription,
        image: eventInformation.eventImage,
    }

    const metadata = await pagesMetaData('event', eventMetaData)

    return { props: { id, eventInformation, metadata } };
}