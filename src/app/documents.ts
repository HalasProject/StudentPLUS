import * as firebase from 'firebase'

export class Documents {

    constructor(
        public id:string,
        public Titre:string,
        public CreatorName:string,
        public Module:string,
        public Year:string,
        public Semestre:string,
        public Groupe:string,
        public Image:string,
        public Section:string,
        public UserID:string,
        public Date?:firebase.firestore.Timestamp,
        public Remarque?:string,
        public Type?:string,
    ){}
}
