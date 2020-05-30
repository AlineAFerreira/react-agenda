import React from 'react'
import { connect } from 'react-redux'
import { addUser } from '../../core/redux/actions/user';

class Home extends React.Component {
    render() {
        return (
            <div>
                Home <br />
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

const HomeConnected = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeConnected