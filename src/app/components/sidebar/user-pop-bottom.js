import React from 'react'

export default function UserPopButton() {
    const handleButtonClick = () => {
        // Tambahkan logika yang sesuai untuk tombol pop di sini
      };
  return (
    <div className="min-h-screen flex items-center justify-center">
    <PopButton text="Tombol Pop" onClick={handleButtonClick} />
  </div>
  )
}
