import { CAvatar, CCard, CCardBody, CRow, CCol, CButton, CSpinner, CAlert } from "@coreui/react";
import React from "react";
import { useParams} from "react-router-dom";
import avatar from 'src/assets/images/avatars/10.png'
import UserService from "src/services/userService";

const UserDetails = () => {
    const { id } = useParams();

    const [user, setUser] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [visibility, setVisibility] = React.useState(false);

    const fetchUser = async () => {
        await UserService.getById(id).then(res => {
            setUser(res.data.user);
            console.log(user);
            setLoading(false);
        })
    }

    React.useEffect(() => {
        fetchUser();
    }, [])

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CSpinner />
            </div>
        );
    }

    const handleIDCard = () => {
        if (!user.idCard) {
            if (!user.passport) {
                setVisibility(true);
            } else {
                window.open(user.passport, '_blank');
            }
        } else {
            window.open(user.idCard, '_blank');
        }
    }

    const handleVerification = async () => {
        await UserService.update(id, { isVerified: true });
        console.log("Verified");
        window.location.href="/users";
    }

    return (
        <CCard className="text-center">
            <CAlert color="danger" dismissible visible={visibility} onClose={() => setVisibility(false)}>No ID Card / Passport Found</CAlert>
            <CCardBody>
                <CAvatar src={user.profilePicture ? user.profilePicture : avatar} size="xl"></CAvatar>
            </CCardBody>
            <CRow>
                <CCol>
                    <div style={{fontSize: 20, fontFamily: 'fantasy', padding: 20}}>Name: {user.name}</div>
                </CCol>
                <CCol>
                    <div style={{fontSize: 20, fontFamily: 'fantasy', padding: 20}}>Email: {user.email}</div>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <div style={{fontSize: 20, fontFamily: 'fantasy', padding: 20}}>Nationality: {user.nationality}</div>
                </CCol>
                <CCol>
                    <div style={{fontSize: 20, fontFamily: 'fantasy', padding: 20}}>Date of Birth: {user.dateOfBirth}</div>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <div style={{fontSize: 20, fontFamily: 'fantasy', padding: 20}}>Phone Number: {user.phoneNumber}</div>
                </CCol>
                <CCol>
                    <div style={{fontSize: 20, fontFamily: 'fantasy', padding: 20}}>Verified: {user.isVerified === true? 'Yes': 'No'}</div>
                </CCol>
            </CRow>
            <div style={{fontSize: 20, fontFamily: 'fantasy', padding: 20}}>
                <CButton color="primary" variant="ghost" style={{fontSize: 20, fontFamily: 'fantasy', padding: 10}} onClick={handleIDCard}>
                    Check ID Card / Passport
                </CButton>
            </div>
            <CRow>
                <CCol>
                    <CButton color="success" variant="outline" style={{fontSize: 20, fontFamily: 'fantasy', padding: 10}} onClick={handleVerification}>
                        Verify
                    </CButton>
                </CCol>
                <CCol>
                    <CButton color="danger" variant="outline" style={{fontSize: 20, fontFamily: 'fantasy', padding: 10}} href="/users">
                        Return
                    </CButton>
                </CCol>
            </CRow>
        </CCard>
        
    );
}

export default UserDetails;