'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { BiChevronRight, BiChevronLeft, BiFilter, BiLeftDownArrowCircle, BiRightTopArrowCircle, BiCalendar, BiInfoCircle, BiEditAlt, BiTrash, BiDotsHorizontalRounded } from "react-icons/bi";
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // Import CSS
import 'react-date-range/dist/theme/default.css'; // Import theme CSS
import ProgressLoading from '@/app/components/loading';

export default function BankStatement() {
  const [bankStatement, setBankStatement] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5); // Initialize pageSize with a default value (e.g., 10)
  const [startDate, setStartDate] = useState('2023-10-01');
  const [endDate, setEndDate] = useState('2023-10-20');
  const [showButtonSetting = setShowButtonSetting] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false); // State for Date Range visibility
  const [isOpen, setIsOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedOption, setSelectedOption] = useState('Rentang Hari'); // Ini adalah teks default
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);



  const handleFilterToday = () => {
    const today = new Date();
    setStartDate(today.toISOString().split('T')[0]);
    setEndDate(today.toISOString().split('T')[0]);
    fetchData();
    setSelectedOption('Today');
  };
  const handleFilterLast7Days = () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6);
    setStartDate(startDate.toISOString().split('T')[0]);
    setEndDate(endDate.toISOString().split('T')[0]);
    fetchData();
    setSelectedOption('7 days ago');
  };
  const handleFilterLast14Days = () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 13);
    setStartDate(startDate.toISOString().split('T')[0]);
    setEndDate(endDate.toISOString().split('T')[0]);
    fetchData();
    setSelectedOption('14 days ago');
  };
  const handleFilterLast30Days = () => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 29);
    setStartDate(startDate.toISOString().split('T')[0]);
    setEndDate(endDate.toISOString().split('T')[0]);
    fetchData();
    setSelectedOption('30 days ago');
  };

  const handleDateChange = (item) => {
    setDateRange([item.selection]);
    setStartDate(item.selection.startDate.toISOString().split('T')[0]);
    if (item.selection.endDate) {
      setEndDate(item.selection.endDate.toISOString().split('T')[0]);
    } else {
      setEndDate(null);
    }
  };


  async function getBankStatement(page, pageSize, startDate, endDate, searchKeyword) {
    try {
      const token = sessionStorage.getItem('token'); //token dari session storage

      const response = await fetch('https://databank.bisbas.id/api/v1/get/bank-statement', { //method fetch
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          "page": page,
          "pageSize": pageSize,
          "startDate": startDate,
          "endDate": endDate,
          "search": searchKeyword
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const handleSearch = () => {
    fetchData();
  };

  const fetchData = async () => {
    const data = await getBankStatement(page, pageSize, startDate, endDate, searchKeyword); // Include the search keyword
    setBankStatement(data);

    if (data && data.totalItems) {
      const calculatedTotalPages = Math.ceil(data.totalItems / pageSize);
      setTotalPages(calculatedTotalPages);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [page, pageSize, startDate, endDate]);

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setPage(1); // Reset the page to 1 when the page size changes
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const actionPopUp = showButtonSetting ? (
    <div>
      <button><BiInfoCircle className='h-5 w-5' /></button>
      <button><BiEditAlt className='h-5 w-5' /></button>
      <button><BiTrash className='h-5 w-5' /></button>
    </div>
  ) : null;

  const dateRangePicker = showDatePicker ? (
    <div className='p-5 bg-white rounded-xl shadow-2xl shadow-white'>
      <DateRange
        editableDateInputs={true}
        onChange={handleDateChange}
        moveRangeOnFirstSelection={true}
        ranges={dateRange}
        dragSelectionEnabled={true}
        onPreviewChange={false}
        onShownDateChange={false}
      />
    </div>
  ) : null;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  if (!bankStatement) {
    return <ProgressLoading/>;
  }

  return (
    <div>
      <div className='flex items-center mx-auto w-full max-w-5xl justify-between mb-5'>
        <div className="flex border rounded-lg">
          <input
            type="text"
            placeholder="Search..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="pl-8 pr-4 py-2.5 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 w-full"
          />
          <button onClick={handleSearch} class="bg-blue-500 text-white px-4 py-1 rounded-r-lg hover:bg-blue-600 hover:text-white ">
            Search
          </button>
        </div>
        {/* <div className="relative">
          <form className="flex border rounded-lg">
            <input
              type="text"
              placeholder="Cari sesuatu"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="pl-8 pr-4 py-2.5 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 w-full"
            />
            <button onClick={handleSearch} class="bg-blue-500 text-white px-4 py-1 rounded-r-lg hover:bg-blue-600 hover:text-white ">Search</button>
          </form>
        </div> */}
        <div className="relative w-30">
          <div className="relative w-30">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none text-white">
                <BiFilter />
              </div>
              <select
                id="dropdown"
                className="appearance-none pl-8 pr-4 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-[#4586FF] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              >
                <option className='p-3' value="">Pilih opsi</option>
                <option className='p-3' value="option1">Opsi 1</option>
                <option className='p-3' value="option2">Opsi 2</option>
                <option className='p-3' value="option3">Opsi 3</option>
              </select>
            </div>
          </div>
        </div>
        <div className='flex items-center space-x-4'>
          <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown}
              type="button"
              className="gray-500 text-white text-sm border border-gray-200 px-4 py-2.5 rounded-lg "
            >
              {selectedOption} {/* Tampilkan teks pilihan saat ini */}
            </button>
            {isOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                {/* Dropdown content */}
                <div className="py-2 grid grid-rows-4 justify-end mr-5 my-3 space-y-3 text-xs">
                  <button className="text-right" onClick={handleFilterToday}>
                    Hari ini
                  </button>
                  <button className="text-right" onClick={handleFilterLast7Days}>
                    7 hari terakhir
                  </button>
                  <button className="text-right" onClick={handleFilterLast14Days}>
                    15 hari tearkhir
                  </button>
                  <button className="text-right" onClick={handleFilterLast30Days}>
                    30 hari terakhir
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className='flex items-center border border-white rounded-lg space-x-3'>
            <div className="relative w-30">
              <div className="relative w-30">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none text-white">
                    <BiCalendar />
                  </div>
                  <select
                    id="dropdown"
                    className="appearance-none pl-8 pr- text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-[#4586FF] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  >
                    <option className='p-3' value="">Today</option>
                    <option className='p-3' value="option1">Opsi 1</option>
                    <option className='p-3' value="option2">Opsi 2</option>
                    <option className='p-3' value="option3">Opsi 3</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="relative w-30">
              <div className="relative w-30">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none text-white">
                    <BiCalendar />
                  </div>
                  <select
                    id="dropdown"
                    className="appearance-none pl-8 pr-4 text-[#9BBEFF] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-[#4586FF] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  >
                    <option className='p-3' value="">Date</option>
                    <option className='p-3' value="option1">Opsi 1</option>
                    <option className='p-3' value="option2">Opsi 2</option>
                    <option className='p-3' value="option3">Opsi 3</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='bg-white p-1 mx-auto w-full max-w-5xl rounded-xl'>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="p-4">
                <div class="flex items-center">
                  <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                  <label for="checkbox-all-search" class="sr-only border border-gray-200">checkbox</label>
                </div>
              </th>
              <th scope="col" class="px-6 py-3">Date</th>
              <th scope="col" class="px-6 py-3">Detail</th>
              <th scope="col" class="px-6 py-3">Amount</th>
              <th scope="col" class="px-6 py-3">Balance</th>
              <th scope="col" class="px-6 py-3">Description</th>
              <th scope="col" class="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bankStatement.data.map((item, index) => (
              <tr key={index} class="p-3 bg-white border border-gray-100/70  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover-bg-gray-600">
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input id={`checkbox-table-search-${index}`} type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border border-gray-200 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for={`checkbox-table-search-${index}`} class="sr-only">checkbox</label>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div className='text-sm'>{new Date(item.date).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "2-digit",
                  })}</div>
                  <div className='text-xs'>{new Date(item.date).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}</div>
                </td>
                <td class="px-6 py-4 text-xs">
                  <div className='flex items-center'>
                    <Image
                      src={'/bca.png'}
                      width={80}
                      height={80}
                      alt="Picture of the author"
                      className='pr-6'
                    />
                    <div className='grid-rows-3'>
                      <div>{item.ibUser}</div>
                      <div>{item.nameAlias !== null ? item.nameAlias : 'undefined'}</div>
                      <div>{item.mutationId}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div className='flex items-center space-x-2'>
                    <div>
                      {item.type === 1 ? (
                        <div className='text-green-400'><BiLeftDownArrowCircle /></div>
                      ) : item.type === 0 ? (
                        <div className='text-red-400'><BiRightTopArrowCircle /></div>
                      ) : (
                        <div>Status</div>
                      )}
                    </div>
                    <div>
                      {item.amount}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-gray-300">{item.balance}</td>
                <td class="px-6 py-4">{item.description}</td>
                <td class="px-10 py-4">
                  <button>Edit</button>
                  {actionPopUp}
                  {/* Other content of your component */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex items-center float-right py-3 px-3'>
          <div>
            <select className="p-1 bg-gray-100 rounded-lg my-5 mx-1 hover:border hover:bg-gray-300 text-center" value={pageSize} onChange={(e) => handlePageSizeChange(parseInt(e.target.value))}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={30}>30</option>
              {/* Tambahkan opsi lain sesuai kebutuhan */}
            </select>
          </div>
          <div>
            <button
              onClick={handlePreviousPage} disabled={page === 1}
              className='flex items-center'
            >
              <div className='hover:bg-slate-200 rounded-2xl'>
                <BiChevronLeft className='h-9 w-9' />
              </div>
            </button>
          </div>
          <div>
            <button
              onClick={handleNextPage} disabled={page === bankStatement.pageInfo.totalPage}
              className='flex items-center'
            >
              <div className='hover:bg-slate-200 rounded-2xl'><BiChevronRight className='h-9 w-9' /></div>
            </button>
          </div>
        </div>
      </div>

    </div>
    // <div className='max-w-5xl mx-auto bg-white rounded-xl shadow-2xl shadow-blue-100' >
    //   <div className='px-4 mb-10'>
    //     <div class="overflow-x-auto">
    //       <div className='py-5 px-5 rounded-lg mb-10 shadow-lg shadow-blue-100'>
    //         <div className='flex space-x-3 mb-12'>
    //           <button className='bg-gray-50 p-1 px-3 rounded-lg flex items-center space-x-1'>
    //             <BiListPlus />
    //             <div>All</div>
    //           </button>
    //           <button className='bg-green-50 p-1 px-3 rounded-lg font-semibold text-green-500 border border-green-200 flex items-center space-x-1'>
    //             <BiLeftDownArrowCircle />
    //             <div>Uang Masuk</div>
    //           </button>
    //           <button className='bg-red-50 p-1 px-3 rounded-lg font-semibold text-red-500 border border-red-200 flex items-center space-x-1'>
    //             <BiRightTopArrowCircle />
    //             <div>Uang Keluar</div>
    //           </button>
    //         </div>
    //         <div className='flex items-center justify-between'>


    //         </div>
    //       </div>
    //      {/* //table */}

    //       <div className='mt-8 mr-5 justify-end flex items-center'>


    //         <div className='hover:bg-slate-200 rounded-2xl'>

    //         </div>
    //         <div>
    //           <div></div>
    //         </div>
    //         
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
