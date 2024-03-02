export interface Alert {
    id?: number;
    name: string;
    severety: number;
    stackTrace: string;
    status: number;
    creationDate: Date;
    applicationCode: string;
    active?: boolean;
}