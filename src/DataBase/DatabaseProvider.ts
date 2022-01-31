import DataBase from './DataBase'

export default class DatabaseProvider {
	constructor(private readonly dbName: string, private readonly version: number) {
	}

	public open(): Promise<DataBase> {
		return new Promise((resolve, reject) => {
			let DB = indexedDB.open(this.dbName, this.version)

			DB.onerror = () => {
				reject(DB.error)
			}

			DB.onsuccess = () => {
				resolve(new DataBase(DB.result))
			}

			DB.onupgradeneeded = () => {
				resolve(new DataBase(DB.result))
			}
		})
	}
}