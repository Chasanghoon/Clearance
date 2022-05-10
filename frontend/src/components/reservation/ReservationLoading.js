import React from 'react';

function ReservationLoading(props) {
    return (
        <div style={{touchAction: 'none'}}>
            <div style={{ width: "100%", height: "100%", position: 'absolute', zIndex: "10", backgroundColor: 'white', pointerEvents: 'none'}}>
                <h1 style={{ textAlign: 'center', position: 'fixed', top: '50%', left:'50%', transform:'translate(-50%,-50%)'}}>예약 진행 중....</h1>
            </div>
        </div>
    );
}

export default ReservationLoading;