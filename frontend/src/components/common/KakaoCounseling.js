/*global kakao*/
import { Link } from '@mui/material';
import React from 'react';

function KakaoCounseling(props) {
    
    // window.kakaoAsyncInit = function () {
    //     Kakao.Channel.createChatButton({
    //         container: '#kakao-talk-channel-chat-button',
    //     });
    // };

    // (function (d, s, id) {
    //     var js, fjs = d.getElementsByTagName(s)[0];
    //     if (d.getElementById(id)) return;
    //     js = d.createElement(s); js.id = id;
    //     js.src = 'https://developers.kakao.com/sdk/js/kakao.channel.min.js';
    //     fjs.parentNode.insertBefore(js, fjs);
    // })(document, 'script', 'kakao-js-sdk');
    
    return (
        <div>
            <a href='http://pf.kakao.com/_UYstb/chat' target="_blank"><img className='kakaoImg' src='img/kakaoCounseling.png' alt=''/></a>
        </div>
        
    );
}

export default KakaoCounseling;