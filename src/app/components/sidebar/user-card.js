import React from 'react'
import Image from "next/image";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { BiCog, BiLogOut, BiUserCircle, BiPlusCircle } from "react-icons/bi";

export default function UserCard() {

    return (
        <div className='font-montserrat'>
            <Popover placement='bottom'>
                <PopoverTrigger >
                    <Button>
                        <div className="flex items-center bg-[#397EFF] hover:bg-[#2C71F3] p-2 group rounded-full pr-5">
                            <div >
                                <Image
                                    src={'/sayid.avif'}
                                    width={60}
                                    height={60}
                                    alt="Picture of the author"
                                    className='bg-clip-content rounded-full bg-white'
                                />
                            </div>
                            <div className="text-start px-3">
                                <div className="text-white font-semibold text-lg">Jefri Michin</div>
                                <div className="text-white font-light text-[13px] px-2 w-[57px] rounded-lg bg-[#1F63E2] group-hover:bg-white group-hover:text-[#1F63E2]">Admin</div>
                            </div>
                        </div>
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div className='bg-white p-8 space-y-2 rounded-xl shadow-gray-200 shadow-2xl text-gray-700'>
                        <div>
                            <div className='text-[10px]'>
                                Username
                            </div>
                            <div className='text-[13px] font-bold'>
                                Jefri Michin
                            </div>
                        </div>
                        <div>
                            <div className='text-[10px]'>
                                Email
                            </div>
                            <div className='text-[11px] font-semibold'>
                                Jefripecintamichin@gmail.com
                            </div>
                        </div>
                        <div className=' space-y-3 pt-5'>
                            <button className='flex items-center font-semibold space-x-2 p-2 bg-gray-50 w-full border-gray-200 border rounded-lg'>
                                <div>
                                    <BiUserCircle />
                                </div>
                                <button className="btn bg-blue-500 text-white py-2 px-3 flex items-center rounded-md" onClick={() => document.getElementById('my_modal_1').showModal()}>
                                    <BiPlusCircle className="w-5 h-5" />
                                    <div className="text-xs capitalize ">Tambah Akun Bank</div>
                                </button>
                                <dialog id="my_modal_1" className="modal bg-gray-500/50">
                                    <div className="modal-box text-gray-600">
                                        <h3 className="font-bold">Tambah Akun Bank</h3>
                                        <p className="mt-3 text-sm font-medium">Nomor Rekening</p>
                                        <input
                                            type="text"
                                            placeholder="Input Kode Bank.."
                                            class="py-2.5 pl-4 w-1/2 border rounded-l outline-none mt-2 text-[12px]"
                                            id="searchInput"
                                        />
                                        <div className="border-b border-gray-200 mt-5"></div>
                                        <div className="mt-5">
                                            <p className="mt-5 font-semibold">Input Data Sesuai Nomor Rekening!</p>
                                            <p className="mt-3 text-sm font-medium">Nama Lengkap</p>
                                            <input
                                                type="text"
                                                placeholder="Input Nama Anda ..."
                                                class="py-2.5 pl-4 w-full border rounded-l  outline-none mt-2 text-[12px]"
                                                id="searchInput"
                                            />
                                            <div className="mt-3 flex w-full items-center justify-start space-x-3">
                                                <div className="w-full">
                                                    <p className="mt-3 text-sm font-medium">IB User</p>
                                                    <input
                                                        type="text"
                                                        placeholder="Input IB User Anda ..."
                                                        class="py-2.5 pl-4 w-56 border rounded-l outline-none mt-2 text-[12px]"
                                                        id="searchInput"
                                                    />
                                                </div>
                                                <div className="w-1/2">
                                                    <p className="mt-3 text-sm font-medium">Kode Bank</p>
                                                    <input
                                                        type="text"
                                                        placeholder="Input Kode Bank Anda ..."
                                                        class="py-2.5 pl-4 w-56 border rounded-l outline-none mt-2 text-[12px]"
                                                        id="searchInput"
                                                    />
                                                </div>
                                            </div>
                                            <div className="border-b border-gray-250 mt-5"></div>
                                            <p className="mt-5 font-semibold">Atur Interval Bot!</p>
                                            <div className="w-1/2">
                                                <p className="mt-3 text-sm font-medium">Pilih nilai interval bot di bawah!</p>
                                                <input
                                                    type="text"
                                                    placeholder="Input Kode Bank Anda ..."
                                                    className="py-2.5 pl-4 w-56 border rounded-l outline-none mt-2 text-[12px]"
                                                    id="searchInput"
                                                    value={defaultValue}
                                                    onChange={handleInputChange}
                                                />
                                                <div></div>
                                            </div>
                                        </div>
                                        <form method="dialog" className="w-full mt-9">
                                            <div className="flex items-center justify-between">
                                                <button className="btn">Close</button>
                                                <button className="btn w-1/2 text-white bg-blue-500">Submit</button>
                                            </div>
                                        </form>
                                    </div>
                                </dialog>
                            </button>
                            <button className='flex items-center font-semibold space-x-2 p-2 bg-gray-50 w-full border-gray-200 border rounded-lg'>
                                <div>
                                    <BiCog />
                                </div>
                                <div className='text-[13px]'>Team Setting</div>
                            </button>
                            <button className='flex items-center font-semibold space-x-2 p-2 bg-red-50 w-full rounded-lg text-red-800'>
                                <div>
                                    <BiLogOut />
                                </div>
                                <div className='text-[13px]'>Logout</div>
                            </button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}
