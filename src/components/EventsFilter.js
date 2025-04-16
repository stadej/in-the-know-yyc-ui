import { useState, useEffect } from 'react';
import React from "react";
import { DatePicker } from "@nextui-org/date-picker";
import { parseDate } from "@internationalized/date";
import {CheckboxGroup, Checkbox} from "@nextui-org/checkbox";
import SearchEventInput from './SearchEventInput'
import moment from "moment/moment";
import "../app/styles/components/eventsFilter.css";

const EventsFilter = ({params, events, handleFilter}) => {

  const dateNow = new Date();
  const dateTimeNow = moment(dateNow).format('YYYY-MM-DD');
  const [startDate, setStartDate] = useState(parseDate(dateTimeNow));
  const [endDate, setEndDate] = useState(null);
  
  const [costSelected, setCostSelected] = useState(["free","paid"]);
  const [modalitySelected, setModalitySelected] = useState(["online","inperson"]);
  const [industrySelected, setIndustrySelected] = useState(["Tech","Business","Other"]);
  const [eventTypeSelected, setEventTypeSelected] = useState(["Meetup","Conference","Showcase","General","Networking","Hackathon","Specialization","Other"]);

  // filter function, called when any filter field is changed
  useEffect(() => {
    const filteredEvents = events.filter((event) => {

      //filter out dates outside selected range
      if (new Date(event.eventDate + 'Z') < new Date(startDate)){
        return false;
      }
      if (endDate && new Date(event.eventDate + 'Z') > new Date(endDate)){
        return false;
      }

      //filter out free/paid events
      if (event.freeEvent && !costSelected.includes("free")){
        return false;
      }
      if (!event.freeEvent && !costSelected.includes("paid")){
        return false;
      }

      //filter out online/inperson events
      if (event.onlineEvent && !modalitySelected.includes("online")){
        return false;
      }
      if (!event.onlineEvent && !modalitySelected.includes("inperson")){
        return false;
      }

      //filter out deselected industry/event types
      if (!industrySelected.includes(event.industry)){
        return false;
      }
      if (!eventTypeSelected.includes(event.eventType)){
        return false;
      }

      return true;
    });

    console.log(filteredEvents);

    handleFilter(filteredEvents);

  }, [events, handleFilter, startDate, endDate, costSelected, modalitySelected, industrySelected, eventTypeSelected]);
  
  return (
    <section className="eventsFilter">
      <h4><b>Filter Events</b></h4><br/>
      <div className="filtersContainer">
        <form id="searchContainer">
          <SearchEventInput inputId={'inputSearchEventsFilter'} formId={'eventListSearchForm'} searchText={params.searchText}/>
        </form>
        <ul>
          <span>Date Range</span>
          <br/>
            <div className="dateEventsContainer">
            <DatePicker 
              label='Start Date'
              labelPlacement="inside"
              placeholder='Date'
              id='eventFilter-startDate' 
              className='dateEventFilter'
              aria-label="Date"
              showMonthAndYearPickers
              minValue={parseDate(dateTimeNow)}
              defaultValue={startDate}
              onChange={
                (value) => {
                  setStartDate(value)
                }
              }
              classNames={{
                selectorIcon: "dateEventFilter-selectorIcon",
                selectorButton: "dateEventFilter-selectorButton",
                inputField: "dateEventFilter-inputField",
              }}
              dateInputClassNames={{
                inputWrapper: "dateEventFilter-inputWrapper",
                innerWrapper: "dateEventFilter-innerWrapper",
                helperWrapper: "dateEventFilter-helperWrapper",
                description: "dateEventFilter-descriptionMessage",
              }}
            />
            <DatePicker 
              label='End Date'
              labelPlacement="inside"
              placeholder='Date'
              id='eventFilter-endDate' 
              className='dateEventFilter'
              aria-label="Date"
              minValue={parseDate(dateTimeNow)}
              showMonthAndYearPickers
              defaultValue=''
              onChange={
                (value) => {
                  setEndDate(value)
                }
              }
              classNames={{
                selectorIcon: "dateEventFilter-selectorIcon",
                selectorButton: "dateEventFilter-selectorButton",
                inputField: "dateEventFilter-inputField",
              }}
              dateInputClassNames={{
                inputWrapper: "dateEventFilter-inputWrapper",
                innerWrapper: "dateEventFilter-innerWrapper",
                helperWrapper: "dateEventFilter-helperWrapper",
                description: "dateEventFilter-descriptionMessage",
              }}
            />
          </div>
        </ul>
        <CheckboxGroup defaultValue={costSelected} onChange={(value) => {setCostSelected(value)}} label="Cost">
          <Checkbox value="free">Free Events</Checkbox>
          <Checkbox value="paid">Paid Events</Checkbox>
        </CheckboxGroup>
        <CheckboxGroup defaultValue={modalitySelected} onChange={(value) => {setModalitySelected(value)}} label="Modality">
          <Checkbox value="online">Online</Checkbox>
          <Checkbox value="inperson">In-Person</Checkbox>
        </CheckboxGroup>
        <CheckboxGroup defaultValue={industrySelected} onChange={(value) => {setIndustrySelected(value)}} label="Industry">
          <Checkbox value="Tech">Tech</Checkbox>
          <Checkbox value="Business">Business</Checkbox>
          <Checkbox value="Other">Other</Checkbox>
        </CheckboxGroup>
        <CheckboxGroup defaultValue={eventTypeSelected} onChange={(value) => {setEventTypeSelected(value)}} label="Event Type">
          <Checkbox value="Meetup">Meetup</Checkbox>
          <Checkbox value="Conference">Conference</Checkbox>
          <Checkbox value="Showcase">Showcase</Checkbox>
          <Checkbox value="General">General</Checkbox>
          <Checkbox value="Networking">Networking</Checkbox>
          <Checkbox value="Hackathon">Hackathon</Checkbox>
          <Checkbox value="Specialization">Specialization</Checkbox>
          <Checkbox value="Other">Other</Checkbox>
        </CheckboxGroup>
      </div>
    </section>
  );
};

export default EventsFilter;