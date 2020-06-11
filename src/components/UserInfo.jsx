import React from 'react';
import firebase from 'firebase';

const UserInfo = ({logUserName}) => {
    return (
        <div>
            <div className="user-info">
                  <button className="signout-btn" onClick={() => firebase.auth().signOut()}>Logout</button>
                  <h5 className="user-name">User : {logUserName}</h5>
            </div>
        </div>
    );
}

export default UserInfo;