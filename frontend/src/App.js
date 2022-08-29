import { useState } from "react";
import { saveFile, getData } from "./services/requestServices";

function App() {
  const [inputFile, setInputFile] = useState("");
  const [feedback, setFeedback] = useState("");
  const [data, setData] = useState([]);
  const formData = new FormData();
  formData.append("excelFile", inputFile);

  const handleSubmit = async (e) => {
    setFeedback(""); // Set data to empty array on button click
    e.preventDefault();
    let response = await saveFile(formData);
    if (response.failed) {
      setFeedback(response.failed);
    } else {
      setFeedback(response.success);
    }
  };

  const retrieveData = async () => {
    setData([]); // Set data to empty array on button click
    setFeedback("");
    let response = await getData();
    if (response) {
      setData(response);
    } else {
      setFeedback("Some error occured while fetching your data");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "25%",
      }}
    >
      <div>
        <form onSubmit={handleSubmit}>
          <input
            onChange={(e) => setInputFile(e.target.files[0])}
            type="file"
            name="file"
            id="file"
          />
          <br /> <br />
          <input style={{ padding: "5px", cursor: "pointer" }} type="submit" />
        </form>
        <div>{feedback}</div>
      </div>
      <div>
        <button
          style={{ marginTop: "100px", padding: "10px", cursor: "pointer" }}
          onClick={retrieveData}
        >
          View Data
        </button>
        {/* <div>
          {data &&
            data.forEach((obj) => {
              <p key={++count}>
                {Object.values(obj).map((prop) => (
                  <p key={++count}>{prop}</p>
                ))}
              </p>;
            })}
        </div> */}

        <table>
          {data.map((item, index) => (
            <thead key={index}>
              <tr>
                {Object.values(item).map((obj, i) => (
                  <td key={i} style={{ padding: "10px" }}>
                    {obj}
                  </td>
                ))}
              </tr>
            </thead>
          ))}
        </table>
      </div>
    </div>
  );
}

export default App;
