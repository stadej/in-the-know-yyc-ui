import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';
import moment from "moment/moment";

const api_endpoint = process.env.API_ENDPOINT || process.env.NEXT_PUBLIC_API_ENDPOINT;

const dateNow = new Date();
const dateTimeNow = moment(dateNow).format('YYYY-MM-DDTHH:mm:ss');

const buildParams = (filters) => {
  //NOTE: filters: searchText | startDate | eventType (industry)

  // PARAMS NOTE: 
  //    SSR uses different params to keep the URL user-friendly. 
  //    CSR uses the API required params to maintain the state variables

  return ({
    startDate: (filters && filters.date) ? moment(filters.date).format('YYYY-MM-DDTHH:mm:ss') : (filters && filters.startDate) ? moment(filters.startDate).format('YYYY-MM-DDTHH:mm:ss') : '',
    page: (filters && filters.page) ? filters.page : 0,
    sortField: 'eventDate',
    sortDirection: 'asc',
    size: (filters && filters.size) ? filters.size : 10,
    searchText: (filters && filters.search) ? filters.search : '',
  });
}

export async function getFilteredEvents(filters = null) {
 
  const params = buildParams(filters);

  console.log(api_endpoint);
  console.log(params);

  try {
    const response = await axios.get(`${api_endpoint}/events`, { params });
    return {params: {...params, page:params.page+1}, data: response.data};
  } catch (error) {
    console.error('Error fetching events:', error);
    return null;
  }
}

export async function getEventById(id = null) {

  try {
    const response = await axios.get(`${api_endpoint}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching event with id = ${id}:`, error);
    return null;
  }

}

export async function getNextEvents() { // LATEST EVENTS | HOME
  try {
    const params = {
      sortField: 'eventDate',
      sortDirection: 'asc',
      size: 6,
      startDate: dateTimeNow,
      searchText: ''
    }

    const response = await axios.get(`${api_endpoint}/events`, { params });

    return response.data.content;

  } catch (error) {
    console.error('Error fetching next events:', error.message);
    return null;
  }
}


/* - - - - - - - - - - - - - - - - - - - - - - - */
/* - - - - - - - EVENTS CRUD (API) - - - - - - - */
/* - - - - - - - - - - - - - - - - - - - - - - - */

export async function getAllEvents(filters = null) {

  const params = buildParams(filters);

  try {
    const response = await axiosInstance.get(`${api_endpoint}/events`, { params });
    return {params: {...params, page:params.page+1}, data: response.data};
  } catch (error) {
    console.error('Error fetching events:', error);
    return null;
  }
}

export async function switchEventStatus(id, status){
  try {
    const s = (status === 'approved') ? 'approve' : 'reject';
    const response = await axiosInstance.patch(`${api_endpoint}/events/${id}/${s}`);
    return {type: 'success', response};
  } catch (error) {
    console.error('Error switching events status:', error);
    return {type: 'error', error}
  }
}


export async function updateEvent(event){
  
  const id = event.id;
  const startTime = moment(`${event.eventDate}T${event.eventStartTime}`, moment.ISO_8601);
  const endTime = moment(`${event.eventDate}T${event.eventEndTime}`, moment.ISO_8601);

  const e = {
    organizationName: event.organizationName,
    eventName: event.eventName,
    eventDescription: event.eventDescription,
    eventDate: startTime.toISOString(),
    eventEndTime: endTime.toISOString() || '',
    freeEvent: event.freeEvent,
    eventCost: event.eventCost,
    eventLink: event.eventLink,
    eventType: event.eventType,
    onlineEvent: event.onlineEvent,
    location: event.location,
    industry: event.industry,
    eventImage: event.eventImage
  }

  console.log('UPDATE EVENT API:', e);

  try {
    const response = await axiosInstance.put(`${api_endpoint}/events/${id}`, e);
    return {type: 'success', response};
  } catch (error) {
    console.error('Error updating event:', error);
    return {type: 'error', error}
  }
}

export async function createEvent(event){

  const startTime = moment(`${event.eventDate}T${event.eventStartTime}`, moment.ISO_8601);
  const endTime = moment(`${event.eventDate}T${event.eventEndTime}`, moment.ISO_8601);
  const e = {
    organizationName: event.organizationName,
    eventName: event.eventName,
    eventDescription: event.eventDescription,
    eventDate: startTime.toISOString(),
    eventEndTime: endTime.toISOString(),
    freeEvent: event.freeEvent,
    eventCost: event.eventCost,
    eventLink: event.eventLink,
    eventType: event.eventType,
    onlineEvent: event.onlineEvent,
    location: event.location,
    industry: event.industry,
    eventImage: event.eventImage
  }

  console.log('CREATE EVENT API:', e);

  try {
    const response = await axiosInstance.post(`${api_endpoint}/events`, e);
    return {type: 'success', response};
  } catch (error) {
    console.error('Error creating event:', error);
    return {type: 'error', error}
  }
}

export async function uploadImage(formData){
  console.log('IMAGE EN API: ', formData.get('file'))
  try {
    const response = await axiosInstance.post(`${api_endpoint}/files/upload`, formData,{headers: {'Content-Type': 'multipart/form-data',}});
    return {type: 'success', link: `${api_endpoint}/files/download/${response.data}`};
  } catch (error) {
    console.error('Error uploading image:', error);
    return {type: 'error', error: error}
  }
}

export async function deleteEvent(id){
  try {
    const response = await axiosInstance.delete(`${api_endpoint}/events/${id}`);
    return {type: 'success', response};
  } catch (error) {
    console.error('Error deleting event:', error);
    return {type: 'error', error}
  }
}