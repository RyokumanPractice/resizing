import { useState } from "react";
import styled from "styled-components";

const Input = styled.input.attrs({ type: "file", accept: ".jpg, .jepg, .png " })``;

function App() {
  const [image, setImage] = useState<any>();
  const [reader] = useState<any>(new FileReader());

  const onImageChange = (a: any) => {
    const WIDTH = 200;
    reader.readAsDataURL(a.target.files[0]);

    reader.onload = (event: any) => {
      setImage(event.target.result);

      const imageSRC = document.createElement("img");
      imageSRC.src = image;

      imageSRC.onload = (e: any) => {
        let canvas = document.createElement("canvas");
        let ratio = WIDTH / e.target.width;
        canvas.width = WIDTH;
        canvas.height = e.target.height * ratio;

        const context = canvas.getContext("2d");
        context?.drawImage(imageSRC, 0, 0, canvas.width, canvas.height);

        const new_image_url: any = context?.canvas.toDataURL("image/jpeg", 1);
        const new_image = document.createElement("img");
        new_image.src = new_image_url;
        document.getElementById("wrapper")?.appendChild(new_image);
      };
    };
  };
  return (
    <div className="App">
      <Input onChange={onImageChange} />
      <div id="wrapper"></div>
    </div>
  );
}

export default App;
