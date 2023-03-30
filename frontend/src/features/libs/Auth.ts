enum Storage {
    localStorage,
    sessionStorage
}

export default class Auth {

    private static instance: Auth;
    private static _storage: any;
    private static keyName = 'user';

    public static getInstance(): Auth {
        if (!Auth.instance) 
            Auth.instance = new Auth();
        return Auth.instance;
    }

    private constructor(storageType: Storage = Storage.sessionStorage) { 
        Auth._storage = window[Storage[storageType] as any]
    }

    public get storage() {
        return Auth._storage.getItem(Auth.keyName)?JSON.parse(Auth._storage.getItem(Auth.keyName)):null;
    }

    public set storage(value: Object) {
        Auth._storage.setItem(Auth.keyName, JSON.stringify(value))
    }

    public remove() {
        Auth._storage.removeItem(Auth.keyName)
    }

}
