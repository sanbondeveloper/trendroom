function MainHeader() {
  return (
    <header className="flex h-[80px] flex-row items-center bg-black">
      <h1 className="text-3xl text-white">TRENDROOM</h1>

      <div className="ml-5 flex flex-row items-center">
        <label htmlFor="searchInput"></label>
        <input type="search" name="searchInput" id="searchInput" />
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default MainHeader;
