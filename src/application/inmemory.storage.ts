/**
 * ローカルストレージ
 */
export interface ServerLocalStorage<T> {
  /**
   * すでに内容を持っていればtrueを返す
   */
  hasItems(): boolean;

  /**
   * 一つのオブジェクトを追加する
   * @param item
   */
  setItem(item: T): void;

  /**
   * 引数のすべてのオブジェクトを追加する
   * @param item
   */
  setItems(item: T[]): void;

  /**
   * オブジェクトを返す
   */
  getItem(): T[];
}

export class InMemoryStorage<FindAllTasksElement>
  implements ServerLocalStorage<FindAllTasksElement>
{
  private readonly items: FindAllTasksElement[] = [];

  hasItems(): boolean {
    return this.items.length > 0;
  }

  setItems(item: FindAllTasksElement[]): void {
    item.forEach((it) => this.items.push(it));
  }

  setItem(item: FindAllTasksElement): void {
    this.items.push(item);
  }

  getItem(key?: string): FindAllTasksElement[] {
    if (!key) {
      return this.items;
    }
    return this.items.filter((item) => item);
  }
}
