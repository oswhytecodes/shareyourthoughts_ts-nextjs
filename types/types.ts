
export interface MessageDataType {
  id: number;
  userId: string;
  userMessage: string;
  date: Date;
  favorite: number;
}

export type MessageProps = {
  messageData: MessageDataType[];
};

export interface CreateMessageProps {
  createMessage: (id?: string, message?: string) => void;
}

export type ProfileProps = {
  handleProfileToggle: () => void;
};
