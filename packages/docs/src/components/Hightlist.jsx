import React from 'react';

export default function Highlight({ children, color }) {
    return (
        <span
            style={{
                borderRadius: '4px',
                paddingRight: '0.2rem',
                paddingLeft: '0.2rem',
                paddingBottom: '0.15rem',
                wordBreak: 'keep-all',
                textWrap: 'nowrap'
            }} className='bg-[var(--myHightFont)] border-[#dddedf] border border-solid cursor-pointer' onClick={() => typeof children === 'string' && navigator.clipboard.writeText(children)}>
            {children}
        </span>
    );
}