import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import React from 'react'
import { useState, useEffect } from 'react';
import { Button } from '@nextui-org/react';
import { BiTimeFive, BiBadgeCheck, BiDotsHorizontalRounded, BiEdit, BiCheckSquare, BiTrash } from "react-icons/bi";

function BankData() {

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://65405de245bedb25bfc1d0a4.mockapi.io/api/data-bank/');
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        //table masih belum di mapiing
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">Bank</th>
                    <th scope="col" class="px-6 py-3">Informasi</th>
                    <th scope="col" class="px-6 py-3">Akun</th>
                    <th scope="col" class="px-6 py-3">Bot Interval</th>
                    <th scope="col" class="px-6 py-3">Status</th>
                    <th scope="col" class="px-6 py-3">Last Update</th>
                    <th scope="col" class="px-6 py-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                
                <tr class="p-3 bg-white border border-gray-100/70  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover-bg-gray-600">
                    <td class="px-6 py-4 whitespace-nowrap">
                        Logo BCA
                    </td>
                    <td class="px-6 py-4 text-xs">
                        <div>
                            IB User
                        </div>
                        <div>
                            8913530190
                        </div>
                        <div>
                            Fikry Adimata
                        </div>
                    </td>
                    <td class="px-6 py-4">
                        Rekening Belanja
                    </td>
                    <td class="px-6 py-4 text-gray-300 ">
                        <Popover
                            placement='bottom'
                        >
                            <PopoverTrigger>
                                <button className='flex items-center space-x-2 w-24'>
                                    <BiTimeFive />
                                    <div>15 Menit</div>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <form className='bg-white border px-2 py-3'>
                                    <p>Edit Interval</p>
                                    <input
                                        type="text"
                                        placeholder="Input Kode Bank Anda ..."
                                        class="py-2.5 pl-4 w-56 border rounded-l outline-none mt-2 text-[12px]"
                                        id="searchInput"
                                    />
                                </form>
                            </PopoverContent>
                        </Popover>
                    </td>
                    <td class="px-6 py-4">
                        <button className='flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-md text-green-700 font-semibold'>
                            <BiBadgeCheck />
                            <button>Active</button>
                        </button>
                    </td>
                    <td class="px-6 py-4">
                        <button className=' px-3 py-1 rounded-md text-Grey-700 font-semibold text-start space-y-1'>
                            <div className='font-[18px] w-32 text-sm'>Upadate Terakhir</div>
                            <div className='text-xs font-normal'>10 Oktober 2023</div>
                            <div className='text-xs font-normal'>15:30:25 WIB</div>
                        </button>
                    </td>
                    <td class="px-6 py-4">
                        <Popover
                            placement='bottom'
                        >
                            <PopoverTrigger>
                                <button className='w-full items-center space-x-2'>
                                    <BiDotsHorizontalRounded className='h-6 w-6 group-hover:h-7 group-hover:w-7' />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className='justify-start bg-white p-4 border space-y-2 rounded-lg text-gray-600'>
                                    <button className='flex items-center space-x-2 border w-full px-2 py-1 rounded-lg'>
                                        <BiEdit />
                                        <div>
                                            Edit
                                        </div>
                                    </button>
                                    <button className='flex items-center space-x-2 border w-full px-2 py-1 rounded-lg'>
                                        <BiCheckSquare />
                                        <div>
                                            Ganti Status
                                        </div>
                                    </button>
                                    <button className='flex items-center space-x-2 border border-red-100 w-full px-2 py-1 rounded-lg text-red-700 bg-red-50 font-semibold'>
                                        <BiTrash />
                                        <div>
                                            Hapus
                                        </div>
                                    </button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default BankData