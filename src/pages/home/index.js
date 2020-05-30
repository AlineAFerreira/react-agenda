import React from 'react'
import { connect } from 'react-redux'
import { addUser } from '../../core/redux/actions/user';

class Home extends React.Component {
    render() {
        console.log(process.env.REACT_APP_DOMAIN); 
        return (
            <>
                Home {process.env.DOMAIN}<br />
                <button onClick={() => this.props.onAddUserClicked()}>Add User</button>
                <br />
                {JSON.stringify(this.props.users)}
            </>
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
        }
    }
}

const HomeConnected = connect(mapStateToProps, mapDispatchToProps)(Home)

export default HomeConnected