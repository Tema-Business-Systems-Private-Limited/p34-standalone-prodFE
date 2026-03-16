// import * as React from 'react';
// import { ScheduleComponent, ResourcesDirective, ResourceDirective, ViewsDirective, ViewDirective, Inject, TimelineViews, Resize, DragAndDrop, TimelineMonth, Day,Week } from '@syncfusion/ej2-react-schedule';
// import './dragdrop.css';
// import { extend } from '@syncfusion/ej2-base';
// import { SampleBase } from './sample-base';
// import dataSource from './datasource.json';
// /**
//  * schedule block events sample
//  */
// export class DragDrop extends SampleBase {
//     data = extend([], dataSource.blockData, null, true);
//     employeeData = [
//         { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Content writer' },
//         { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Designer' },
//         { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Software Engineer' },
//         { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Support Engineer' },
//         { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Human Resource' },
//         { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Content Analyst' }
//     ];
//     getEmployeeName(value) {
//         return value.resourceData[value.resource.textField];
//     }
//     getEmployeeImage(value) {
//         return this.getEmployeeName(value).toLowerCase();
//     }
//     getEmployeeDesignation(value) {
//         return value.resourceData.Designation;
//     }
//     resourceHeaderTemplate(props) {
//         return (<div className="template-wrap"><div className="employee-category"><div className={"employee-image " + this.getEmployeeImage(props)}></div><div className="employee-name">
//             {this.getEmployeeName(props)}</div><div className="employee-designation">{this.getEmployeeDesignation(props)}</div></div></div>);
//     }
//     render() {
//         return (<div className='schedule-control-section'>
//                 <div className='col-lg-12 control-section'>
//                     <div className='control-wrapper drag-sample-wrapper'>
//                         <div className="schedule-container">
//                             <ScheduleComponent cssClass='block-events' width='100%' height='650px' selectedDate={new Date(2021, 7, 2)} currentView='TimelineDay' resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)} eventSettings={{ dataSource: this.data }} group={{ enableCompactView: false, resources: ['Employee'] }}>
//                                 <ResourcesDirective>
//                                     <ResourceDirective field='EmployeeId' title='Employees' name='Employee' allowMultiple={true} dataSource={this.employeeData} textField='Text' idField='Id' colorField='Color'>
//                                     </ResourceDirective>
//                                 </ResourcesDirective>
//                                 <ViewsDirective>
//                                 <ViewDirective isSelected={true} option='Week'/>

//                                     <ViewDirective option='Day'/>
                                  
//                                     <ViewDirective option='TimelineDay'/>
//                                     <ViewDirective option='TimelineMonth'/>
//                                 </ViewsDirective>
//                                 <Inject services={[Week,Day, TimelineViews, Resize, DragAndDrop]}/>
//                             </ScheduleComponent>
//                         </div>
//                     </div>
//                 </div>
//             </div>);
//     }
// }

import { Week,ScheduleComponent, ResourcesDirective, ResourceDirective, ViewsDirective, ViewDirective, Inject, TimelineViews, Resize, DragAndDrop, TimelineMonth } from '@syncfusion/ej2-react-schedule';
import "./dragdrop.css"
import { extend, closest, remove, addClass } from '@syncfusion/ej2-base';
import { SampleBase } from './sample-base';
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations';
import dataSource from './datasource.json';

