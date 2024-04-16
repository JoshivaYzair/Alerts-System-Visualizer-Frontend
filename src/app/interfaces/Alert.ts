export interface Alert {
    id?: number;
    name: string;
    severety: number;
    description: string;
    source: string;
    stackTrace: string;
    status: number;
    creationDate: Date;
    applicationCode: string;
    active?: boolean;
}