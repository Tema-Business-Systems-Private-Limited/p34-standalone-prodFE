import React, {useState} from 'react';
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

export default function DriverReportCalendar({ data = [], drivers = [], selectedDate, handleDateRangeChange }) {

const [showEditorTemplate, setshowEditorTemplate] = useState(false); // Defining state
const [EditorData, setEditorData] = useState(""); // Defining state
const [addInfoShow, setaddInfoShow] = useState(false); // Defining state

  const getColor = (style) => {
    var myStr = style || '';
    var subStr = myStr.match("background-color:(.*)");
    var s = subStr ? subStr[1] : '';
    return s;
  };

  const driverResources = drivers.map((item) => ({
    Text: item.driver,
    Id: item.driverid,
    Color: getColor(item.color)
  }));

  const events = Array.isArray(data) ? data.map(item => ({
    Id: item.docnum,
    Subject: item.client || 'No Client',
    StartTime: new Date(item.docdate || Date.now()),
    EndTime: new Date(item.docdate || Date.now()),
    IsAllDay: true,
    DriverId: item.driverCode
  })) : [];

  const eventTemplate = (props) => {
    const driver = driverResources.find(d => d.Id === props.DriverId);
    const eventsOnSameDay = events.filter(e =>
      e.DriverId === props.DriverId &&
      e.StartTime.toDateString() === props.StartTime.toDateString()
    );

    if (eventsOnSameDay.length >= 1) {
      return (
        <div className="event-template" style={{ backgroundColor: driver?.Color, color : "black" }}>
          <div>{props.Subject}-  DAta</div>
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
    const driver = drivers.find(d => d.driverid === props.resourceData.Id);
    return (
      <div className="resource-header-template">
        <span>{props.resourceData.Text || 'Unknown Driver'}</span>
        <span className="driver-details">{driver?.cty || 'Unknown Location'}</span>
      </div>
    );
  };

  const onRenderCell = (args) => {
    if (args.element.classList.contains('e-appointment-details')) {
      const driver = driverResources.find(d => d.Id === args.data.driverCode);
      if (driver) {
        args.element.style.backgroundColor = driver.Color;
        const subjectElement = args.element.querySelector('.e-subject');
        if (subjectElement) {
          subjectElement.style.color = '#000000';
          subjectElement.style.fontWeight = 'bold';
        }
      }
    }
  };

  if (drivers.length === 0 || data.length === 0) {
    return <div>No data available</div>;
  }

  if (events.length === 0) {
    return <div>No event data available</div>;
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
            group={{ resources: ['Drivers'] }}
            rowAutoHeight={false}
            popupOpen={onPopupOpen}
             actionComplete={onSchActionComplete}
            timeScale={{ enable: false }}
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
                field='DriverId'
                title='Driver'
                name='Drivers'
                allowMultiple={false}
                dataSource={driverResources}
                textField='Text'
                idField='Id'
                colorField='Color'
                resourceHeaderTemplate={resourceHeaderTemplate}
              />
            </ResourcesDirective>
            <Inject services={[TimelineViews, TimelineMonth, Resize, DragAndDrop]} />
          </ScheduleComponent>
        </div>
          {showEditorTemplate && (
                      <EditorTemp
                        onClose={hideModal}
                        //onSave={this.saveModal}
                        //onCreated={this.onCreated}
                        SelectedDocData={EditorData}
                      />
                    )}
      </div>
    </div>
  );
}