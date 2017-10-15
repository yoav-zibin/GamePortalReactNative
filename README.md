# Game Portal

## Introduction

This is an implementation of the Social Multiplayer Games NYU course's Game Portal project, it is implemented using React Native and Redux.

Implementation by Samuel Smith and Haoran (Andy) Ma.

## Setup Guide

### Prequisites

- git
- node.js 8.6.0 (react native does not work with newer versions, you can use nvm to easily downgrade if you have a later version)
- npm 4.6.1
- (for Android) an up-to-date Android Studio
- (for Android) an Android device running Android 7.1, or a running Android emulator (tested using the Pixel emulator in Android Studio)
- (for iOS) an up-to-date copy of Xcode
- (for iOS) an iOS device, or an iOS simulator (Mac only)

### Initial Installation

- clone this repo `git clone git@github.com:yoav-zibin/GamePortalReactNative.git`
- cd into `<repo-root>/GamePortal/`
- install the required node modules `npm install`
- tell react-native to generate the ios and android projects `react-native eject`

### iOS Steps (These WILL be reduced as time goes on)

- Open up the `ios` folder as a project for Xcode
- (Note: if you initiate a new react-native project using `create-react-native-app` or `react-native eject` from a existing project, Xcode will create a objective-c version Xcode project under your `ios` folder.)
- Third party usage:
    1. Facebook
        - Follow exactly every step from this link: [Getting started for iOS SDK](https://developers.facebook.com/docs/ios/getting-started)
        - Use `"react-native-fbsdk": "^0.6.0"` dependency. This will avoid a link error when you link react-native-fbsdk.
        - Make sure all frameworks are in the `Framework Search Path` of your Xcode project.
        - In Xcode's menu, click `Product`, and choose `Scheme`, `Manage Schemes`. Add `React` as an autocreate scheme.
        - Trouble shooting. See trouble shooting part of this link: [React Native FBSDK](https://github.com/facebook/react-native-fbsdk). It also contains Andriod's trouble shooting.

### Android-Specific Steps (These WILL be reduced as time goes on)

- Open up the `android` folder as a project in Android Studio
- During the initial load, you may get prompted to upgrade the gradle version and the build tools, agree to both of these
- Completing the above two steps will allow the Android project to actually build successfully (it will not build unless you first open in Android Studio), but at this point, you will still hit some runtime errors.

In settings.gradle, add these lines:

    include ':react-native-google-signin'
    project(':react-native-google-signin').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-google-signin/android')
    include ':react-native-fbsdk'
    project(':react-native-fbsdk').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-fbsdk/android')

In the project-level build.gradle, add the following dependency: `classpath 'com.google.gms:google-services:3.0.0'`

In the app-level build.gradle, make the following changes:
- set compileSdkVersion to 25
- comment out / remove `ndk { abiFilters... }`
- replace dependencies with the following:

    compile 'com.google.android.gms:play-services-auth:9.2.1'
    compile(project(":react-native-google-signin")){
        exclude group: "com.google.android.gms"
    }
    compile project(':react-native-google-signin')
    compile project(':react-native-fbsdk')
    compile fileTree(dir: "libs", include: ["*.jar"])
    compile "com.android.support:appcompat-v7:25.0.0"
    compile "com.facebook.react:react-native:+"  // From node_modules
    compile 'com.facebook.android:facebook-android-sdk:[4,5)'

- add this line to the bottom of the file: `apply plugin: 'com.google.gms.google-services'`

At this point, you should run a gradle resync (you will be prompted to if you are editing the files inside Android Studio). During the sync, build.gradles for the Facebook and Google SDKs will be generated, but they will need to be modified, as they require updating the Build Tools to 25, as by default the build tools does not match the target SDK. Using the automatic wizard provided by Android Studio will do the trick.

- You will now be prompted for a missing google-services.json file. You may obtain this file from either Sam or Andy. Alternatively, if you have access to the Firebase console, you can generate the file following this guide: https://support.google.com/firebase/answer/7015592?hl=en

 - Once you have the google-services.json file, you can place it in android/app (make sure that the package name matches the package name in Android Manifest)
 
 - You will also need a similar file for the Facebook SDK. As this file is tied to our Facebook Developer accounts, you will either need to ask Sam or Haoran to be added to the Facebook Developer project, or ask for the file from us. Once you get the file, it will live in the same place as the google-services.json file.
 
 Do the next modifications inside Android Studio, and let it resolve the imports
 
 - In MainApplication.java, add the following lines:
 
     `private static CallbackManager mCallbackManager = CallbackManager.Factory.create();
      protected static CallbackManager getCallbackManager() { return mCallbackManager; }`

 
 - Inside getPackages(), add the following lines to the returned list:

    `new RNGoogleSigninPackage(),
    new FBSDKPackage(mCallbackManager)`
    
- Inside onCreate(), add this line: `FacebookSdk.sdkInitialize(getApplicationContext());`

- Now, change to MainActivity, and add this new method:

    ` @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }`

- Finally, in Android-Manifest add this line to the bottom of the `</application>` body: `<meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>`
- And add `<string name="facebook_app_id">108663313217881</string>` to `app/res/values/strings.xml`
