import 'react-native';

interface IEventListener {
  addListener(eventName: string): void;
  removeListeners(count: number): void;
}

interface ITodoModule extends IEventListener {
  fetchTodos(): Promise<void>;
}

declare module 'react-native' {
  interface NativeModulesStatic {
    TodoModule: ITodoModule;
  }
}
