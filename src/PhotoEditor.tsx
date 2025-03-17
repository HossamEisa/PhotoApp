import React, { useState } from "react";

const PhotoEditor = () => {
  const [image, setImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = async () => {
      setImage(reader.result as string);

      // Send to Photoroom API
      const response = await fetch("https://sdk.photoroom.com/v1/edit", {
        method: "POST",
        headers: {
          "x-api-key": import.meta.env.VITE_PHOTOROOM_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image_url: reader.result, background: "white" }),
      });

      const data = await response.json();
      setEditedImage(data.result_url);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {image && <img src={image} alt="Uploaded" />}
      {editedImage && <img src={editedImage} alt="Edited" />}
    </div>
  );
};

export default PhotoEditor;
