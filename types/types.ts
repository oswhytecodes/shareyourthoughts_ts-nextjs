export interface MessageDataType {
  id: number;
  userId: string;
  userMessage: string;
  date: Date;
  favorite: number;
}

export type MessageProps = { messageData: MessageDataType[] };
export type MessageFunctions = { deleteMessage: (id: number) => Promise<unknown>,
updateMessage: (id: number, message: string) => Promise<unknown>
};

export interface CreateMessageProps {
  createMessage: (id?: string, message?: string) => void;
}

export type ProfileProps = {
  handleProfileToggle: () => void;
};

export type FavoriteType = {
  [index: string]: boolean;
};
export type FormType = {
  [index: string]: boolean;
};
export type ColorType = {
  [index: string] : string
}
export type FavoriteKey = keyof FavoriteType;
export type FormKey = keyof FormType;
export type ColorKey = keyof ColorType