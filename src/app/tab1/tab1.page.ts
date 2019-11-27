import { Component, ViewChild, LOCALE_ID, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  minDate = new Date().toISOString();

  eventSource = [];
  viewTitle;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };



  @ViewChild(CalendarComponent, { static: false }) myCal: CalendarComponent;

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.resetEvent();
    //this.loadEvent();
  }


  // loadEvent() {
  //   let appointmentList = [{ "id": 6055, "purpose": "meeting", "date": "2019-08-12", "startTime": "19:20", "endTime": "19:35", "bookedBy": "jom", "meetingWith": "1", "status": "T" }, { "id": 7056, "purpose": "meeting", "date": "2019-08-14", "startTime": "17:00", "endTime": "18:00", "bookedBy": "suyash", "meetingWith": "901", "status": "T" }, { "id": 9055, "purpose": "meeting", "date": "2019-09-10", "startTime": "16:00", "endTime": "17:00", "bookedBy": "admin", "meetingWith": "1", "status": "T" }, { "id": 9056, "purpose": "project discussion", "date": "2019-09-11", "startTime": "11:00", "endTime": "12:00", "bookedBy": "jom", "meetingWith": "1", "status": "T" }, { "id": 9057, "purpose": "meeting", "date": "2019-09-12", "startTime": "12:00", "endTime": "13:00", "bookedBy": "jom", "meetingWith": "1", "status": "T" }, { "id": 9058, "purpose": "meeting", "date": "2019-09-12", "startTime": "14:00", "endTime": "15:00", "bookedBy": "jom", "meetingWith": "1", "status": "F" }, { "id": 9071, "purpose": "meeting", "date": "2019-09-16", "startTime": "15:00", "endTime": "16:00", "bookedBy": "BOSS", "meetingWith": "1", "status": "T" }, { "id": 9072, "purpose": "Client Meeting", "date": "2019-09-16", "startTime": "03:00", "endTime": "04:00", "bookedBy": "BOSS", "meetingWith": "1", "status": "F" }, { "id": 9075, "purpose": "AMS project discussion", "date": "2019-09-12", "startTime": "18:00", "endTime": "18:15", "bookedBy": "BOSS", "meetingWith": "1", "status": "T" }, { "id": 9076, "purpose": "Meeting", "date": "2019-09-12", "startTime": "01:00", "endTime": "01:05", "bookedBy": "admin", "meetingWith": "1", "status": "T" }, { "id": 9077, "purpose": "Appraisal meeting", "date": "2019-09-12", "startTime": "07:00", "endTime": "07:05", "bookedBy": "rajnish", "meetingWith": "1", "status": "T" }, { "id": 10055, "purpose": "testing", "date": "2019-11-12", "startTime": "15:10", "endTime": "16:00", "bookedBy": "admin", "meetingWith": "1", "status": "T" }, { "id": 10056, "purpose": "test", "date": "2019-11-12", "startTime": "16:35", "endTime": "18:35", "bookedBy": "admin", "meetingWith": "1", "status": "T" }];
  //   let displayEventCopy;
  //   let startTime;
  //   let endTime;

  //   appointmentList.forEach(element => {
  //     startTime = new Date(element.date + " " + element.startTime);
  //     endTime = new Date(element.date + " " + element.endTime);
  //     displayEventCopy = { "title": element.purpose, "startTime": startTime, "endTime": endTime, "allDay": false, "desc": "", "bookedBy": element.bookedBy, "meetingWith": element.meetingWith, "status": element.status };
  //     this.eventSource.push(displayEventCopy);
  //     this.myCal.loadEvents();
  //     this.resetEvent();
  //   });
  // }

  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }

  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }

  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
    let apptStatus;
    if (event.status == 'T') {
      apptStatus = "Approved";
    } else if (event.status == 'F') {
      apptStatus = "Cancelled";
    } else if (event.status == 'W') {
      apptStatus = "Waiting For Approval";
    }
    const alert = await this.alertCtrl.create({
      header: "Info",
      subHeader: event.desc,
      //message: 'From: ' + start + '<br>To: ' + end +'<br>Appointment Taken By: '+event.bookedBy+'<br>Purpose: '+event.title+'<br>Status: '+apptStatus,
      message: `<div class="text-left">From: <b>${start}</b><br>
  To: <b>${end}</b><br>
  Appointment Taken By: <b>${event.bookedBy}</b><br>
  Purpose: <b> ${event.title}</b><br>
  Status:<b>${apptStatus}</b><br>
  </div>
`,
      buttons: ['OK']
    });
    alert.present();
  }

  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }
  callenderShow: any = false;
  //constructor(private activatedRoute: ActivatedRoute) {}

  toggleCallendar() {
    this.callenderShow = this.callenderShow ? false : true;
    console.log(this.callenderShow)
  }


}
