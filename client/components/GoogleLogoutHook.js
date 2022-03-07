import React from 'react';
import {useGoogleLogout} from 'react-google-login';

const {CLIENT_ID} = process.env;
const clientId = CLIENT_ID;

function GoogleLogoutHook() {
    const onLogoutSuccess = (res) => {
        console.log('Logout successful: res: ', res);
        
        alert(`Peace,  ${res.profileObj.name}`);
    };

    const onFailure = (res) => {
        alert('Error: ', res);
    };

    const {signOut} = useGoogleLogout({
        clientId,
        onLogoutSuccess,
        onFailure,
    });

    return (
        <button onClick={signOut} className="button">
            <span className="buttonText">Logout</span>
        </button>
    );
}


export default GoogleLogoutHook;