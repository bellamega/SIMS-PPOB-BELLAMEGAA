import React from "react";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      <header className="w-full h-16 bg-white border-b flex justify-between items-center px-4">
        <h1 className="text-xl font-semibold text-red-500">SIMS PPOB</h1>
        <nav className="flex space-x-4">
          <a href="#" className="text-black hover:text-red-500">Top Up</a>
          <a href="#" className="text-black hover:text-red-500">Transaction</a>
          <a href="#" className="text-red-500 font-semibold">Akun</a>
        </nav>
      </header>
      <main className="w-full max-w-md flex flex-col items-center mt-8">
        <div className="relative">
          <img
            src="https://via.placeholder.com/100"
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-2 border-gray-300"
          />
          <button className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-1">
            ✏️
          </button>
        </div>
        <h2 className="text-xl font-semibold mt-4">Kristanto Wibowo</h2>

        <form className="w-full mt-8 space-y-4">
          <div>
            <label className="block text-gray-600 text-sm mb-1">Email</label>
            <input
              type="email"
              value="wallet@nutech.com"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Nama Depan</label>
            <input
              type="text"
              value="Kristanto"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm mb-1">Nama Belakang</label>
            <input
              type="text"
              value="Wibowo"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600"
          >
            Simpan
          </button>
        </form>
      </main>
    </div>
  );
}
