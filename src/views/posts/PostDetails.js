import {CCard, CCardBody, CRow, CCol, CButton, CSpinner, CAlert, CCardImage } from "@coreui/react";
import React from "react";
import { useParams} from "react-router-dom";
import PostService from "src/services/postService";

const PostDetails = () => {
    const { id } = useParams();

    const [post, setPost] = React.useState({});
    const [postLoading, setPostLoading] = React.useState(true);
    const [visibility, setVisibility] = React.useState(false);

    const fetchPost = async () => {
        await PostService.getById(id).then(res => {
            setPost(res.data);
            console.log(post);
            setPostLoading(false);
        })
    }

    React.useEffect(() => {
        fetchPost();
    }, [])

    if (postLoading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <CSpinner />
            </div>
        );
    }

    const handleCarDocuments = () => {
        if (!post.documents) {
            setVisibility(true);
        } else {
            window.open(post.documents, '_blank');
        }
    }

    const handleVerification = async () => {
        await PostService.update(id, { isPublic: true });
        console.log("Verified");
        window.location.href="/posts";
    }

    return (
        <CCard className="text-center">
            <CAlert color="danger" dismissible visible={visibility} onClose={() => setVisibility(false)}>No Card Documents Found</CAlert>
            <CCardBody>
                <CCardImage src={post.picture} style={{height: 200, width: 400}}></CCardImage>
            </CCardBody>
            <CRow>
                <CCol>
                    <div style={{fontSize: 20, fontFamily: 'fantasy', padding: 20}}>Name: {post.name}</div>
                </CCol>
                <CCol>
                    <div style={{fontSize: 20, fontFamily: 'fantasy', padding: 20}}>Model: {post.model}</div>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <div style={{fontSize: 20, fontFamily: 'fantasy', padding: 20}}>Model Year: {post.modelYear}</div>
                </CCol>
                <CCol>
                    <div style={{fontSize: 20, fontFamily: 'fantasy', padding: 20}}>Mileage: {post.mileage}</div>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <div style={{fontSize: 20, fontFamily: 'fantasy', padding: 20}}>Pickup City: {post.pickupCity}</div>
                </CCol>
                <CCol>
                    <div style={{fontSize: 20, fontFamily: 'fantasy', padding: 20}}>Owner: {post.ownerName}</div>
                </CCol>
            </CRow>
            <div style={{fontSize: 20, fontFamily: 'fantasy', padding: 20}}>
                <CButton color="primary" variant="ghost" style={{fontSize: 20, fontFamily: 'fantasy', padding: 10}} onClick={handleCarDocuments}>
                    Check Car Documents
                </CButton>
            </div>
            <CRow>
                <CCol>
                    <CButton color="success" variant="outline" style={{fontSize: 20, fontFamily: 'fantasy', padding: 10}} onClick={handleVerification}>
                        Verify
                    </CButton>
                </CCol>
                <CCol>
                    <CButton color="danger" variant="outline" style={{fontSize: 20, fontFamily: 'fantasy', padding: 10}} href="/posts">
                        Return
                    </CButton>
                </CCol>
            </CRow>
        </CCard>
        
    );
}

export default PostDetails;