export interface Application {
    id?: number;
    code: string;
    name: string;
    description: string;
    url: string;
    supportEmail: string;
    active?: boolean;
}