import React, {Component} from 'react';

class UserProfile extends Component{
    render() {
        return(
            <h1 className="text-danger">@{this.props.currentUser.username} Profile</h1>
        )
    }
}

export default UserProfile;