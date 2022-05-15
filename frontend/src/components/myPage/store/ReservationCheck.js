import React, { Component } from "react";
import QrReader from 'modern-react-qr-reader'


// qr로 예약 정보를 확인할 수 있게 해주는 사이트
// const ReservationCheck = () => {

//     return (
//         <div>
//             <div>
//                 <h1 style={{
//                     paddingTop: "15px"
//                 }}>예약 확인 </h1>
//             </div>
//             <QrReader style={{
//                 width: "30%",
//                 height: "30%"
//             }}></QrReader>
//         </div>
//     )
// }




class ReservationCheck extends Component {
  constructor(props) {
        super(props);

        this.state = {
            result: 'No result'
        }

        this.handleError = this.handleError.bind(this);
        this.handleScan = this.handleScan.bind(this);
    }

  handleScan = data => {
    if (data) {
      this.state.result = data;
        console.log(this.state.result);
        this.setState({result: data});
    }
  }
  
  handleError = err => {
    console.error(err)
  }
  
  render() {
    return (
      <div>
        <QrReader
          delay={300}
          facingMode={"environment"}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%' }}
        />
        <p>{this.state.result}</p>
      </div>
    )
  }
}
export default ReservationCheck;
