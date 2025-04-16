import Link from "next/link";
import moment from 'moment';
import "../app/styles/components/cardVertical.css";
import isValidImageUrl from "../utils/isValidImage";

const CardVertical = ({content}) => {

  // NEEDS DEFINITION FOR IMAGE FULL PATH!
  const image = isValidImageUrl(content.eventImage);
  
  const date = moment(content.eventDate + 'Z').format('MMM DD, YYYY');

  return (
    <Link href={`/events/${content.id}`} className="cardVerticalContainer">
      <article className="cardVertical">
        {/* IMAGE | REQUIRED */}
        <div className="imageContainer" style={{backgroundImage: `url(${image})`}}>
          {/* <Image src={image} width={390} height={228} alt={content.eventName} /> */}
        </div>

        {/* TITLE | REQUIRED*/}
        <h3>{content.eventName}</h3>

        {/* DESCRIPTION | OPTIONAL */}
        {content.eventDescription && content.eventDescription !== '' && (<p>{content.eventDescription}</p>)}

        <ul>
          {/* LOCATION | REQUIRED */}
          <li className="location">{content.location}</li>
          
          {/* DATE | REQUIRED */}
          <li className="calendar">{date}</li>

          <li className="line-break"></li>

          {/* SPEAKER | OPTIONAL */}
          {content.speakers && content.speakers.length > 0 && (
            <li className="speaker">Speaker: {content.speakers.map((speaker, index) => <span className="speakerItem" key={`speaker_item_${content.id}_${index}`}>{speaker.name}</span>)}</li>
          )}

          <li className="line-break"></li>
          
          {/* ATTENDANTS | OPTIONAL */}
          {/* {content.attendants && content.attendants !== '' && (
            <li className="attendants">Attendants: {content.attendants}</li>
          )} */}
          <li></li>

          {/* PRICE | REQUIRED */}
          <li className="price">{(content.freeEvent) ? 'Free' : `$ ${content.eventCost.toFixed(2)}`}</li>
        </ul>
      </article>
    </Link>
  );
};

export default CardVertical;