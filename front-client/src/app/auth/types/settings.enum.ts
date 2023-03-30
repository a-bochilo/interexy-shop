
export enum SettingsEnum {
    account = "account",
    myOrders = "myOrders",
    logout = "logout",
    signIn = "signIn",
}

export interface ISettings {
    account: SettingsEnum.account,
    myOrders: SettingsEnum.myOrders,
    logout: SettingsEnum.logout,
    signIn: SettingsEnum.signIn,
  }