import React, { useRef, useEffect, useState } from 'react';
import { useGoogleLogin } from 'react-google-login';
import GoogleLogin from 'react-google-login';
import refreshTokenSetup from '../../auth_tok/refreshTokenSetup';
import Login from './Login';

const { CLIENT_ID } = process.env;
const clientId = CLIENT_ID;

// function GoogleLoginHook() {
//   const onSuccess = (res) => {
//     console.log('Login successful: currentuser: ', res.profileObj);
//     refreshTokenSetup(res);
//   };

//   const onFailure = (res) => {
//     console.log('Login failed: res: ', res);
//   };

//   const { signIn } = useGoogleLogin({
//     onSuccess,
//     onFailure,
//     clientId,
//     isSignedIn: true,
//     accessType: 'offline',
//   });

//     const divRef = useRef(null);

// useEffect(() => {
//   if (divRef.current) {
//     window.google.accounts.id.initialize({
//       client_id: CLIENT_ID,
//     //   callback: (res, error) => {
//     //     // This is the function that will be executed once the authentication with google is finished
//     //       onSuccess(res);
//       callback: signIn,
//     });
//     window.google.accounts.id.renderButton(divRef.current, {
//         theme: 'filled_blue',
//         class: 'g_id_signin',
//       size: 'medium',
//       type: 'standard',
//         text: 'continue_with',
//       shape: 'rectangular',
//     });
//   }
// }, [divRef.current]);

//   return (
//     <button onClick={signIn} className="button">
//       <span className="buttonText">Give me the last four of your social</span>
//       {/* <div ref={divRef} /> */}
//     </button>
//   );
// }

const GoogleLoginHook = () => {
  const [user, setUser] = useState(null);
  const onSuccess = async (res) => {
    try {
      const { profileObj } = res;
      console.log('Login successful: currentuser: ', profileObj);
      const { email, name, imageUrl } = profileObj;
      const user = { email, name, imageUrl };
      setUser(user);
      document.cookie = 'email=' + email.split('@')[0];
      await refreshTokenSetup(res);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  //         const res = await fetch('/', {
  //             method: 'POST',
  //             body: JSON.stringify({
  //                 token: res.tokenId,
  //             }),
  //             headers: {
  //                 'Content-Type': 'application/json',
  //             },
  //         });
  //         const {user, token} = await res.json();
  //         console.log('Login successful: currentuser: ', user);
  //         localStorage.setItem('token', token);
  //         setUser(user);
  //         refreshTokenSetup(res);
  //     } catch(err) {
  //         console.log('Error: ->:::::', err);
  //     }
  // };

  const onFailure = (res) => {
    console.log('Login failed: res: ', res);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
  });

  //         const divRef = useRef(null);

  // useEffect(() => {
  //   if (divRef.current) {
  //     window.google.accounts.id.initialize({
  //       client_id: CLIENT_ID,
  //     //   callback: (res, error) => {
  //     //     // This is the function that will be executed once the authentication with google is finished
  //     //       onSuccess(res);
  //       callback: signIn,
  //     });
  //     window.google.accounts.id.renderButton(divRef.current, {
  //         theme: 'filled_blue',
  //         class: 'g_id_signin',
  //       size: 'medium',
  //       type: 'standard',
  //         text: 'continue_with',
  //       shape: 'rectangular',
  //     });
  //   }
  // }, [divRef.current]);

  return (
    <div id="sign-in">
      {/* <Login /> */}
      {!user && <GoogleLogin clientId={clientId} onSuccess={onSuccess} />}
      {user && (
        <>
          <p>Welcome to NBA-List, {user.name}</p>
          <img src={user.imageUrl} alt="user-pfp" />
          {/* <button onClick={signIn} className="button">
                        <span className="buttonText"></span>
                    </button> */}
        </>
      )}
    </div>
  );
};

export default GoogleLoginHook;
