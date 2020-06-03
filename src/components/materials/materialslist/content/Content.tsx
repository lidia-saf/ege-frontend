import * as React from 'react';
import { Link } from 'react-router-dom';
import './content.css';

const contentList = [
    {
        id: 1,
        title: 'Present Simple Explained Simple',
        image: 'https://blog.strategiccoach.com/wp-content/uploads/2019/08/Entrepreneurial-Time-Roadblock_Multiplier-Mindset-Blog.png',
        body: '',
        videoLink: ''
    },
    {
        id: 2,
        title: 'Present Simple Explained Simple Present Simple Explained Simple',
        image: 'https://blog.strategiccoach.com/wp-content/uploads/2019/08/Entrepreneurial-Time-Roadblock_Multiplier-Mindset-Blog.png',
        body: '',
        videoLink: ''
    },
    {
        id: 3,
        title: 'Present Simple Explained Simple',
        image: 'https://blog.strategiccoach.com/wp-content/uploads/2019/08/Entrepreneurial-Time-Roadblock_Multiplier-Mindset-Blog.png',
        body: '',
        videoLink: ''
    },
    {
        id: 4,
        title: 'Present Simple Explained Simple Present Simple Explained Simple',
        image: 'https://blog.strategiccoach.com/wp-content/uploads/2019/08/Entrepreneurial-Time-Roadblock_Multiplier-Mindset-Blog.png',
        body: '',
        videoLink: ''
    },
    {
        id: 5,
        title: 'Present Simple Explained Simple',
        image: 'https://blog.strategiccoach.com/wp-content/uploads/2019/08/Entrepreneurial-Time-Roadblock_Multiplier-Mindset-Blog.png',
        body: '',
        videoLink: ''
    }
]

export const Content: React.FC<{}> = () => {
    return (
        <ul className='content-list'>
            {contentList.map((item, index) => {
                return (
                    <li key={index} className='content-list-item'>
                        <Link className='content-list-link' to={`/materials/${item.id}`}>
                            <img className='content-list-image' src={item.image} alt={item.title} />
                            <h4 className='content-list-heading'>{item.title}</h4>
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}