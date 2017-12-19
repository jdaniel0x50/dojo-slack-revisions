export class User {
    constructor(
        public _id: String = "",
        public first_name: String = "",
        public last_name: String = "",
        public email: String = "",
        public password: String = "",
        public username: String = "",
        public status: String = "",
        public profile_picture: String = "",
        public teams: Array<String> = [],
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) { }
}

export class UserRegister extends User {
    constructor(
        public password_confirm: String = ""
    ) { super(); }
}

export class Team {
    constructor(
        public _id: String = "",
        public name: String = "",
        public _admin: String = "",
        public channels: Array<String> = [],
        public users: Array<String> = [],
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) { }
}

export class Channel {
    constructor(
        public _id: String = "",
        public name: String = "",
        public purpose: String = "",
        public _team: String = "",
        public _created_by: String = "",
        public messages: Array<String> = [],
        public highlights: Array<String> = [],
        public users: Array<String> = [],
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) { }
}

export class Message {
    constructor(
        public _id: String = "",
        public content: String = "",
        public content_type: String = "",
        public _author: String = "",
        public _channel: String = "",
        public comments: Array<String> = [],
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) { }
}

export class Comment {
    constructor(
        public _id: String = "",
        public content: String = "",
        public content_type: String = "",
        public _author: String = "",
        public _message: String = "",
        public createdAt: Date = new Date(),
        public updatedAt: Date = new Date()
    ) { }
}