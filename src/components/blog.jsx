import React from 'react';
import Left from './Left.jsx';
import Center from './Center.jsx';
import Rigth from './Rigth.jsx';
import './blog.css'; // Archivo CSS para el estilo

const BlogLayout = () => {
    return (
        <div className="blog-layout">
            <div className="left">
                <Left />
            </div>
            <div className="center">
                <Center />
            </div>
            <div className="right">
                <Rigth />
            </div>
        </div>
    );
};

export default BlogLayout;