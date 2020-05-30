import React from 'react'
import { connect } from 'react-redux'
import { addUser, getUsers } from '../../core/redux/actions/user';

class Users extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }
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

const mapStateToProps = ({users}) => {
    return {
        users: users.users
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddUserClicked: user => {
            dispatch(addUser(user))
        },
        getUsers: () => {
            dispatch(getUsers())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)