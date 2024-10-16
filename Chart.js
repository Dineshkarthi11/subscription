import React, { Fragment } from "react";
import randomcolor from "randomcolor";
import faker from "faker";
// import call from "../../assets/images/icons8-call-50.png";
// import video from "../../assets/images/icons8-video-24.png";
// import chat from "../../assets/images/icons8-chat-50.png";
import data from "../common/data.json"
function randomIntFromInterval(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}
const Card = (props) => {
  const levelColor = randomcolor();

  return (
    <>
    <div className="employee_container">
      <ul>
      {props.data.map((item, index) => (
        <Fragment key={item.name}>

          <li className="employee">
            <div className="card">
              <div className="image">
                <img
                  src={"https://randomuser.me/api/portraits/men/" + randomIntFromInterval(1, 100) + ".jpg"}
                  alt="Profile"
                  style={{ borderColor: levelColor }} />
              </div>
              <div className="card-body">
                <h4>{faker.name.findName()}</h4>
                <p>{faker.name.jobTitle()}</p>
              </div>

              <div></div>
            </div>
            {item.children?.length && <Card data={item.children} />}
          </li>
        </Fragment>
      ))}
    </ul>
    </div>
    </>
  );
};

const Chart = () => {
  return (
    <div className="org-tree" style={{width:"100%"}}>
      <Card data={data} />
    </div>
  );
};

export default Chart;
