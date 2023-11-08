export enum ChatMessageActions {
  I_WANT_VEGAN,
  I_WANT_DESSERT,
  I_WANT_BEEF_BURGER,
  I_WANT_FAJITAS,
  I_DONT_WANT_FAJITAS,
  NO_SIDES_WITH_FAJITAS,
  SIDES_WITH_FAJITAS,
}

export enum ChatMessageTypes {
  INTRODUCTION,
}

export interface IChatMessageAction {
  label: string;
  value: ChatMessageActions;
}

export interface IChatMessage {
  id: string;
  isUser: boolean;
  message: React.ReactNode;
  type?: ChatMessageTypes;
  actions: IChatMessageAction[];
}
