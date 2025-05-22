import React from 'react';

export default function ManifestUpload({ setManifest }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const json = JSON.parse(reader.result);
        setManifest(json);
      } catch (err) {
        alert("Invalid JSON");
        setManifest(null);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <label className="block mb-2 font-medium">Upload Manifest JSON:</label>
      <input type="file" accept=".json" onChange={handleFile} className="w-full border p-2" />
    </div>
  );
}
