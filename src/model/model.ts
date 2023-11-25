// On websocket open, just join group

export interface Group {
    name: string,
    members: string[],
    preferences: Preferences;
    id: string,
    state: GroupState
}

export interface Preferences {
    budget: string,
    categories: string[],
    time: string,
    transport: string,
}

export enum GroupState {
    Ready = "ready",
    Available = "available",
}

export enum MessageType {
    CreateGroup = "create-group",
    JoinGroup = "join-group",
    ChangeState = "change-state"
}

export interface Message {
    type: MessageType,
    payload: Group[],  
    id: string;
}