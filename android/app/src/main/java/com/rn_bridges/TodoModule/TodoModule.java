package com.rn_bridges.TodoModule;

import android.os.Handler;
import android.os.Looper;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class TodoModule extends ReactContextBaseJavaModule {

    public TodoModule(ReactApplicationContext context) {
        super(context);
    }

    private int listenerCount = 0;

    private void sendEvent(ReactContext reactContext,
                            String eventName,
                            @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    @ReactMethod
    public void addListener(String eventName) {
        listenerCount += 1;
    }

    @ReactMethod
    public void removeListeners(int count) {
        listenerCount -= count;
    }

    @NonNull
    @Override
    public String getName() {
        return "TodoModule";
    }

    @ReactMethod
    public void fetch() {
        ExecutorService executorService = Executors.newSingleThreadExecutor();
        Handler handler = new Handler(Looper.getMainLooper());

        executorService.execute(() -> {
            try {
                String urlString = "https://jsonplaceholder.typicode.com/todos";
                URL url = new URL(urlString);

                HttpURLConnection connection = (HttpURLConnection) url.openConnection();
                connection.setRequestMethod("GET");
                connection.setDoInput(true);
                connection.connect();

                int responseCode = connection.getResponseCode();
                if (responseCode == HttpURLConnection.HTTP_OK) {
                    String inputLine;
                    BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                    StringBuilder content = new StringBuilder();

                    while ((inputLine = in.readLine()) != null) {
                        content.append(inputLine);
                    }
                    in.close();

                    final String result = content.toString();

                    handler.post(() -> {
                        ReactApplicationContext reactContext = getReactApplicationContext();

                        WritableMap params = Arguments.createMap();
                        params.putString("data", result);

                        sendEvent(reactContext, TodoEventEnum.OnFetchSuccess.toString(), params);
                    });
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }
}
