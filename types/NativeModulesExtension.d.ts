import 'react-native';

interface IEventListener {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
}

interface ITodoModule extends IEventListener {
  fetch(): Promise<void>;
}

interface IUserModule {
  getUser(id: number): Promise<string>;
}

declare module 'react-native' {
  interface NativeModulesStatic {
    TodoModule: ITodoModule;
    UserModule: IUserModule;
  }
}
