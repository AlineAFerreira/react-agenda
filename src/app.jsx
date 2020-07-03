import React from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed for dayClick
import '@trendmicro/react-datepicker/dist/react-datepicker.css';
import * as moment from 'moment';
import { eventService } from "./core/services/event";
import AgendaModal from "./components/modal";
import './app.css';

export default class App extends React.Component {
  eventsInterval;
  state = {
    id: '',
    title: '',
    date: moment().format('YYYY-MM-DD'),
    start: moment().format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD'),
    startTime: '',
    endTime: '',
    description: '',
    events: [],
    modalIsOpen: false,
    modalTitle: ''
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    eventService.getEvents().then(res => {
      this.setState({ events: res.data }, ()=> {
        this.startEventsInterval();
      })
    })
  }

  handleDateClick = (arg) => {
    this.setState({ modalIsOpen: true, modalTitle: 'Novo Evento', date: arg.dateStr, start:  arg.dateStr, end: arg.dateStr});
  }

  handleEventClick = (arg) => { 
    const start = moment(arg.event.start).format('YYYY-MM-DD HH:mm').split(' ');
    const end = moment(arg.event.end).format('YYYY-MM-DD HH:mm').split(' ');

    this.setState({ 
      modalIsOpen: true, 
      modalTitle: 'Editar Evento',
      id: arg.event.id,
      title: arg.event.title,
      description: arg.event.extendedProps.description,
      startTime: start[1],
      endTime: end[1]
    });
  }

  handleDeleteClick = () => {
    eventService.deleteEvents(this.state.id)
    .then(()=> {
      this.closeModal();
      this.getData();
    })
  }
 
  handleSaveClick = () => {
    if(!this.state.title ||  !this.state.description || !this.state.startTime){
      alert('Preencha os campos obrigatórios.');
      return
    }
    const data = {
      id: this.state.id,
      title: this.state.title,
      start: this.state.date + ' ' + this.state.startTime,
      end: this.state.date + ' ' + this.state.endTime,
      description: this.state.description
    }

    if(this.state.id) {
      eventService.updateEvents(data)
        .then(()=> {
          this.closeModal();
          this.getData();
        })
    } else {
      eventService.saveEvents(data)
        .then(()=> {
          this.closeModal();
          this.getData();
        })
    }
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ 
      modalIsOpen: false,
      id: '',
      title: '',
      description: '',
      startTime: '',
      endTime: '' 
    });
  }

  startEventsInterval() {
    const { events } = this.state; // Pega todos os eventos do state
    if (events && events.length > 0) { //Verifico se tem pelo menos 1 evento no state
      const todayEvents = events.filter(this.isTodayEvent); // Verifico se tem algum evento no state com a data atual
      if (todayEvents && todayEvents.length > 0) {

        this.setState({todayEvents}, () => { // Guardo os eventos do dia no state
          this.eventsInterval = setInterval(() => {
            const {todayEvents} = this.state;
            const event = todayEvents.find(this.isEventFuture) // Verifico se tem evento com a hora e minuto atual
            if (event) {
              alert('Nome do Evento: ' + event.title);
            }
          }, 60000); // 1 em 1min
        });
      }
    }
  }

  isTodayEvent(e) {
    if (!e.start) {
      return false;
    }
    let today = moment();
    today = moment(today.format('YYYY-MM-DD'));
    let eventDate = moment(e.start).format('YYYY-MM-DD');
    eventDate = moment(eventDate);
    return eventDate.isSame(today);
  }

  isEventFuture(e) {
    if (!e.start) {
      return false;
    }
    const now = moment();
    const d = moment(e.start);
    return d.toDate().getHours() == now.toDate().getHours() && d.toDate().getMinutes() == now.toDate().getMinutes();
  }

  render() {
    
    return (
      <>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={this.handleDateClick}
          eventClick={this.handleEventClick}
          events={this.state.events}
          locale="pt-br"
        />

        <AgendaModal
          modalIsOpen={this.state.modalIsOpen}>
          <div className="modal-header">
            <h2>{this.state.modalTitle}</h2>
            <button onClick={this.closeModal}>X</button>
          </div>
          <div className="modal-body">
            <label>Título do evento *:</label>
            <input
              value={this.state.title}
              type="text"
              onChange={e => {
                this.setState({ title: e.target.value })
              }}
            />

            <label>Data do evento:</label>
            <input type="text" value={this.state.date} readOnly />

            <label>Hora do início *:</label>
            <input type="time" 
              value={this.state.startTime}
              onChange={e => this.setState({startTime: e.target.value})}/>

            <label>Hora do término:</label>
            <input type="time" 
              value={this.state.endTime}              
              onChange={e => this.setState({endTime: e.target.value})}/>

            <label>Descrição *:</label>
            <textarea
              value={this.state.description}
              rows="6"
              onChange={e =>this.setState({description: e.target.value})}
            ></textarea>
            <small>* Campos obrigatórios</small>
          </div>
          <div className="modal-footer">
            { this.state.id &&
              <button onClick={this.handleDeleteClick}>Excluir</button>
            }
            <button onClick={this.handleSaveClick}>Salvar</button>
            <button onClick={this.closeModal}>Fechar</button>
          </div>
        </AgendaModal>
      </>

    )
  }
}