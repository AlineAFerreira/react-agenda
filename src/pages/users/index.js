import React from 'react'
import { connect } from 'react-redux'
import { addUser } from '../../core/redux/actions/user';

class Users extends React.Component {
    render() {
        return (
            <div>
                Users <br />
                <button onClick={() => this.props.onAddUserClicked()}>Add User</button>
                <br />
                {JSON.stringify(this.props.users)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddUserClicked: user => {
            dispatch(addUser(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)