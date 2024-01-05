const SuggestionSection = () => {
  return (
    <div className="bg-yellow-600 py-14">
      <div className="container mx-auto text-center text-white relative space-y-11">
        <h2 className="font-black text-5xl">JOIN SHOPPING COMMUNITY TO GET MONTHLY PROMO</h2>
        <p className="text-3xl font-normal">Type your email down below and be young wild generation</p>
        <form>
          <div className="mb-6">
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-5 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@yourmail.com"
              required
            />
          </div>
          <button
            type="submit"
            className="absolute top-[460px] left-[160px] lg:top-[227px] lg:left-[1193px] btn px-8"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuggestionSection;
