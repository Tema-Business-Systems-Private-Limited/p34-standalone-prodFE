import React, {useState}  from 'react';
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  ResourcesDirective,
  ResourceDirective,
  Inject,
  TimelineViews,
  TimelineMonth,
  Resize,
  DragAndDrop
} from '@syncfusion/ej2-react-schedule';
import { extend } from '@syncfusion/ej2-base';
import './report.css';
import EditorTemp from './EditorTemp';


export default function TrailerReportCalendar({ data = [], trailers = [], selectedDate, handleDateRangeChange }) {


const [showEditorTemplate, setshowEditorTemplate] = useState(false); // Defining state
const [EditorData, setEditorData] = useState(""); // Defining state
const [addInfoShow, setaddInfoShow] = useState(false); // Defining state


  const getColor = (style) => {
    var myStr = style || '';
    var subStr = myStr.match("background-color:(.*)");
    var s = subStr ? subStr[1] : '';
    return s;
  };

  const trailerResources = trailers.map((item) => ({
    Text: item.trailer,
    Id: item.trailer,
    Color: getColor(item.color)
  }));

  const events = data.map(item => ({
    Id: item.docnum,
    Subject: item.client,
    StartTime: new Date(item.docdate || Date.now()),
    EndTime: new Date(item.docdate || Date.now()),
    IsAllDay: true,
    TrailerId: item.trailer || item.vehicle
  }));

  const eventTemplate = (props) => {
   console.log("AT Event Template", props)
    const trailer = trailerResources.find(t => t.Id === props.TrailerId);
    const eventsOnSameDay = events.filter(e =>
      e.TrailerId === props.TrailerId &&
      e.StartTime.toDateString() === props.StartTime.toDateString()
    );

    if (eventsOnSameDay.length === 1) {
      return (
        <div className="event-template" style={{ backgroundColor: trailer?.Color , color : "black" }}>
          {props.Subject} - {props.Id}
        </div>
      );
    } else if (eventsOnSameDay.length > 1) {
      return (
        <div className="event-template" style={{ backgroundColor: trailer?.Color , color : "black"}}>
          {props.Subject}- - {props.Id}
        </div>
      );
    }
    return null;
  };


  const onSchActionComplete = (event) => {
     // console.log("action compltes sch event",event);
     if (event.requestType === "dateNavigate") {
       // console.log("schduler object =",this.scheduleObj);
       handleDateRangeChange();
     }
   }


 const resourceHeaderTemplate = (props) => {
   // const trailer = trailers.find(t => t.trailer === props.resourceData.Text);
   console.log("resourceHeaderTemplate", props);
    return (
      <div className="resource-header-template">
        <span>{props.resourceData.Text} - {props.resourceData.des}  </span>
        <span className="driver-details">{props.resourceData.des}</span>
      </div>
    );
  };

  const onRenderCell = (args) => {
    if (args.element.classList.contains('e-appointment-details')) {
      const trailer = trailerResources.find(t => t.Id === args.data.TrailerId);
      if (trailer) {
        args.element.style.backgroundColor = trailer.Color;
        const subjectElement = args.element.querySelector('.e-subject');
        if (subjectElement) {
          subjectElement.style.color = '#000000';
          subjectElement.style.fontWeight = 'bold';
        }
      }
    }
  };

  if (trailers.length === 0 || data.length === 0) {
    return <div>No data available</div>;
  }


  const showModal = (e) => {
         console.log("show modale =",e)

    setshowEditorTemplate(true);
    setEditorData(e);
      };



    const hideModal = (e) => {
     setshowEditorTemplate(false);
    };

    const onPopupOpen = (args) => {
      console.log("On Popup open", args)
        if (args.type === "Editor") {
          args.cancel = true;
         // this.data = args.data;
          showModal(args.data);
        } else {
          args.cancel = true;
        }
      };


  return (
    <div className="schedule-control-section">
      <div className="col-lg-12 control-section">
        <div className="control-wrapper">
          <ScheduleComponent
            width='100%'
            height='auto'
            selectedDate={selectedDate} // November 3, 2024
            eventSettings={{
              dataSource: extend([], events, null, true),
              template: eventTemplate
            }}
            group={{ resources: ['Trailers'] }}
            rowAutoHeight={false}
            timeScale={{ enable: false }}
               popupOpen={onPopupOpen}
                actionComplete={onSchActionComplete}
             resourceHeaderTemplate={resourceHeaderTemplate}
            allowResizing={false}
            allowDragAndDrop={false}
            renderCell={onRenderCell}
          >
            <ViewsDirective>
              <ViewDirective option='TimelineDay' displayName="Day" interval={1} />
              <ViewDirective option='TimelineWeek' displayName="Week" interval={1} />
              <ViewDirective option='TimelineMonth' displayName="Month" interval={1} />
            </ViewsDirective>
            <ResourcesDirective>
              <ResourceDirective
                field='TrailerId'
                title='Trailer'
                name='Trailers'
                allowMultiple={false}
                dataSource={trailerResources}
                textField='Text'
                idField='Id'
                colorField='Color'
              />
            </ResourcesDirective>
            <Inject services={[TimelineViews, TimelineMonth, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
          {showEditorTemplate && (
                      <EditorTemp
                        onClose={hideModal}
                        SelectedDocData={EditorData}
                      />
                    )}
      </div>
    </div>
  );
}