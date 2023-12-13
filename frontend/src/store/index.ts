interface StoreInfo {
  username: string;
  email: string;
  id: string;
  // Outras informações do usuário, se necessário
}

class Store {
  private static USER_KEY = 'user';

  static saveUser(userInfo: StoreInfo): void {
    const userString = JSON.stringify(userInfo);
    localStorage.setItem(Store.USER_KEY, userString);
  }

  static getUser(): StoreInfo | null {
    const userString = localStorage.getItem(Store.USER_KEY);
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  }

  static logout(): void {
    localStorage.removeItem(Store.USER_KEY);
  }
}

export default Store;
