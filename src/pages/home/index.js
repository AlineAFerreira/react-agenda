import React from 'react'
import { connect } from 'react-redux'
import { addUser } from '../../core/redux/actions/user';

class Home extends React.Component {
    render() {
        return (
            <>
                Home <br />
                <button onClick={() => this.props.onAddUserClicked()}>Add User</button>
                <br />
                {JSON.stringify(this.props.users)}
            </>
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