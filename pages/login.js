import { useRouter } from 'next/router'

export default function LoginPage() {
    const router = useRouter()
    const { e } = router.query

    let errorMsg = false

    switch (e) {
        case "1":
            errorMsg = "Invalid password or username not found!"
        case "2":
            errorMsg = "As"
        default:
            errorMsg = "Unknown error occured!"
    }

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-neutral-800 shadow-md lg:p-10 p-6 rounded-md w-3/4 lg:w-1/3">
            <h1 className="text-2xl font-semibold text-white mb-6">Login to Dashboard</h1>
            {e ?
                <div class="p-4 mt-4 mb-4 text-sm text-blue-800 rounded-lg bg-red-800 text-red-200" role="alert">
                    {errorMsg}
                </div>
            :
                <></>
            }
            <form action="api/login" method="POST">
            <div class="relative z-0 w-full mb-6 group">
                <input type="text" name="username" id="username" class="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="username" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
            </div>
            <div class="relative z-0 w-full mb-6 group">
                <input type="password" name="password" id="password" class="block py-2.5 px-0 w-full text-sm text-gray-200 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label for="password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </div>
      </div>
    );
  }
  