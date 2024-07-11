import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleSupplierClick = () => {
        navigate('/supplier-login');
    };

    const handleBuyerClick = () => {
        navigate('/buyer');
    };

    const handleEnterClick = () => {
        navigate('/enter');
    };

    return (
        <div className="home-page">
            {/* <video autoPlay loop muted className="video-background">
                <source src="/mock-industrial.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video> */}
            <div className="hero-section">
                <h1 className="company-name">RUSH B2B</h1>
                <h3 className="company-slogan">Скорость, надежность и масштаб <br />для вашего международного B2B успеха</h3>
            </div>
            <div className="company-description">
                <p>Мы предлагаем инновационную платформу для международной промышленной торговли,<br /> ускоряющую процесс B2B сделок и поддерживающую глобальные бизнес-связи.</p>
            </div>
            <div className="button-container">
                <button className="custom-button supplier-button" onClick={handleSupplierClick}>Я поставщик</button>
                <button className="custom-button buyer-button" onClick={handleBuyerClick}>Я скупщик</button>
                <button className="custom-button enter-button" onClick={handleEnterClick}>Войти в существующий аккаунт</button>

            </div>

        </div>
    );
};

export default HomePage;
