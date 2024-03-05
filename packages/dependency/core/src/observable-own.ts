export class Observable<T> {
  private observers: ((value: T) => void)[] = [];

  subscribe(callback: (value: T) => void) {
    this.observers = this.observers.concat([callback]);

    return {
      unsubscribe: () =>
      (this.observers = this.observers.filter(
        observer => observer !== callback,
      )),
    };
  }

  count() {
    return this.observers.length
  }

  next(value: T) {
    this.observers.forEach(callback => callback(value));
  }

  private constructor(observers: ((value: T) => void)[]) {
    this.observers = observers;
  }

  static create<T>(): Observable<T> {
    return new Observable<T>([]);
  }
}