export class CustomEventEmitter {
  private mapFunctions: { [key: string]: Function[] } = {};

  on(name: string, func: Function, onlyOne?: boolean) {
    if (!name) {
      return;
    }
    this.mapFunctions[name] = this.mapFunctions[name] || [];
    if (!onlyOne || this.mapFunctions[name].length === 0) {
      this.mapFunctions[name].push(func);
    }
    if (!onlyOne) {
      return this.off.bind(this, name, func);
    }
  }

  emit<T extends any>(name: string, data: T) {
    if (!name) {
      return;
    }
    for (const func of this.mapFunctions[name] || []) {
      func(data);
    }
  }

  off(name: string, removedFunc?: Function) {
    if (!name) {
      return;
    }
    this.mapFunctions[name] = this.mapFunctions[name] || [];
    if (removedFunc) {
      for (let index = 0; index < this.mapFunctions[name].length; index++) {
        const func = this.mapFunctions[name][index];
        if (func === removedFunc) {
          this.mapFunctions[name].splice(index, 1);
          break;
        }
      }
    } else {
      this.mapFunctions[name] = [];
    }
  }
}
