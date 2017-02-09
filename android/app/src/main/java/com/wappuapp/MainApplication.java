package com.wappuapp;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.audioStreaming.ReactNativeAudioStreamingPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import com.reactnative.photoview.PhotoViewPackage;
import com.image.zoom.ReactImageZoom;
import cl.json.RNSharePackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.oblador.vectoricons.VectorIconsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.cmcewen.blurview.BlurViewPackage;
import com.imagepicker.ImagePickerPackage;
import com.airbnb.android.react.maps.MapsPackage;
//import com.microsoft.codepush.react.CodePush;
import com.slowpath.hockeyapp.RNHockeyAppModule;
import com.slowpath.hockeyapp.RNHockeyAppPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    // @Override
    // protected String getJSBundleFile() {
    //   return CodePush.getJSBundleFile();
    // }

    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new ReactNativeAudioStreamingPackage(),
          new PhotoViewPackage(),
          new RNDeviceInfo(),
          new VectorIconsPackage(),
          new LinearGradientPackage(),
          new BlurViewPackage(),
          new ImagePickerPackage(),
          new ReactImageZoom(),
          new RNSharePackage(),
          new MapsPackage(),
          new RNHockeyAppPackage(MainApplication.this),
          // new CodePush("deployment-key-here", MainApplication.this, BuildConfig.DEBUG),
          new MainReactPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
