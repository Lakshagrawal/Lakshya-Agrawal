import React from 'react'

export default function Congratulation() {
  return (
    <div>
    <div className="congratulation-area text-center mt-5">
        <div className="container">
            <div className="congratulation-wrapper">
                <div className="congratulation-contents center-text">
                    <div className="congratulation-contents-icon">
                    <i className="fa-sharp fa-solid fa-circle-check"></i>
                    </div>
                    <h4 className="congratulation-contents-title"> Congratulations! </h4>
                    <p className="congratulation-contents-para"> Thanks for working hard have a good luck for future. </p>
                    <div className="btn-wrapper mt-4">
                      {/* <button type="button" className="btn btn-success"><Link to="/">Go to Home</Link></button> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Congratulations area end --> */}
    </div>
  )
}

