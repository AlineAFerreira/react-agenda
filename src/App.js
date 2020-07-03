import React from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import DatePicker, { DateInput, TimeInput } from '@trendmicro/react-datepicker';
import '@trendmicro/react-datepicker/dist/react-datepicker.css';
import * as moment from 'moment';
import Modal from 'react-modal';
import './app.css';

Modal.setAppElement('#root');
export default class App extends React.Component {
  state = {
    title: '',
    date: moment().format('YYYY-MM-DD'),
    showDatePicker: false,
    description: '',
    events: [
      { id: '10', title: 'event 1', start: '2020-07-01', end: '2020-07-04' },
      { id: '12', title: 'event 2', start: '2020-07-06', end: '2020-07-10' }
    ],
    modalIsOpen: false,
    modalTitle: ''
  };
  

  openModal = () => {
    this.setState({modalIsOpen: true});
  }
 
  afterOpenModal = () => {

  }
 
  closeModal = () =>{
    console.log('click')
    this.setState({modalIsOpen: false});
    console.log(this.state.modalIsOpen);
  }

  handleDateClick = (arg) => { // bind with an arrow function
    this.setState({modalIsOpen: true, modalTitle: 'Novo Evento'});


    // const {events} = this.state;
    // const newEvent = {title: 'event 1', date: arg.dateStr};
    // this.setState({date: arg.dateStr, events: events.concat(newEvent)})
  }

  handleEventClick = (arg) => { // bind with an arrow function
    console.log(arg.event.title);
    this.setState({modalIsOpen: true, modalTitle: 'Editar Evento'});
  }


  render() {

    return (
      <>
      <button onClick={this.openModal}>Open Modal</button>
      <Modal
        setAppElement={'#yourAppElement'}
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}
        className="modal-agenda"
        overlayClassName="modal-overlay"
        style={{zIndex: 99999}}
        contentLabel="Example Modal"
        >
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

        <label>Data de início: </label>
        <input
            value={this.state.date}
            type="text"
            onFocus={() => {
              this.setState({ showDatePicker: true })
            }} />
          
          <label>Data de término: </label>
        <input
            value={this.state.date}
            type="text"
            onFocus={() => {
              this.setState({ showDatePicker: true })
            }} />

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
      </Modal>

<div className="date-picker-component">


        </div>

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