
import { useEffect, useState } from 'react';
import * as htmltopdf from 'html-to-image';
import * as html2canvas from 'html2canvas';

const imageMimeType = /image\/(png|jpg|jpeg)/i;

function App() {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
    setFile(file);
  }
  useEffect(() => {
    let fileReader, isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    }

  }, [file]);

  const node=document.getElementsByClassName("photoFrame");
  console.log(node)
  return (
    <>
    <label htmlFor='image'>Select your image to create frame.</label>
          <input
            type="file"
            id='image'
            accept='.png, .jpg, .jpeg'
            onChange={changeHandler}
          />
          <button onClick={()=>{
           html2canvas(document.querySelector("#photoFrame")).then(function(canvas) {
    document.body.appendChild(canvas);
})
            .catch((error)=>{console.log(error)});
          }}> Download</button>
      {fileDataURL ? <p style={{color:'red'}}>Your image is appearing below, please save.</p>:null}
      
      {fileDataURL ?
        <div className="photoFrame" id="photoFrame">
        <p className="toplacediv"></p>
          <img className="imageUpload" src={fileDataURL} >
        </img>
        </div>
         : null}
    </>
  );
}
export default App;