import { nanoid } from "nanoid";
export type MapType = Map<string, Map<string, Function>>;
class Bridge {
  map = new Map<string, Map<string, Function>>();

  subscribe(event: string, callback: Function) {
    const id = nanoid();
    if (this.map.has(event)) {
      this.map.get(event)?.set(id, callback);
    } else {
      this.map.set(event, new Map([[id, callback]]));
    }
    return () => {
      this.map.get(event)?.delete(id);
      if (!this.map.get(event)?.size) {
        this.map.delete(event);
      }
    };
  }
  emit(event: string, data: any) {
    if (this.map.has(event)) {
      this.map.get(event)?.forEach((value, key) => {
        value(data);
      });
    }
  }
}
export const bridge = new Bridge();
