import React from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import DatePicker, { DateInput, TimeInput } from '@trendmicro/react-datepicker';
import '@trendmicro/react-datepicker/dist/react-datepicker.css';
import * as moment from 'moment';
import Modal from 'react-modal';
import { eventService } from "./core/services/event";
import AgendaModal from "./shared/components/modal";
import DatePickerInput from "./shared/components/datepicker-input";
import './App.css';

export default class App extends React.Component {
  state = {
    title: '',
    date: moment().format('YYYY-MM-DD'),
    start: moment().format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD'),
    showStartDatePicker: false,
    showEndDatePicker: false,
    showDatePicker: false,
    description: '',
    events: [
      // { id: '10', title: 'event 1', start: '2020-07-01', end: '2020-07-04' },
      // { id: '12', title: 'event 2', start: '2020-07-06', end: '2020-07-10' }
    ],
    modalIsOpen: false,
    modalTitle: ''
  };

  componentDidMount() {
    eventService.getevents().then(res => {
      this.setState({ events: res.data })
    })
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal = () => {

  }

  closeModal = () => {
    console.log('click')
    this.setState({ modalIsOpen: false });
    console.log(this.state.modalIsOpen);
  }

  saveData = () => {

    this.setState({ modalIsOpen: false });
    console.log(this.state.modalIsOpen);
  }

  handleDateClick = (arg) => { // bind with an arrow function
    this.setState({ modalIsOpen: true, modalTitle: 'Novo Evento' });
  }

  handleEventClick = (arg) => { // bind with an arrow function
    console.log(arg.event.title);
    this.setState({ modalIsOpen: true, modalTitle: 'Editar Evento' });
  }

  render() {

    return (
      <>
        <button onClick={this.openModal}>Open Modal</button>
        <AgendaModal
          modalIsOpen={this.state.modalIsOpen}>
          <div className="modal-header">
            <h2>{this.state.modalTitle}</h2>
            <button onClick={this.closeModal}>X</button>
          </div>
          <div className="modal-body">
            <label>Título do evento:</label>
            <input
              value={this.state.title}
              type="text"
            />

            <DatePickerInput
              date={this.state.start}
              showDatePicker={this.state.showStartDatePicker}
              label='Data de início:'
              onFocus={() => {
                this.setState({ showStartDatePicker: true })
              }}
              onSelect={(start) => {
                this.setState({ start }, () => {
                  this.setState({ showStartDatePicker: false })
                });
              }}
            />

            <DatePickerInput
              date={this.state.end}
              showDatePicker={this.state.showEndDatePicker}
              label='Data de término:'
              onFocus={() => {
                this.setState({ showEndDatePicker: true })
              }}
              onSelect={(end) => {
                this.setState({ end }, () => {
                  this.setState({ showEndDatePicker: false })
                });
              }}
            />

            <label>Descrição:</label>
            <textarea
              value={this.state.description}
              rows="6"
            ></textarea>
          </div>
          <div className="modal-footer">
            <button onClick={this.closeModal}>Salvar</button>
            <button onClick={this.closeModal}>Fechar</button>
          </div>
        </AgendaModal>

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={this.handleDateClick}
          eventClick={this.handleEventClick}
          events={this.state.events}
        />
      </>

    )
  }
}