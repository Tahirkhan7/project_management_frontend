import React from "react";

export default function SingleTask() {
  return (
    <>
      <>
        {/* <!-- ====== Calendar Section Start ====== --> */}
        <div className="heroSecBlock">
          <div className="prioritySec">
            <span>HIGH PRIORITY</span>
            <img src="./images/main/dots.png" />
          </div>
          <h5>Hero section</h5>
          <div className="checklistSec">
            <div className="checkHeading">
              <span>Checklist</span> <span>(0/3)</span>
            </div>
            <img src="./images/main/up.png" />
          </div>
          <div className="checklistFooter">
            <div className="check-date">
              <button>Feb 10th</button>
            </div>
            <div className="checkProgress">
              <button>PsROGRESS</button>
              <button>TO-DO</button>
              <button>DONE</button>
            </div>
          </div>
        </div>
        {/* <!-- ====== Calendar Section End ====== --> */}
      </>
    </>
  );
}
