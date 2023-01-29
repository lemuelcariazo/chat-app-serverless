function Login({ email, setEmail, pw, setPw }: any) {
  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm text-gray-100 dark:text-white font-extrabold placeholder:font-bold "
        >
          Email:
          <label />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="s@mple.com"
            required
          />
        </label>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm text-gray-100 dark:text-white font-extrabold placeholder:font-bold"
        >
          Password:
          <label />
          <input
            type="password"
            id="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="password"
            required
          />
        </label>
      </div>
    </div>
  );
}

export default Login;
