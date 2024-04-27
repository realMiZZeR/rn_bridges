package com.rn_bridges.UserModule;

import android.os.Handler;
import android.os.Looper;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.rn_bridges.TodoModule.TodoEventEnum;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class UserModule extends ReactContextBaseJavaModule {
    public UserModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public java.lang.String getName() {
        return "UserModule";
    }

    @ReactMethod
    public void getUser(Integer id, Promise promise) {
        try {
            String urlString = "https://jsonplaceholder.typicode.com/users/" + id;
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
                promise.resolve(result);
            }
        } catch (Exception e) {
            promise.resolve(e);
        }
    }
}
