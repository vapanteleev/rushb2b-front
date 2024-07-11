// src/components/SupplierProfile/SupplierProfile.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SupplierProfile.css';

const SupplierProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/supplier/${id}`);
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };
        fetchProfile();
    }, [id]);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="supplier-profile">
            <h1>Профиль поставщика</h1>
            <div className="profile-section">
                <h2>Информация о поставщике</h2>
                <div className="profile-info">
                    <div><strong>Имя пользователя:</strong> {profile.username}</div>
                    <div><strong>Email:</strong> {profile.email}</div>
                    <div><strong>Номер телефона:</strong> {profile.phoneNumber}</div>
                    <div><strong>Страна:</strong> {profile.country}</div>
                    <div><strong>Виды товаров:</strong> {profile.productTypes.join(', ')}</div>
                </div>
            </div>
            <button className="button" onClick={() => window.location.href = '/'}>На главную</button>
        </div>
    );
};

export default SupplierProfile;
