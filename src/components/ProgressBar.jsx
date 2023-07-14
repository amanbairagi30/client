import React from 'react'

const Progress_bar = ({ bgcolor, progress, height }) => {

    const Parentdiv = {
        height: height,
        width: '60%',
        backgroundColor: '#3e3e3e',
        borderRadius: 40,
        margin: 50
    }

    const Childdiv = {
        height: '100%',
        width: `${progress}%`,
        // backgroundColor: bgcolor,
        borderRadius: 40,
        textAlign: 'right'
    }

    const progresstext = {
        padding: 10,
        color: 'white',
        fontWeight: 900
    }

    return (
        <div style={Parentdiv} className='m-0'>
            <div style={Childdiv} className={`flex items-center justify-end ${bgcolor}`}>
                <span style={progresstext}>{`${progress}%`}</span>
            </div>
        </div>
    )
}

export default Progress_bar;
