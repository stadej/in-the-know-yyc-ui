import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import moment from "moment/moment";

import { useRouter } from 'next/navigation';

import isValidImageUrl from "../../../utils/isValidImage";

// API
import { getAllEvents, switchEventStatus, deleteEvent, updateEvent, createEvent, uploadImage } from '../../../api/events';
import { validateToken, getUserByToken } from '../../../api/users';

// NextUI Components
import { Chip } from "@nextui-org/chip";
import { Spacer } from "@nextui-org/spacer";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Tooltip, Tabs, Tab, Spinner, Avatar } from '@nextui-org/react';
import { Switch } from "@nextui-org/switch";
import { Button } from "@nextui-org/button";

// TOAST MESSAGES
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// MODAL
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import ModalEventsContent from '../../../components/cms/ModalEventsContent';

export default function AllEvents({ eventsList, searchParams }) {
  
  const router = useRouter();

  // EVENTS FETCHING
  const [events, setEvents] = useState(eventsList);
  const [params, setParams] = useState(searchParams);
  const [moreEventsAvailable, setMoreEventsAvailable] = useState(true);

  // MODAL SIZE
  

  // CHECK IF EVENTS IS EMPTY TO RUN THE FIRST CALL
  /* ******* ARREGLAR! tira error por mucho rendering. Falta el dependency array... ******* */
  useEffect(() => {
    if (!events || events.length === 0) {
      fetchMoreEvents();
    }
  });

  
  useEffect(() => {
    const validateTokenAsAdmin = async () => {
      await validateToken();
      try {
        const token = localStorage.getItem('authToken');
        let role = '';
    
        if (token){
          await getUserByToken(token);
          role = localStorage.getItem('userRole');
        }
    
        if (role !== 'ROLE_ADMIN'){
          router.push('/cms/login');
        }
      }
      catch(e){
        console.log('TOKEN VALIDATION ERROR: ', e);
      }
    }
    validateTokenAsAdmin();
  }, [router]);

  // CSR RENDERING (ALL THE EVENTS ON INFINITE SCROLL)
  const fetchMoreEvents = async () => {
    // setParams((prevParams) => ({
    //   ...prevParams,
    //   page: (prevParams.page + 1),
    // }));

    if (moreEventsAvailable) {
      try {
        const newEvents = await getAllEvents(params);

        //console.log(newEvents);

        // Filter out duplicates based on unique IDs
        // const uniqueNewEvents = newEvents.data.content.filter(
        //   (newEvent) => !events.some((existingEvent) => existingEvent.id === newEvent.id)
        // );

        setParams(newEvents.params);
        setEvents((prevEvents) => [...prevEvents, ...newEvents.data.content]);
        // setEvents((prevEvents) => [...prevEvents, ...uniqueNewEvents]);


        setMoreEventsAvailable((newEvents.data.totalPages > newEvents.data.number));
      } catch (error) {
        console.error('Error fetching events in fetchMoreEvents CSR:', error);
      }
    }
  };


  // MODAL
  const [modalSize, setModalSize] = useState('5xl');
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalType, setModalType] = useState('new');
  const [modalEvent, setModalEvent] = useState();
  const handleModal = (type, ev) => {
    setModalType(type);
    setModalEvent(ev);
    setModalSize((type === 'delete') ? 'sm' : '5xl');
    onOpen();
  }


  // EVENTS CRUD
  const hiddenEvents = (ev) => {
    const dateNow = new Date();
    const eventDate = new Date(ev.eventDate);

    if (dateNow > eventDate) {
      return (
        <Tooltip content={'This event has already passed'} color='red'><Avatar size='sm' src='/images/icons/error.svg' className='bg-white border-solid border-2 border-danger-700 p-1' /></Tooltip>
      )
    } else if (ev.status !== 'approved') {
      return (
        <Tooltip content={'This event has not been made public'} color='warning'><Avatar size='sm' src='/images/icons/warning.svg' className='bg-white border-solid border-2 border-danger-700 p-1' /></Tooltip>
      )
    } else {
      return (<Tooltip content={'This event has been made public'} color='success'><Avatar size='sm' src='#' className='bg-success-200' /></Tooltip>);
    }
  }

  const handleEventPublication = async (eventId) => {
    const updatedEvents = [...events]; // COPY EVENTS ARRAY TO PREVENT MUTATION OF ORIGNAL ONE
    const index = updatedEvents.findIndex(e => e.id === eventId); // FIND THE EVENT IN THE NEW ARRAY
    if (index !== -1) {
      // If the event is found, set the new status: [ pending | approved | rejected ]
      const newStatus = (updatedEvents[index].status === 'pending') ? 'approved' : 'pending';
      const changeStatus = await switchEventStatus(eventId, newStatus);
      
      if (changeStatus.type === 'success') {
        updatedEvents[index].status = newStatus;
        setEvents(updatedEvents);
        const statusText = (newStatus === 'approved') ? 'published' : 'unpublished';
        toast.success(`The event is now ${statusText}!`, { theme: 'colored' });
      } else {
        toast.error('There was an error switching the status. Please, try again later.', { theme: 'colored' });
      }
    }
  };

  const handleEventDeletion = async (eventId, onClose) => {
    const eventDeleted = await deleteEvent(eventId);
    
    if (eventDeleted.type === 'success') {
      const updatedEvents = events.filter(event => event.id !== eventId);
      setEvents(updatedEvents)
      toast.success('The event has been successfully removed!', { theme: 'colored' });
    } else {
      toast.error('There was an error removing the event. Please, try again later.', { theme: 'colored' });
    }
    onClose();
  }
  const uploadEventImage = async (currentLink) => {
    const imageFiles = document.getElementById('inputImageFile').files;
    if(imageFiles.length > 0){
      const formData = new FormData();
      formData.append('file', imageFiles[0])
      const uploadedImage = await uploadImage(formData); // Sending FormData for file uploading
      if(uploadedImage.type === 'success' && uploadedImage.link !== ''){
        return uploadedImage.link
      }else{
        return currentLink;
      }
    }
  }
  const eventFormValidation = (evt) => {
    if(
        evt.organizationName === '' || 
        evt.eventName === '' || 
        evt.eventDescription === '' || 
        (!evt.freeEvent && evt.eventCost <= 0) || 
        evt.eventLink === '' || 
        evt.eventType === '' || 
        (!evt.onlineEvent && evt.location === '') || 
        evt.industry === ''
      ){
      toast.error('You are missing required fields.', { theme: 'colored' })
      return false;
    };

    return true;
  }
  const handleFormSubmit = async (type, evt, onClose) => {

    // IMAGE UPLOAD IF SELECTED IN INPUT
    if(evt.eventImage !== ''){
      const eventImage = await uploadEventImage(evt.eventImage);
      evt = {...evt, eventImage: eventImage}
    }

    // FORM VALIDATION
    if(!eventFormValidation(evt)){ return; }


    // EVENT UPDATE | CREATION
    const response = (type === 'edit') ? await updateEvent(evt) : await createEvent(evt);

    // MESSAGES
    switch(response.type){
      case 'success':
        var updatedEvents = [...events];
        const index = updatedEvents.findIndex(e => e.id === response.response.data.id);
        if(index === -1){
          updatedEvents = [...updatedEvents, response.response.data];
        }
        else{
          updatedEvents[index] = response.response.data;
        }
        updatedEvents.sort((a, b) => {
          return (new Date(a.eventDate) - new Date(b.eventDate))
        });
        setEvents(updatedEvents);
        const successMesage = (type === 'edit') ? "updated" : "created"
        toast.success(`The event was ${successMesage} successfully`, { theme: 'colored' });
        break;
      case 'error':
        const errorMesage = (type === 'edit') ? "updating" : "creating"
        toast.error(`There was an error ${errorMesage} the event. Please try again later.`, { theme: 'colored' });
        break;
      default:
        toast.error(`There was an unexpected error. Please try again later.`, { theme: 'colored' });
    }

    // CLOSE MODAL
    onClose();    

    console.log('RESPONSE CRUD:', response);
  }

  return (
    <main>
      <ToastContainer />
      <Tooltip color='primary' content='Create an event'>
        <Button onPress={() => {handleModal('new')}} color='primary' className='rounded-full w-16 h-16 fixed bottom-14 right-14'>
          <Image src={'/images/icons/add-white.svg'} width={50} height={50} alt='Create new event' />
        </Button>
      </Tooltip>
      <InfiniteScroll
        dataLength={events.length}
        next={fetchMoreEvents}
        hasMore={moreEventsAvailable}
        loader={<Spinner color="success" />}
        endMessage={<p className='endMessage'>There are no more results for this search criteria</p>}
      >
        <Accordion variant="splitted" className='p-7'>
          {events.map((ev, index) => (


            <AccordionItem
              // className='bg-green-400'
              key={`event_id_key_${ev.id}_${index}`}
              aria-label={(ev.eventName) ? ev.eventName : 'NO TITLE'}
              title={(ev.eventName) ? ev.id + ' | ' + ev.eventName + ' | ' + moment(ev.eventDate +'Z').format('YYYY-MM-DD') : ev.id + ' | NO TITLE | '}
              startContent={hiddenEvents(ev)}
            >
              <div className="flex w-full flex-col">

                {/* EVENT INFORMATION TABS: IMAGE | DESCRIPTION | DETAILS */}
                <Tabs aria-label="Options" variant='light'>
                  <Tab key="details" title="Details" className={(!ev.eventDate || !ev.location || !ev.eventLink || !ev.eventType || !ev.industry) ? 'bg-warning-100' : ''}>
                    <p><b>Date: </b>{(ev.eventDate) ? moment(ev.eventDate + 'Z').format('YYYY-MM-DD') : <Chip color='warning'>No date</Chip>}</p>
                    <p><b>Start Time: </b>{(ev.eventDate) ? moment(ev.eventDate +'Z').format('h:mm a') : <Chip color='warning'>No time</Chip>}</p>
                    <p><b>End Time: </b>{(ev.eventEndTime) ? moment(ev.eventEndTime + 'Z').format('h:mm a') : <Chip color='warning'>No time</Chip>}</p>
                    <p><b>Location: </b>{(ev.location) ? ev.location : <Chip color='warning'>No location</Chip>}</p>
                    <p><b>Price: </b>{(ev.freeEvent) ? 'Free' : ev.eventCost}</p>
                    <p><b>Link: </b>{(ev.eventLink) ? ev.eventLink : <Chip color='warning'>No link</Chip>}</p>
                    <p><b>Type: </b>{(ev.eventType) ? ev.eventType : <Chip color='warning'>No type</Chip>}</p>
                    <p><b>Industry: </b>{(ev.industry) ? ev.industry : <Chip color='warning'>No industry</Chip>}</p>
                    <p><b>Organization: </b>{(ev.organizationName) ? ev.organizationName : <Chip color='warning'>No Organization</Chip>}</p>
                  </Tab>
                  <Tab key="description" title="Description" className={(!ev.eventDescription) ? 'bg-warning-100' : ''} >
                    {(!ev.eventDescription) ? ' - No description -' : ev.eventDescription}
                  </Tab>
                  <Tab key="image" title='Images' className={(!ev.eventImage) ? 'bg-warning-100' : ''}>
                    {(!ev.eventImage) ? ' - No image -' : <Image src={isValidImageUrl(ev.eventImage)} width={'200'} height={'200'} alt='' />}
                  </Tab>
                </Tabs>

                {/* ACTIONS FOOTER: EDIT | DELETE | PUBLISH */}
                <div className="flex w-full justify-between p-4">
                  <div className='flex items-center justify-between'>
                    <Button size="sm" color='warning' onPress={() => handleModal('edit', ev)}>
                      <Image src="/images/icons/edit-black.svg" width={24} height={24} alt="Edit icon" />
                      Edit
                    </Button>
                    <Spacer x={4} />
                    <Button size="sm" color='danger' onPress={() => handleModal('delete', ev)}>
                      <Image src="/images/icons/delete-white.svg" width={24} height={24} alt="Delete icon" />
                      Delete
                    </Button>
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>Published event: </span>
                    <Spacer x={4} />
                    <Tooltip content={(ev.status === 'approved') ? 'Published event' : 'This event is NOT published yet '} color={(ev.status === 'approved') ? 'success' : 'danger'}>
                      <Switch defaultSelected={(ev.status === 'approved') ? true : false} aria-label="Publish event" onChange={() => handleEventPublication(ev.id)} />
                    </Tooltip>
                  </div>
                </div>
              </div>


            </AccordionItem>
          ))}
        </Accordion>
      </InfiniteScroll>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur' size={modalSize}>
        <ModalContent>
          {(onClose) => (
            <ModalEventsContent type={modalType} event={modalEvent} onClose={onClose} handleEventDeletion={handleEventDeletion} handleFormSubmit={handleFormSubmit} />
          )}
        </ModalContent>
      </Modal>
    </main>
  );
}

// SSR RENDERING (ONLY FIRST BATCH OF EVENTS)
export async function getServerSideProps() {
  // const events = await getAllEvents(context.query);
  // return { props: { eventsList: events.data.content, searchParams: events.params}};
  return { props: { eventsList: [], searchParams: {
    startDate: '',
    page: 0,
    sortField: 'eventDate',
    sortDirection: 'asc',
    size: 10
  }}};
}





