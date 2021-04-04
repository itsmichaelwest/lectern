import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Design from '../../../Design'

export default function Comment(props) {
    const [showButtons, setShowButtons] = useState(false)
    
    return (
        <div className="relative p-4 hover:bg-gray-50"
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}>
            {showButtons && (
            <div className="absolute right-0 mr-4">
                <button className={Design.Button}>
                    <svg className="h-5 w-4" viewBox="0 0 16 20">
                        <path d="M8 6C8.27614 6 8.5 6.22386 8.5 6.5V11.5C8.5 11.7761 8.27614 12 8 12C7.72386 12 7.5 11.7761 7.5 11.5V6.5C7.5 6.22386 7.72386 6 8 6ZM8 14.5C8.41421 14.5 8.75 14.1642 8.75 13.75C8.75 13.3358 8.41421 13 8 13C7.58579 13 7.25 13.3358 7.25 13.75C7.25 14.1642 7.58579 14.5 8 14.5ZM7.72265 2.08397C7.8906 1.97201 8.1094 1.97201 8.27735 2.08397C10.2155 3.3761 12.3117 4.1823 14.5707 4.50503C14.817 4.54021 15 4.75117 15 5V9.5C15 13.3913 12.693 16.2307 8.17949 17.9667C8.06396 18.0111 7.93604 18.0111 7.82051 17.9667C3.30699 16.2307 1 13.3913 1 9.5V5C1 4.75117 1.18297 4.54021 1.42929 4.50503C3.68833 4.1823 5.78446 3.3761 7.72265 2.08397ZM7.59914 3.34583C5.85275 4.39606 3.98541 5.09055 2 5.42787V9.5C2 12.892 3.96795 15.3634 8 16.9632C12.0321 15.3634 14 12.892 14 9.5V5.42787C12.0146 5.09055 10.1473 4.39606 8.40086 3.34583L8 3.09715L7.59914 3.34583Z" fill="#212121"/>
                    </svg>
                </button>
                {props.isUserAuthor && 
                    <button className={Design.ButtonDestructive + " ml-1"} onClick={() => props.onDelete(props.key)}>
                        <svg className="h-5 w-4" viewBox="0 0 16 20">
                            <path d="M9.5 4C9.5 3.17157 8.82843 2.5 8 2.5C7.17157 2.5 6.5 3.17157 6.5 4H5.5C5.5 2.61929 6.61929 1.5 8 1.5C9.38071 1.5 10.5 2.61929 10.5 4H15C15.2761 4 15.5 4.22386 15.5 4.5C15.5 4.77614 15.2761 5 15 5H14.446L13.1499 16.2292C13.0335 17.2384 12.179 18 11.1631 18H4.83688C3.821 18 2.9665 17.2384 2.85006 16.2292L1.553 5H1C0.75454 5 0.550392 4.82312 0.508056 4.58988L0.5 4.5C0.5 4.22386 0.723858 4 1 4H9.5ZM13.438 5H2.561L3.84347 16.1146C3.90169 16.6192 4.32894 17 4.83688 17H11.1631C11.6711 17 12.0983 16.6192 12.1565 16.1146L13.438 5ZM6.5 7.5C6.74546 7.5 6.94961 7.65477 6.99194 7.85886L7 7.9375V14.0625C7 14.3041 6.77614 14.5 6.5 14.5C6.25454 14.5 6.05039 14.3452 6.00806 14.1411L6 14.0625V7.9375C6 7.69588 6.22386 7.5 6.5 7.5ZM9.5 7.5C9.74546 7.5 9.94961 7.65477 9.99194 7.85886L10 7.9375V14.0625C10 14.3041 9.77614 14.5 9.5 14.5C9.25454 14.5 9.05039 14.3452 9.00806 14.1411L9 14.0625V7.9375C9 7.69588 9.22386 7.5 9.5 7.5Z" fill="#ffffff"/>
                        </svg>
                    </button>
                }
            </div>
            )}
            <div className="flex">
                <span className="flex-initial flex-shrink-0 w-16 font-semibold hover:text-gray-600 cursor-pointer">
                    {props.time}
                </span>
                <div>
                    <div className="flex align-middle">
                        <span className={Design.URL + " font-semibold"}>
                            <Link to={`/channel/${props.author}`}>
                                {props.name}
                            </Link>
                        </span>
                    </div>
                    <div>
                        <p style={{ overflowWrap: 'anywhere' }}>
                            {props.content}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}