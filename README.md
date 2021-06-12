# The Good Fork - Client App
School project for SUPINFO.

### Context
>**The Good Fork** is a famous restaurant located in the city of Tours. It wants to develop and retain its customers and for this purpose wants to propose a new mobile application.

>Your team is in competition with several other subcontractors to do the development, the best project will win the contract.

>Your application must have an IOS and an Android version.


**The Good Fork - Client App** is the mobile application for the restaurant customers.

**The Good Fork - Staff App** is available [here](https://github.com/Skkay/The-Good-Fork_Staff-App).

**The Good Fork - API** is available [here](https://github.com/Skkay/The-Good-Fork_API).

---

### Build the app
#### Requirements
- NodeJS, available [here](https://nodejs.org)
- Expo CLI `npm install -g expo-cli` or `yarn global add expo-cli`
    - Note: **Windows users** must have WSL enabled. Installation guide available [here](https://docs.microsoft.com/en-us/windows/wsl/install-win10).
- Configure `app.json` 

#### Build
1. `git clone https://github.com/Skkay/The-Good-Fork_Client-App`
2. `cd The-Good-Fork_Client-App`
3. Create `config.js` file at the root with:
```js
const API_URL = "http://192.168.1.18/The-Good-Fork_API/public/api";

export { API_URL };
```
Replace _APP\_URL_ with your own.

4.  - Android: `expo build:android -t apk` or `expo build:android -t app-bundle` and follow the steps.
    -  iOS: `expo build:ios -t archive` or `expo build:ios -t simulator` and follow the steps.

You can find more informations by following official Expo build guide: https://docs.expo.io/distribution/building-standalone-apps/
