import axios from 'axios';

export const getReports = async () => {
    const response = await axios.get('/api/report/all');
    return response.data;
};

export const sendWarningEmail = async (reportId: number, adminMessage: string) => {
    await axios.post(`/api/report/send-warning/${reportId}`, { adminMessage });
};

export const suspendUser = async (reportId: number) => {
    await axios.post(`/api/report/suspend/${reportId}`);
};

export const banUser = async (reportId: number) => {
    await axios.post(`/api/report/ban/${reportId}`);
};

export const restoreUser = async (reportId: number) => {
    await axios.post(`/api/report/restore/${reportId}`);
};
