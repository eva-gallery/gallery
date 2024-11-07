export type AdminType = {
    modul: string;
    action?: string;
    unique?: string;
    mode?: string;
};

export type ModuleFormular = {
    data: { [key: string]: any };
    option?: {
        [key: string]: Array<{ id: string, name: any }>;
    };
};

export type ModuleTable = {
    admin: AdminType;
    data: any;
};