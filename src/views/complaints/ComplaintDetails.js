import {CCard, CRow, CCol, CButton, CSpinner} from "@coreui/react";
import React from "react";
import moment from 'moment'
import { useParams} from "react-router-dom";
import ComplaintService from "src/services/complaintService";

const ComplaintDetails = () => {
    const { id } = useParams();

    const [complaint, setComplaint] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    const fetchComplaint = async () => {
        await ComplaintService.getById(id).then(res => {
            setComplaint(res.data);
            console.log(complaint);
            setLoading(false);
        })
    }

    React.useEffect(() => {
        fetchComplaint();
    }, [])

    if (loading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CSpinner/>
            </div>
        );
    }

    const handleSolved = async () => {
        await ComplaintService.update(id, {status: "Solved"});
        console.log("Solved");
        window.location.href="/complaints";
    }

    return (
        <CCard className="text-center">
            <CRow>
                <div style={{fontSize: 20, fontFamily: 'fantasy', padding: 20}}>Complaint Subject: {complaint.subject}</div>
                <div style={{fontSize: 20, fontFamily: 'fantasy', padding: 20}}>Complaint Body: {complaint.body}</div>
            </CRow>
            <CRow>
                <div style={{fontSize: 20, fontFamily: 'fantasy', padding: 20}}>Complaint Issued At: {moment(complaint.createdAt).format('L').toString()}</div>
                <div style={{fontSize: 20, fontFamily: 'fantasy', padding: 20}}>Complaint Status: {complaint.status}</div>
            </CRow>
            <CRow>
                <CCol>
                    <CButton color="success" variant="outline" style={{fontSize: 20, fontFamily: 'fantasy', padding: 10}} onClick={handleSolved}>
                        Issue Resolved
                    </CButton>
                </CCol>
                <CCol>
                    <CButton color="danger" variant="outline" style={{fontSize: 20, fontFamily: 'fantasy', padding: 10}} href="/complaints">
                        Return
                    </CButton>
                </CCol>
            </CRow>
        </CCard>
    );
}

export default ComplaintDetails;