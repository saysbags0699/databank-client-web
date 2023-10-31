'use client'
import { BiPlusCircle } from "react-icons/bi";
import ProgressLoading from "@/app/components/loading";
import { useState, useEffect } from "react";
import BankData from "./bank-data";

export default function BankAccount() {
  const [bankAccountData, setBankAccountData] = useState(null);

  useEffect(() => {
    // Mengambil token dari session storage
    const token = sessionStorage.getItem("token");

    if (!token) {
      console.error("Token tidak ditemukan di session storage.");
      return;
    }

    const apiUrl = "https://databank.bisbas.id/api/v1/bank-account";

    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari API");
        }
        return response.json();
      })
      .then((data) => {
        setBankAccountData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [defaultValue, setDefaultValue] = useState("15 Menit"); // Ganti "12345" dengan angka default yang Anda inginkan

  const handleInputChange = (event) => {
    setDefaultValue(event.target.value);
  };

  //buatkan div berisi input text
  return (
    <div>
      <div className='font-montserrat flex items-center mx-auto w-full max-w-5xl justify-between mt-8 mb-5'>
        <div className="flex items-center w-full justify-between">
          <div class="">
            <input
              type="text"
              placeholder="Cari..."
              class="py-2 px-3 border rounded-l outline-none"
              id="searchInput"
            />
            <button
              class="bg-blue-500 text-white py-2 px-3 rounded-r"
              id="searchButton"
            >
              Cari
            </button>
          </div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button className="btn bg-blue-500 text-white py-2 px-3 flex items-center rounded-md" onClick={() => document.getElementById('my_modal_1').showModal()}>
            <BiPlusCircle className="w-5 h-5" />
            <div className="text-xs capitalize ">Tambah Akun Bank</div>
          </button>
          <dialog id="my_modal_1" className="modal bg-gray-500/50">
            <div className="modal-box text-gray-600">
              
            </div>
          </dialog>
        </div>
      </div>
      <div className="className='flex items-center mx-auto w-full max-w-5xl justify-between mt-8 mb-5">
        <BankData />
      </div>
    </div>
  );
}
