# Chuck Norris Facts App

This is a test based on the [challenge](https://gitlab.com/nuuvem-public/tests/frontend-1/blob/master/README.md).
It's a universal app (Web|iOS|Android) using [Expo](https://docs.expo.io) with React Native.

## Description

Basically, the project contains a search form to search a joke with a term. The form has two `submit` buttons, one is to search
all possibilities accordingly to the query, and another to use the "I'm feeling lucky" feature.

This feature is something lik get the top (first position) on results, but I won't give more spoiler, let the codebase
speak with you :-}

If you are running this project in a iOS or an Android simulator, you will get the `Favorites feature`.

## How to run the project

`yarn [SCRIPT]`

**Scripts:**

```
    "start": "Start the project in Development mode",
    "android": "Start the project in Development mode and open the Android simulator with the mobile application",
    "ios": "Start the project in Development mode and open the iOS simulator with the mobile application",
    "web": "Start the project in Development mode and open another browser tab with the web application",
    "build": "Builds the web application",
    "debug-prod": "Builds the web application and serve it locally",
    "deploy": "You can deploy to Netlify"
```

> Pay attention to the scripts `android` & `ios`, because you neeed to have the specific simulator installed in your computer.

### Main technologies / tools

- React Native
- Expo SDK
- Typescript
- Styled Components
- React Hooks

---

## Important note

Try not to run the web in development environment inside the `Mozilla Firefox` Browser, becausee there is a know issue with
async load of fonts.
[I resolved it as you can see this PR](https://github.com/expo/expo/pull/7420), but it hadn't entered in the last release.
