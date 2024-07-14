// src/models/Report.ts

export interface Report {
    _id: number;
    senderMail: string;
    receiverMail: string;
    description: string;
    date: string;
    adminMessage?: string;
    isWarningSent: boolean;
    isSuspended: boolean;
    isBanned: boolean;
    warningDate?: string;
    suspensionDate?: string;
    banDate?: string;
    tutorId?: number;
    studentId?: number;
}