export class ExternalDragDrop extends SampleBase {
    scheduleObj;
    treeObj;
    isTreeItemDropped = false;
    draggedItemId = '';
    allowDragAndDrops = true;
    fields = { dataSource: dataSource.waitingList, id: 'Id', text: 'Name' };
    data = extend([], dataSource.hospitalData, null, true);
    departmentData = [
        { Text: 'GENERAL', Id: 1, Color: '#bbdc00' },
        { Text: 'DENTAL', Id: 2, Color: '#9e5fff' }
    ];
    consultantData = [
        { Text: 'Alice', Id: 1, GroupId: 1, Color: '#bbdc00', Designation: 'Cardiologist' },
        { Text: 'Nancy', Id: 2, GroupId: 2, Color: '#9e5fff', Designation: 'Orthodontist' },
        { Text: 'Robert', Id: 3, GroupId: 1, Color: '#bbdc00', Designation: 'Optometrist' },
        { Text: 'Robson', Id: 4, GroupId: 2, Color: '#9e5fff', Designation: 'Periodontist' },
        { Text: 'Laura', Id: 5, GroupId: 1, Color: '#bbdc00', Designation: 'Orthopedic' },
        { Text: 'Margaret', Id: 6, GroupId: 2, Color: '#9e5fff', Designation: 'Endodontist' }
    ];
    getConsultantName(value) {
        return value.resourceData[value.resource.textField];
    }
    getConsultantImage(value) {
        return this.getConsultantName(value).toLowerCase();
    }
    getConsultantDesignation(value) {
        return value.resourceData.Designation;
    }
    resourceHeaderTemplate(props) {
        return (<div className="template-wrap"><div className="specialist-category"><div className={"specialist-image " + this.getConsultantImage(props)}></div><div className="specialist-name">
      {this.getConsultantName(props)}</div><div className="specialist-designation">{this.getConsultantDesignation(props)}</div></div></div>);
    }
    treeTemplate(props) {
        return (<div id="waiting"><div id="waitdetails"><div id="waitlist">{props.Name}</div>
      <div id="waitcategory">{props.DepartmentName} - {props.Description}</div></div></div>);
    }
    onItemSelecting(args) {
        args.cancel = true;
    }
    onTreeDrag(event) {
        if (this.scheduleObj.isAdaptive) {
            let classElement = this.scheduleObj.element.querySelector('.e-device-hover');
            if (classElement) {
                classElement.classList.remove('e-device-hover');
            }
            if (event.target.classList.contains('e-work-cells')) {
                addClass([event.target], 'e-device-hover');
            }
        }
    }
    onActionBegin(event) {
        if (event.requestType === 'eventCreate' && this.isTreeItemDropped) {
            let treeViewData = this.treeObj.fields.dataSource;
            const filteredPeople = treeViewData.filter((item) => item.Id !== parseInt(this.draggedItemId, 10));
            this.treeObj.fields.dataSource = filteredPeople;
            let elements = document.querySelectorAll('.e-drag-item.treeview-external-drag');
            for (let i = 0; i < elements.length; i++) {
                remove(elements[i]);
            }
        }
    }
    onTreeDragStop(event) {
        let treeElement = closest(event.target, '.e-treeview');
        let classElement = this.scheduleObj.element.querySelector('.e-device-hover');
        if (classElement) {
            classElement.classList.remove('e-device-hover');
        }
        if (!treeElement) {
            event.cancel = true;
            let scheduleElement = closest(event.target, '.e-content-wrap');
            if (scheduleElement) {
                let treeviewData = this.treeObj.fields.dataSource;
                if (event.target.classList.contains('e-work-cells')) {
                    const filteredData = treeviewData.filter((item) => item.Id === parseInt(event.draggedNodeData.id, 10));
                    let cellData = this.scheduleObj.getCellDetails(event.target);
                    let resourceDetails = this.scheduleObj.getResourcesByIndex(cellData.groupIndex);
                    let eventData = {
                        Name: filteredData[0].Name,
                        StartTime: cellData.startTime,
                        EndTime: cellData.endTime,
                        IsAllDay: cellData.isAllDay,
                        Description: filteredData[0].Description,
                        DepartmentID: resourceDetails.resourceData.GroupId,
                        ConsultantID: resourceDetails.resourceData.Id
                    };
                    this.scheduleObj.openEditor(eventData, 'Add', true);
                    this.isTreeItemDropped = true;
                    this.draggedItemId = event.draggedNodeData.id;
                }
            }
        }
        document.body.classList.remove('e-disble-not-allowed');
    }
    onTreeDragStart() {
        document.body.classList.add('e-disble-not-allowed');
    }
    render() {
        return (<div className='schedule-control-section'>
        <div className='col-lg-12 control-section'>
          <div className='control-wrapper drag-sample-wrapper'>
            <div className="schedule-container">
              <div className="title-container">
                <h1 className="title-text">Driver Shedular</h1>
              </div>
              <ScheduleComponent ref={schedule => this.scheduleObj = schedule} cssClass='schedule-drag-drop' width='100%' height='650px' selectedDate={new Date(2021, 7, 2)} currentView='week' resourceHeaderTemplate={this.resourceHeaderTemplate.bind(this)} eventSettings={{
                dataSource: this.data,
                fields: {
                    subject: { title: 'Patient Name', name: 'Name' },
                    startTime: { title: "From", name: "StartTime" },
                    endTime: { title: "To", name: "EndTime" },
                    description: { title: 'Reason', name: 'Description' }
                }
            }} group={{ enableCompactView: false, resources: ['Departments', 'Consultants'] }} actionBegin={this.onActionBegin.bind(this)}>
                <ResourcesDirective>
                  {/* <ResourceDirective field='DepartmentID' title='Department' name='Departments' allowMultiple={false} dataSource={this.departmentData} textField='Text' idField='Id' colorField='Color'>
                  </ResourceDirective> */}
                  <ResourceDirective field='ConsultantID' title='Consultant' name='Consultants' allowMultiple={false} dataSource={this.consultantData} textField='Text' idField='Id' groupIDField="GroupId" colorField='Color'>
                  </ResourceDirective>
                </ResourcesDirective>
                <ViewsDirective>
                  <ViewDirective option='Week'/>
                  <ViewDirective option='TimelineDay'/>
                  <ViewDirective option='TimelineMonth'/>

                </ViewsDirective>
                <Inject services={[TimelineViews, TimelineMonth, Resize, DragAndDrop,Week]}/>
              </ScheduleComponent>
            </div>
            <div className="treeview-container">
              <div className="title-container">
                <h1 className="title-text">Waiting List</h1>
              </div>
              <TreeViewComponent ref={tree => this.treeObj = tree} cssClass='treeview-external-drag' dragArea=".drag-sample-wrapper" nodeTemplate={this.treeTemplate.bind(this)} fields={this.fields} nodeDragStop={this.onTreeDragStop.bind(this)} nodeDragging={this.onTreeDrag.bind(this)} nodeDragStart={this.onTreeDragStart} nodeSelecting={this.onItemSelecting.bind(this)} allowDragAndDrop={this.allowDragAndDrops}/>
            </div>
          </div>
        </div>
      </div>);
    }
}
