import React from "react";
import DatePicker, { DateInput, TimeInput } from '@trendmicro/react-datepicker';
import '@trendmicro/react-datepicker/dist/react-datepicker.css';
import './index.css';

export default class DatePickerInput extends React.PureComponent {
    render() {
        return (
            <div className="date-picker-input-container">
                <div>
                    <label>{this.props.label} </label>
                    <input
                        value={this.props.date}
                        type="text"
                        onFocus={() => {
                            if (this.props.onFocus) {
                                this.props.onFocus();
                            }
                        }} />
                </div>
                
                {this.props.showDatePicker && <div className="datpicker-input-calendar">
                    <DatePicker
                        date={this.props.date}
                        onSelect={date => {
                            if (this.props.onSelect) {
                                this.props.onSelect(date);
                            }
                        }}
                    />
                </div>}
            </div>
        )
    }
}