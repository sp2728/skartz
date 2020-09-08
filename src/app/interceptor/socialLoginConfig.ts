import { AuthServiceConfig, FacebookLoginProvider } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
 
let config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider("420976587526-ta4tag806bl8ten0hcc7a0vo6ntg2a1v.apps.googleusercontent.com")
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider("2585507584886091")
      }
  ]);
   
  export function provideConfig() {
    return config;
  }