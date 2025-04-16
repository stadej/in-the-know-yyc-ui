import Link from "next/link";
import "../app/styles/components/cardHorizontal.css";
import moment from "moment/moment";

const CardHorizontal = ({ content }) => {

  const dateTime = moment(content.eventDate+'Z');
  const endTime = content.eventEndTime ? moment(content.eventEndTime+'Z'): "";
  
  return (
    <Link href={`/events/${content.id}`} className="linkCardHorizontal">
      <article className="cardHorizontal">

        <div className="content">
          <ul>
            {/* TITLE | REQUIRED*/}
            <h5><b>{content.eventName}</b></h5>
          </ul>
          <ul>
            {/* DATE | REQUIRED*/}
            <h4>{dateTime.format('ddd, MMM DD YYYY')}</h4>
            {/* TIME RANGE | REQUIRED*/}
            {endTime === "" && (
              <h4>{dateTime.format('h:mm a z')}</h4>
            )}
            {endTime !== "" && (
              <h4>{dateTime.format('h:mm') + ' - ' + endTime.format('h:mm a z')}</h4>
            )}
          </ul>

          <ul>
            {/* HOST | OPTIONAL */}
            {content.organizationName && content.organizationName !== '' && (
              <ul>
                <label><b>Host/Facilitator:&nbsp;</b></label>
                <p>{content.organizationName}</p>
              </ul>
            )}

            <li className="categories">
                <span>{content.industry}</span>
                <span>{content.eventType}</span>
            </li>
          </ul>

          <div className="location">
            {/* LOCATION | REQUIRED */}
            <label>{content.onlineEvent ? 'Online' : content.location}</label>

            {/* ENTRANCE | REQUIRED */}
            <span>{content.freeEvent ? 'Free' : `$ ${content.eventCost.toFixed(2)}`}</span>
          </div>

        </div>
      </article>
    </Link>
  );
};

export default CardHorizontal;