export class Upload {

    $key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
   
    constructor(file: File, name: string) {
        this.name = name
        this.file = file;
    }
}