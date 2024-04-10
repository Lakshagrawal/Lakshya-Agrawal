import React from "react";
import { Link } from "react-router-dom";

export default function First() {
    return (
      <div className="container text-center">
        <div className="row">
          <div className="container">
            <div className="col mt-4 con">
              <h1>Select Difficulty</h1>
              <div className="col container">
                <div className="row mt-4">
                  <Link className="btn btn-success btn-lg" to="/word/easy" role="button">Easy Level</Link>
                </div>
                <div className="row mt-2">
                  <Link className="btn btn-success btn-lg" to="/word/medium" role="button">Medium Level</Link>
                </div>
                <div className="row mt-2">
                  <Link className="btn btn-success btn-lg" to="/word/hard" role="button">Hard Level</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
