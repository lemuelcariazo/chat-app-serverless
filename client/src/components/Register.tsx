function Register({ email, setEmail, pw, setPw }: any) {
  return (
    <div className="flex justify-center items-center flex-col gap-6">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="font-extrabold placeholder:font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="you.example.com"
      />
      <input
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        className="font-extrabold placeholder:font-bold bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Password"
      />
    </div>
  );
}

export default Register;
