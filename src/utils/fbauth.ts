import AWS from 'aws-sdk/global';

export const signUpFacebook = () => {
    window.FB.login(function (response: any) {
        console.log(response);
        // Check if the user logged in successfully.
        if (response.authResponse) {

          console.log('You are now logged in.');

          // Add the Facebook access token to the Cognito credentials login map.
          AWS.config.region = 'eu-central-1';
          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: 'eu-central-1:ad815f2d-f7cc-40fb-9bad-951fc4659032',
            Logins: {
              'graph.facebook.com': response.authResponse.accessToken
            }
          });

          // Obtain AWS credentials
          AWS.config.credentials.get(function(smth) {
              // Access AWS resources here.
              console.log(smth);
          });

        } else {
          console.log('There was a problem logging you in.');
        }

      }, {scope: 'public_profile,email'});
}