import React, { useEffect, useState } from 'react';
import { getReports, sendWarningEmail, suspendUser, banUser, restoreUser } from '../Report/Service';
import { Report } from '../Report/Models';

const ReportPage: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [adminMessage, setAdminMessage] = useState<string>('');

    useEffect(() => {
        const fetchReports = async () => {
            const data = await getReports();
            setReports(data);
        };
        fetchReports();
    }, []);

    const handleSendWarning = async () => {
        if (selectedReport) {
            await sendWarningEmail(selectedReport._id, adminMessage);
            alert('Warning email sent successfully.');
        }
    };

    const handleSuspendUser = async () => {
        if (selectedReport) {
            if (window.confirm('Do you want to suspend this account?')) {
                await suspendUser(selectedReport._id);
                alert('User suspended successfully.');
            }
        }
    };

    const handleBanUser = async () => {
        if (selectedReport) {
            if (window.confirm('Do you want to ban this account?')) {
                await banUser(selectedReport._id);
                alert('User banned successfully.');
            }
        }
    };

    const handleRestoreUser = async () => {
        if (selectedReport) {
            await restoreUser(selectedReport._id);
            alert('User restored successfully.');
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <ul>
                {reports.map((report) => (
                    <li key={report._id} onClick={() => setSelectedReport(report)}>
                        Report by {report.senderMail} against {report.receiverMail}
                    </li>
                ))}
            </ul>
            {selectedReport && (
                <div>
                    <h2>Selected Report</h2>
                    <p>{selectedReport.description}</p>
                    <textarea
                        value={adminMessage}
                        onChange={(e) => setAdminMessage(e.target.value)}
                        placeholder="Enter admin message"
                    />
                    <button onClick={handleSendWarning}>Send Warning</button>
                    <button onClick={handleSuspendUser}>Suspend User</button>
                    <button onClick={handleBanUser}>Ban User</button>
                    <button onClick={handleRestoreUser}>Restore User</button>
                </div>
            )}
        </div>
    );
};

export default ReportPage;
