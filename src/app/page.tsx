'use client';
import { useState, ChangeEvent } from 'react';

export default function Home() {
  const API_URL = "https://api.cloudflare.com/client/v4/accounts/74681b1257b9e7257184cf2928ba7f0a/images/v1";
  const TOKEN = "hhBhxJPWZ2t57AfLECuPsE8PR3YQrmG0bwEnUwSQ";

  const [file, setFile] = useState<File | null>(null);

  // 处理文件选择
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files?.[0] || null);
  };

  async function handleFileUpload() {
    if (!file) {
      alert('請先選擇文件');
      return;
    }

    const arrayBuffer = await file.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    const formData = new FormData();
    formData.append('file', new File([bytes], file.name, { type: file.type }), 'image.jpg');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TOKEN}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      
      if (response.ok) {
        alert('文件上傳成功');
      } else {
        alert('文件上傳失敗');
      }
    } catch (error) {
      console.error('上傳錯誤:', error);
      alert('上傳過程發生錯誤');
    }
  }

  return (
    <div>
      <h1>文件上傳</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>上傳文件</button>
    </div>  
  );
}