type method = 'readwrite' | 'readonly'

export default class wDataBase {
	constructor(private readonly db: IDBDatabase) {
	}

	public createObjectStore(name: string, property: {keyPath: string, autoIncrement: boolean}) {
		this.db.createObjectStore(name, property)
	}

	public getObjectStoreNames(): DOMStringList {
		return this.db.objectStoreNames
	}

	public close() {
		this.db.close();
	}

	public getAll<T>(table: string): Promise<T[]> {
		return new Promise((resolve, reject) => {
			let store = this.db.transaction(table, 'readonly').objectStore(table);

			let rq = store.openCursor();
			let data: T[] = [];

			rq.onerror = e => {
				reject(e);
			}
			rq.onsuccess = e => {
				if (rq.result) {
					data.push(rq.result.value);
					rq.result.continue();
				}
				else {
					resolve(data);
				}
			}
		})
	}

	public add(table: string, type: method, data: object) {
		return new Promise((resolve, reject) => {
			let tr = this.db.transaction(table, type)
			let store = tr.objectStore(table).add(data)

			tr.oncomplete = (e) => {
				resolve(e)
			}

			store.onerror = (e) => {
				reject(e)
			}

			tr.onabort = (e) => {
				reject(e);
			}
		})
	}
}