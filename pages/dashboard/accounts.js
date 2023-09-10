import Layout from "@/components/dashboard/layout";
import { withSessionSsr } from '@/lib/withSession';
import { useEffect, useState } from "react";
import { getProfiles } from "../api/getprofile";
import PageHeader from "@/components/dashboard/pageheader";
import { useRouter } from "next/router";

export default function Accounts({ user, profiles }) {
    const [focusAccountName, setFocusAccountName] = useState("n/A")
    const [focusAccountID, setFocusAccountID] = useState("n/A")
    const [successStatus, setSuccessStatus] = useState("n/A")
    const [deletedProfiles, setDeletedProfiles] = useState([])

    const router = useRouter()
    var { success } = router.query

    useEffect(() => {
        setSuccessStatus(success)
    }, [])

    const requestAccountDeletion = async () => {
        const rawResponse = await fetch("/api/accountmanager", {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: focusAccountID})
        });

        if (rawResponse.status == 303) {
            setSuccessStatus("2")
            setDeletedProfiles([...deletedProfiles, focusAccountID])
        }
    } 

    return (
        <Layout>
            <div class="flex justify-between">
                <div class="flex items-start flex-col">
                    <PageHeader title="Manage Accounts" desc="Here you are able to manage the accounts of your staff members."></PageHeader>
                </div>
                <button data-modal-target="modal-create-user" data-modal-toggle="modal-create-user" type="button" class="text-white h-16 md:h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center">
                    Create account
                    <svg class="w-4 h-4 text-gray-200 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z"/>
                    </svg>
                </button>
            </div>

            {successStatus && (successStatus === "1") && (
                <div class="p-4 mt-4 mb-4 text-sm text-blue-800 rounded-lg bg-green-800 text-green-200" role="alert">
                    User account has been successfully created!
                </div>
            )}

            {successStatus && (successStatus === "2") && (
                <div class="p-4 mt-4 mb-4 text-sm text-blue-800 rounded-lg bg-orange-800 text-orange-200" role="alert">
                    User account has been successfully deleted!
                </div>
            )}

            <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left text-gray-200">
                    <thead class="text-xs text-gray-200 uppercase bg-neutral-700">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Avatar
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Username
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                E-Mail
                            </th>
                            <th scope="col" class="px-6 py-3">
                                -
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {profiles.map((profile, index) => (
                            <>
                            {!deletedProfiles.includes(profile._id) && (
                            <tr class="border-b bg-neutral-800 border-neutral-700" key={profile._id}>
                                <th scope="row" class="px-6 py-3 font-medium whitespace-nowrap text-white">
                                    <a href={"/dashboard/profile/" + profile._id}>
                                        <img class="w-10 h-10 rounded-full" src={profile.avatarURL} alt="Rounded avatar" />
                                    </a>
                                </th>
                                <td class="px-6 py-4">
                                    {profile.name}
                                </td>
                                <td class="px-6 py-4">
                                    {profile.name}
                                </td>
                                <td class="px-6 py-4">
                                    {profile.email}
                                </td>
                                <td>
                                    <button data-modal-target="popup-modalq" data-modal-toggle="popup-modal" class="block text-white bg-neutral-700 hover:bg-neutral-800 focus:ring-4 focus:outline-none focus:ring-neutral-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button" onClick={() => {
                                        setFocusAccountName(profile.name)
                                        setFocusAccountID(profile._id)
                                    }}>
                                        Delete
                                    </button>
                                    </td>
                            </tr>
                            )}
                            </>
                        ))}
                    </tbody>
                </table>
            </div>

<div id="modal-create-user" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-md max-h-full">
        <div class="relative rounded-lg shadow bg-neutral-700">
            <button type="button" class="absolute top-3 right-2.5 text-neutral-400 bg-transparent hover:bg-neutral-800 hover:text-neutral-200 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" data-modal-hide="modal-create-user">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="px-6 py-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-neutral-200">Create user account</h3>
                <form class="space-y-6" action="/api/accountmanager" method="POST">
                    <div>
                        <label for="text" class="block mb-2 text-sm font-medium text-white">Full Name</label>
                        <input type="text" name="fullname" id="fullname" class="bg-neutral-600 border border-neutral-500 text-neutral-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="max.test" required />
                    </div>
                    <div>
                        <label for="text" class="block mb-2 text-sm font-medium text-white">Username</label>
                        <input type="text" name="username" id="username" class="bg-neutral-600 border border-neutral-500 text-neutral-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Max Test" required />
                    </div>
                    <div>
                        <label for="text" class="block mb-2 text-sm font-medium text-white">E-Mail</label>
                        <input type="text" name="email" id="email" class="bg-neutral-600 border border-neutral-500 text-neutral-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="max.test@gmail.com" required />
                    </div>
                    <div>
                        <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" class="bg-neutral-600 border border-neutral-500 text-neutral-200 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                    </div>
                    
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create</button>
                </form>
            </div>
        </div>
    </div>
</div> 


<div id="popup-modal" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-md max-h-full">
        <div class="relative rounded-lg shadow bg-neutral-600">
            <button type="button" class="absolute top-3 right-2.5 text-gray-200 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span class="sr-only">Close modal</span>
            </button>
            <div class="p-6 text-center">
                <svg class="mx-auto mb-4 text-neutral-200 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 class="mb-5 text-lg font-normal text-neutral-200">Are you sure you want to delete the user <span className="font-bold text-red-300">{focusAccountName}</span>?</h3>
                <button data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2" onClick={requestAccountDeletion}>
                    Yes, I'm sure
                </button>
                <button data-modal-hide="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
            </div>
        </div>
    </div>
</div>


        </Layout>
    );
}


export const getServerSideProps = withSessionSsr(
    async ({req, res}) => {
        const user = req.session.user;

        if(!user) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            }
        }

        const profiles = await getProfiles() || {}
        
        return {
            props: {
                user,
                profiles,
            },
        };
    }
);